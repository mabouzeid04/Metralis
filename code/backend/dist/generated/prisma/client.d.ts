import * as runtime from "@prisma/client/runtime/library";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model FactoryConfig
 *
 */
export type FactoryConfig = Prisma.FactoryConfigModel;
/**
 * Model Asset
 *
 */
export type Asset = Prisma.AssetModel;
/**
 * Model DocumentAsset
 *
 */
export type DocumentAsset = Prisma.DocumentAssetModel;
/**
 * Model Machine
 *
 */
export type Machine = Prisma.MachineModel;
/**
 * Model WorkOrder
 *
 */
export type WorkOrder = Prisma.WorkOrderModel;
/**
 * Model RepairAction
 *
 */
export type RepairAction = Prisma.RepairActionModel;
/**
 * Model Part
 *
 */
export type Part = Prisma.PartModel;
/**
 * Model WorkOrderPart
 *
 */
export type WorkOrderPart = Prisma.WorkOrderPartModel;
/**
 * Model Document
 *
 */
export type Document = Prisma.DocumentModel;
/**
 * Model DocumentChunk
 *
 */
export type DocumentChunk = Prisma.DocumentChunkModel;
/**
 * Model IncidentChunk
 *
 */
export type IncidentChunk = Prisma.IncidentChunkModel;
/**
 * Model ChatConversation
 *
 */
export type ChatConversation = Prisma.ChatConversationModel;
/**
 * Model ChatMessage
 *
 */
export type ChatMessage = Prisma.ChatMessageModel;
/**
 * Model ChatMessageFeedback
 *
 */
export type ChatMessageFeedback = Prisma.ChatMessageFeedbackModel;
/**
 * Model SystemInsight
 *
 */
export type SystemInsight = Prisma.SystemInsightModel;
//# sourceMappingURL=client.d.ts.map