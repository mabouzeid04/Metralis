import { WorkOrderPriority } from "../../generated/prisma/client";
import { env } from "../../config/env";

type WorkOrderAssignmentPayload = {
  to: string;
  workOrder: {
    publicId: string;
    title: string;
    machineName?: string | null;
    priority: WorkOrderPriority;
  };
};

type SendResult =
  | { status: "sent"; messageId?: string }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string; details?: unknown };

const normalizePhoneNumber = (phone: string) => phone.replace(/[^\d+]/g, "");

const buildBodyParameters = (payload: WorkOrderAssignmentPayload["workOrder"]) => [
  { type: "text", text: payload.publicId },
  { type: "text", text: payload.title },
  { type: "text", text: payload.machineName ?? "Machine" },
  { type: "text", text: payload.priority },
];

export const sendWorkOrderAssignmentWhatsapp = async (
  payload: WorkOrderAssignmentPayload,
): Promise<SendResult> => {
  if (!env.whatsapp.enabled) {
    return { status: "skipped", reason: "whatsapp disabled" };
  }

  const { token, phoneNumberId, templateName, languageCode } = env.whatsapp;
  if (!token || !phoneNumberId) {
    return { status: "skipped", reason: "whatsapp not configured" };
  }

  const formattedPhone = normalizePhoneNumber(payload.to);

  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "template",
        template: {
          name: templateName,
          language: { code: languageCode },
          components: [
            {
              type: "body",
              parameters: buildBodyParameters(payload.workOrder),
            },
          ],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      return {
        status: "failed",
        reason: `WhatsApp API responded with ${response.status}`,
        details: errorText,
      };
    }

    const result = (await response.json().catch(() => null)) as
      | { messages?: Array<{ id?: string }> }
      | null;

    const messageId = result?.messages?.[0]?.id;
    if (messageId) {
      return { status: "sent", messageId };
    }

    return { status: "sent" };
  } catch (err) {
    return { status: "failed", reason: "network or fetch error", details: err };
  }
};

