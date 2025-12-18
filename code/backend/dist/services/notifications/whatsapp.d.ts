import { WorkOrderPriority } from "../../generated/prisma/client";
type WorkOrderAssignmentPayload = {
    to: string;
    workOrder: {
        publicId: string;
        title: string;
        machineName?: string | null;
        priority: WorkOrderPriority;
    };
};
type SendResult = {
    status: "sent";
    messageId?: string;
} | {
    status: "skipped";
    reason: string;
} | {
    status: "failed";
    reason: string;
    details?: unknown;
};
export declare const sendWorkOrderAssignmentWhatsapp: (payload: WorkOrderAssignmentPayload) => Promise<SendResult>;
export {};
//# sourceMappingURL=whatsapp.d.ts.map