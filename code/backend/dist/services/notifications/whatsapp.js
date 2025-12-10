"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWorkOrderAssignmentWhatsapp = void 0;
const env_1 = require("../../config/env");
const normalizePhoneNumber = (phone) => phone.replace(/[^\d+]/g, "");
const buildBodyParameters = (payload) => [
    { type: "text", text: payload.publicId },
    { type: "text", text: payload.title },
    { type: "text", text: payload.machineName ?? "Machine" },
    { type: "text", text: payload.priority },
];
const sendWorkOrderAssignmentWhatsapp = async (payload) => {
    if (!env_1.env.whatsapp.enabled) {
        return { status: "skipped", reason: "whatsapp disabled" };
    }
    const { token, phoneNumberId, templateName, languageCode } = env_1.env.whatsapp;
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
        const result = (await response.json().catch(() => null));
        return { status: "sent", messageId: result?.messages?.[0]?.id };
    }
    catch (err) {
        return { status: "failed", reason: "network or fetch error", details: err };
    }
};
exports.sendWorkOrderAssignmentWhatsapp = sendWorkOrderAssignmentWhatsapp;
//# sourceMappingURL=whatsapp.js.map