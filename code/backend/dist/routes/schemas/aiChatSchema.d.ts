import { z } from "zod";
export declare const chatRequestSchema: z.ZodObject<{
    message: z.ZodString;
    machineId: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>;
    conversationId: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
//# sourceMappingURL=aiChatSchema.d.ts.map