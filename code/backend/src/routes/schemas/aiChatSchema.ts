import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  machineId: z.string().uuid().optional(),
  conversationId: z.string().uuid().optional(),
});

