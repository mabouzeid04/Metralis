export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly TECHNICIAN: "TECHNICIAN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const MachineStatus: {
    readonly RUNNING: "RUNNING";
    readonly DOWN: "DOWN";
    readonly MAINTENANCE: "MAINTENANCE";
    readonly RETIRED: "RETIRED";
};
export type MachineStatus = (typeof MachineStatus)[keyof typeof MachineStatus];
export declare const MachineCriticality: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
};
export type MachineCriticality = (typeof MachineCriticality)[keyof typeof MachineCriticality];
export declare const WorkOrderStatus: {
    readonly OPEN: "OPEN";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly WAITING: "WAITING";
    readonly CLOSED: "CLOSED";
};
export type WorkOrderStatus = (typeof WorkOrderStatus)[keyof typeof WorkOrderStatus];
export declare const WorkOrderType: {
    readonly CORRECTIVE: "CORRECTIVE";
    readonly PREVENTIVE: "PREVENTIVE";
    readonly INSPECTION: "INSPECTION";
};
export type WorkOrderType = (typeof WorkOrderType)[keyof typeof WorkOrderType];
export declare const WorkOrderPriority: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly CRITICAL: "CRITICAL";
};
export type WorkOrderPriority = (typeof WorkOrderPriority)[keyof typeof WorkOrderPriority];
export declare const DocumentType: {
    readonly MANUAL: "MANUAL";
    readonly SOP: "SOP";
    readonly TROUBLESHOOTING: "TROUBLESHOOTING";
    readonly OTHER: "OTHER";
};
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];
export declare const DocumentIngestionStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETE: "COMPLETE";
    readonly FAILED: "FAILED";
};
export type DocumentIngestionStatus = (typeof DocumentIngestionStatus)[keyof typeof DocumentIngestionStatus];
export declare const ChatMessageRole: {
    readonly USER: "USER";
    readonly ASSISTANT: "ASSISTANT";
    readonly SYSTEM: "SYSTEM";
};
export type ChatMessageRole = (typeof ChatMessageRole)[keyof typeof ChatMessageRole];
export declare const AiFeedbackValue: {
    readonly HELPFUL: "HELPFUL";
    readonly NOT_HELPFUL: "NOT_HELPFUL";
    readonly CORRECT_CAUSE: "CORRECT_CAUSE";
};
export type AiFeedbackValue = (typeof AiFeedbackValue)[keyof typeof AiFeedbackValue];
//# sourceMappingURL=enums.d.ts.map