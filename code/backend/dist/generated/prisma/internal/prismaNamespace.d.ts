import * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
 * Metrics
 */
export type Metrics = runtime.Metrics;
export type Metric<T> = runtime.Metric<T>;
export type MetricHistogram = runtime.MetricHistogram;
export type MetricHistogramBucket = runtime.MetricHistogramBucket;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 6.19.0
 * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly Machine: "Machine";
    readonly WorkOrder: "WorkOrder";
    readonly RepairAction: "RepairAction";
    readonly Part: "Part";
    readonly WorkOrderPart: "WorkOrderPart";
    readonly Document: "Document";
    readonly DocumentChunk: "DocumentChunk";
    readonly IncidentChunk: "IncidentChunk";
    readonly ChatConversation: "ChatConversation";
    readonly ChatMessage: "ChatMessage";
    readonly ChatMessageFeedback: "ChatMessageFeedback";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "machine" | "workOrder" | "repairAction" | "part" | "workOrderPart" | "document" | "documentChunk" | "incidentChunk" | "chatConversation" | "chatMessage" | "chatMessageFeedback";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Machine: {
            payload: Prisma.$MachinePayload<ExtArgs>;
            fields: Prisma.MachineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MachineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MachineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload>;
                };
                findFirst: {
                    args: Prisma.MachineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MachineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload>;
                };
                findMany: {
                    args: Prisma.MachineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload>[];
                };
                create: {
                    args: Prisma.MachineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload>;
                };
                createMany: {
                    args: Prisma.MachineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MachineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload>[];
                };
                delete: {
                    args: Prisma.MachineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload>;
                };
                update: {
                    args: Prisma.MachineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload>;
                };
                deleteMany: {
                    args: Prisma.MachineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MachineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MachineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload>[];
                };
                upsert: {
                    args: Prisma.MachineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MachinePayload>;
                };
                aggregate: {
                    args: Prisma.MachineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMachine>;
                };
                groupBy: {
                    args: Prisma.MachineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MachineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MachineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MachineCountAggregateOutputType> | number;
                };
            };
        };
        WorkOrder: {
            payload: Prisma.$WorkOrderPayload<ExtArgs>;
            fields: Prisma.WorkOrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkOrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkOrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                findFirst: {
                    args: Prisma.WorkOrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkOrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                findMany: {
                    args: Prisma.WorkOrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>[];
                };
                create: {
                    args: Prisma.WorkOrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                createMany: {
                    args: Prisma.WorkOrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkOrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>[];
                };
                delete: {
                    args: Prisma.WorkOrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                update: {
                    args: Prisma.WorkOrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkOrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkOrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkOrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>[];
                };
                upsert: {
                    args: Prisma.WorkOrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPayload>;
                };
                aggregate: {
                    args: Prisma.WorkOrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkOrder>;
                };
                groupBy: {
                    args: Prisma.WorkOrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkOrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkOrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkOrderCountAggregateOutputType> | number;
                };
            };
        };
        RepairAction: {
            payload: Prisma.$RepairActionPayload<ExtArgs>;
            fields: Prisma.RepairActionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RepairActionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RepairActionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload>;
                };
                findFirst: {
                    args: Prisma.RepairActionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RepairActionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload>;
                };
                findMany: {
                    args: Prisma.RepairActionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload>[];
                };
                create: {
                    args: Prisma.RepairActionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload>;
                };
                createMany: {
                    args: Prisma.RepairActionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RepairActionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload>[];
                };
                delete: {
                    args: Prisma.RepairActionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload>;
                };
                update: {
                    args: Prisma.RepairActionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload>;
                };
                deleteMany: {
                    args: Prisma.RepairActionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RepairActionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RepairActionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload>[];
                };
                upsert: {
                    args: Prisma.RepairActionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RepairActionPayload>;
                };
                aggregate: {
                    args: Prisma.RepairActionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRepairAction>;
                };
                groupBy: {
                    args: Prisma.RepairActionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RepairActionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RepairActionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RepairActionCountAggregateOutputType> | number;
                };
            };
        };
        Part: {
            payload: Prisma.$PartPayload<ExtArgs>;
            fields: Prisma.PartFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PartFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PartFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload>;
                };
                findFirst: {
                    args: Prisma.PartFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PartFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload>;
                };
                findMany: {
                    args: Prisma.PartFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload>[];
                };
                create: {
                    args: Prisma.PartCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload>;
                };
                createMany: {
                    args: Prisma.PartCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PartCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload>[];
                };
                delete: {
                    args: Prisma.PartDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload>;
                };
                update: {
                    args: Prisma.PartUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload>;
                };
                deleteMany: {
                    args: Prisma.PartDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PartUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PartUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload>[];
                };
                upsert: {
                    args: Prisma.PartUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PartPayload>;
                };
                aggregate: {
                    args: Prisma.PartAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePart>;
                };
                groupBy: {
                    args: Prisma.PartGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PartGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PartCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PartCountAggregateOutputType> | number;
                };
            };
        };
        WorkOrderPart: {
            payload: Prisma.$WorkOrderPartPayload<ExtArgs>;
            fields: Prisma.WorkOrderPartFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WorkOrderPartFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WorkOrderPartFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>;
                };
                findFirst: {
                    args: Prisma.WorkOrderPartFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WorkOrderPartFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>;
                };
                findMany: {
                    args: Prisma.WorkOrderPartFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>[];
                };
                create: {
                    args: Prisma.WorkOrderPartCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>;
                };
                createMany: {
                    args: Prisma.WorkOrderPartCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WorkOrderPartCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>[];
                };
                delete: {
                    args: Prisma.WorkOrderPartDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>;
                };
                update: {
                    args: Prisma.WorkOrderPartUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>;
                };
                deleteMany: {
                    args: Prisma.WorkOrderPartDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WorkOrderPartUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WorkOrderPartUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>[];
                };
                upsert: {
                    args: Prisma.WorkOrderPartUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WorkOrderPartPayload>;
                };
                aggregate: {
                    args: Prisma.WorkOrderPartAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWorkOrderPart>;
                };
                groupBy: {
                    args: Prisma.WorkOrderPartGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkOrderPartGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WorkOrderPartCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WorkOrderPartCountAggregateOutputType> | number;
                };
            };
        };
        Document: {
            payload: Prisma.$DocumentPayload<ExtArgs>;
            fields: Prisma.DocumentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DocumentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                findFirst: {
                    args: Prisma.DocumentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                findMany: {
                    args: Prisma.DocumentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>[];
                };
                create: {
                    args: Prisma.DocumentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                createMany: {
                    args: Prisma.DocumentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>[];
                };
                delete: {
                    args: Prisma.DocumentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                update: {
                    args: Prisma.DocumentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                deleteMany: {
                    args: Prisma.DocumentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DocumentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>[];
                };
                upsert: {
                    args: Prisma.DocumentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                aggregate: {
                    args: Prisma.DocumentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDocument>;
                };
                groupBy: {
                    args: Prisma.DocumentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DocumentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DocumentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DocumentCountAggregateOutputType> | number;
                };
            };
        };
        DocumentChunk: {
            payload: Prisma.$DocumentChunkPayload<ExtArgs>;
            fields: Prisma.DocumentChunkFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DocumentChunkFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentChunkPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DocumentChunkFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentChunkPayload>;
                };
                findFirst: {
                    args: Prisma.DocumentChunkFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentChunkPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DocumentChunkFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentChunkPayload>;
                };
                findMany: {
                    args: Prisma.DocumentChunkFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentChunkPayload>[];
                };
                delete: {
                    args: Prisma.DocumentChunkDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentChunkPayload>;
                };
                update: {
                    args: Prisma.DocumentChunkUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentChunkPayload>;
                };
                deleteMany: {
                    args: Prisma.DocumentChunkDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DocumentChunkUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DocumentChunkUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentChunkPayload>[];
                };
                aggregate: {
                    args: Prisma.DocumentChunkAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDocumentChunk>;
                };
                groupBy: {
                    args: Prisma.DocumentChunkGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DocumentChunkGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DocumentChunkCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DocumentChunkCountAggregateOutputType> | number;
                };
            };
        };
        IncidentChunk: {
            payload: Prisma.$IncidentChunkPayload<ExtArgs>;
            fields: Prisma.IncidentChunkFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.IncidentChunkFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IncidentChunkPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.IncidentChunkFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IncidentChunkPayload>;
                };
                findFirst: {
                    args: Prisma.IncidentChunkFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IncidentChunkPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.IncidentChunkFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IncidentChunkPayload>;
                };
                findMany: {
                    args: Prisma.IncidentChunkFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IncidentChunkPayload>[];
                };
                delete: {
                    args: Prisma.IncidentChunkDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IncidentChunkPayload>;
                };
                update: {
                    args: Prisma.IncidentChunkUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IncidentChunkPayload>;
                };
                deleteMany: {
                    args: Prisma.IncidentChunkDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.IncidentChunkUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.IncidentChunkUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$IncidentChunkPayload>[];
                };
                aggregate: {
                    args: Prisma.IncidentChunkAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateIncidentChunk>;
                };
                groupBy: {
                    args: Prisma.IncidentChunkGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IncidentChunkGroupByOutputType>[];
                };
                count: {
                    args: Prisma.IncidentChunkCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.IncidentChunkCountAggregateOutputType> | number;
                };
            };
        };
        ChatConversation: {
            payload: Prisma.$ChatConversationPayload<ExtArgs>;
            fields: Prisma.ChatConversationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChatConversationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChatConversationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                findFirst: {
                    args: Prisma.ChatConversationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChatConversationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                findMany: {
                    args: Prisma.ChatConversationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>[];
                };
                create: {
                    args: Prisma.ChatConversationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                createMany: {
                    args: Prisma.ChatConversationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChatConversationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>[];
                };
                delete: {
                    args: Prisma.ChatConversationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                update: {
                    args: Prisma.ChatConversationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                deleteMany: {
                    args: Prisma.ChatConversationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChatConversationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChatConversationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>[];
                };
                upsert: {
                    args: Prisma.ChatConversationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                aggregate: {
                    args: Prisma.ChatConversationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChatConversation>;
                };
                groupBy: {
                    args: Prisma.ChatConversationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatConversationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChatConversationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatConversationCountAggregateOutputType> | number;
                };
            };
        };
        ChatMessage: {
            payload: Prisma.$ChatMessagePayload<ExtArgs>;
            fields: Prisma.ChatMessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChatMessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChatMessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                findFirst: {
                    args: Prisma.ChatMessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChatMessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                findMany: {
                    args: Prisma.ChatMessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                create: {
                    args: Prisma.ChatMessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                createMany: {
                    args: Prisma.ChatMessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChatMessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                delete: {
                    args: Prisma.ChatMessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                update: {
                    args: Prisma.ChatMessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                deleteMany: {
                    args: Prisma.ChatMessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChatMessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChatMessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                upsert: {
                    args: Prisma.ChatMessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                aggregate: {
                    args: Prisma.ChatMessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChatMessage>;
                };
                groupBy: {
                    args: Prisma.ChatMessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatMessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChatMessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatMessageCountAggregateOutputType> | number;
                };
            };
        };
        ChatMessageFeedback: {
            payload: Prisma.$ChatMessageFeedbackPayload<ExtArgs>;
            fields: Prisma.ChatMessageFeedbackFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChatMessageFeedbackFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChatMessageFeedbackFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload>;
                };
                findFirst: {
                    args: Prisma.ChatMessageFeedbackFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChatMessageFeedbackFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload>;
                };
                findMany: {
                    args: Prisma.ChatMessageFeedbackFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload>[];
                };
                create: {
                    args: Prisma.ChatMessageFeedbackCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload>;
                };
                createMany: {
                    args: Prisma.ChatMessageFeedbackCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChatMessageFeedbackCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload>[];
                };
                delete: {
                    args: Prisma.ChatMessageFeedbackDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload>;
                };
                update: {
                    args: Prisma.ChatMessageFeedbackUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload>;
                };
                deleteMany: {
                    args: Prisma.ChatMessageFeedbackDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChatMessageFeedbackUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChatMessageFeedbackUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload>[];
                };
                upsert: {
                    args: Prisma.ChatMessageFeedbackUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessageFeedbackPayload>;
                };
                aggregate: {
                    args: Prisma.ChatMessageFeedbackAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChatMessageFeedback>;
                };
                groupBy: {
                    args: Prisma.ChatMessageFeedbackGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatMessageFeedbackGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChatMessageFeedbackCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatMessageFeedbackCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly name: "name";
    readonly role: "role";
    readonly status: "status";
    readonly active: "active";
    readonly lastLoginAt: "lastLoginAt";
    readonly approvedById: "approvedById";
    readonly approvedAt: "approvedAt";
    readonly rejectedAt: "rejectedAt";
    readonly rejectionReason: "rejectionReason";
    readonly preferences: "preferences";
    readonly phoneNumber: "phoneNumber";
    readonly assignmentWhatsappOptIn: "assignmentWhatsappOptIn";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const MachineScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly code: "code";
    readonly category: "category";
    readonly line: "line";
    readonly area: "area";
    readonly manufacturer: "manufacturer";
    readonly model: "model";
    readonly serialNumber: "serialNumber";
    readonly commissionedAt: "commissionedAt";
    readonly status: "status";
    readonly criticality: "criticality";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MachineScalarFieldEnum = (typeof MachineScalarFieldEnum)[keyof typeof MachineScalarFieldEnum];
export declare const WorkOrderScalarFieldEnum: {
    readonly id: "id";
    readonly publicId: "publicId";
    readonly machineId: "machineId";
    readonly title: "title";
    readonly descriptionRaw: "descriptionRaw";
    readonly status: "status";
    readonly type: "type";
    readonly priority: "priority";
    readonly reportedAt: "reportedAt";
    readonly reportedById: "reportedById";
    readonly assignedToId: "assignedToId";
    readonly startedAt: "startedAt";
    readonly completedAt: "completedAt";
    readonly symptoms: "symptoms";
    readonly suspectedCause: "suspectedCause";
    readonly rootCause: "rootCause";
    readonly failureMode: "failureMode";
    readonly environmentContext: "environmentContext";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkOrderScalarFieldEnum = (typeof WorkOrderScalarFieldEnum)[keyof typeof WorkOrderScalarFieldEnum];
export declare const RepairActionScalarFieldEnum: {
    readonly id: "id";
    readonly workOrderId: "workOrderId";
    readonly performedById: "performedById";
    readonly actions: "actions";
    readonly partsUsed: "partsUsed";
    readonly adjustments: "adjustments";
    readonly verification: "verification";
    readonly success: "success";
    readonly failureNote: "failureNote";
    readonly rootCause: "rootCause";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RepairActionScalarFieldEnum = (typeof RepairActionScalarFieldEnum)[keyof typeof RepairActionScalarFieldEnum];
export declare const PartScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly category: "category";
    readonly partNumber: "partNumber";
    readonly manufacturer: "manufacturer";
    readonly cost: "cost";
    readonly description: "description";
    readonly stockQty: "stockQty";
    readonly minStock: "minStock";
    readonly location: "location";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PartScalarFieldEnum = (typeof PartScalarFieldEnum)[keyof typeof PartScalarFieldEnum];
export declare const WorkOrderPartScalarFieldEnum: {
    readonly id: "id";
    readonly workOrderId: "workOrderId";
    readonly partId: "partId";
    readonly quantity: "quantity";
    readonly createdAt: "createdAt";
};
export type WorkOrderPartScalarFieldEnum = (typeof WorkOrderPartScalarFieldEnum)[keyof typeof WorkOrderPartScalarFieldEnum];
export declare const DocumentScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly type: "type";
    readonly filePath: "filePath";
    readonly fileSize: "fileSize";
    readonly mimeType: "mimeType";
    readonly machineId: "machineId";
    readonly workOrderId: "workOrderId";
    readonly repairActionId: "repairActionId";
    readonly machineType: "machineType";
    readonly language: "language";
    readonly version: "version";
    readonly metadata: "metadata";
    readonly uploadedById: "uploadedById";
    readonly ingestionStatus: "ingestionStatus";
    readonly ingestedAt: "ingestedAt";
    readonly ingestionError: "ingestionError";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum];
export declare const DocumentChunkScalarFieldEnum: {
    readonly id: "id";
    readonly documentId: "documentId";
    readonly chunkIndex: "chunkIndex";
    readonly content: "content";
    readonly tokens: "tokens";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type DocumentChunkScalarFieldEnum = (typeof DocumentChunkScalarFieldEnum)[keyof typeof DocumentChunkScalarFieldEnum];
export declare const IncidentChunkScalarFieldEnum: {
    readonly id: "id";
    readonly workOrderId: "workOrderId";
    readonly chunkIndex: "chunkIndex";
    readonly content: "content";
    readonly tokens: "tokens";
    readonly machineId: "machineId";
    readonly machineType: "machineType";
    readonly language: "language";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type IncidentChunkScalarFieldEnum = (typeof IncidentChunkScalarFieldEnum)[keyof typeof IncidentChunkScalarFieldEnum];
export declare const ChatConversationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly machineId: "machineId";
    readonly title: "title";
    readonly summary: "summary";
    readonly metadata: "metadata";
    readonly lastMessageAt: "lastMessageAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ChatConversationScalarFieldEnum = (typeof ChatConversationScalarFieldEnum)[keyof typeof ChatConversationScalarFieldEnum];
export declare const ChatMessageScalarFieldEnum: {
    readonly id: "id";
    readonly conversationId: "conversationId";
    readonly role: "role";
    readonly content: "content";
    readonly citations: "citations";
    readonly contextChunks: "contextChunks";
    readonly structuredOutput: "structuredOutput";
    readonly createdAt: "createdAt";
};
export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum];
export declare const ChatMessageFeedbackScalarFieldEnum: {
    readonly id: "id";
    readonly messageId: "messageId";
    readonly userId: "userId";
    readonly value: "value";
    readonly createdAt: "createdAt";
};
export type ChatMessageFeedbackScalarFieldEnum = (typeof ChatMessageFeedbackScalarFieldEnum)[keyof typeof ChatMessageFeedbackScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly AnyNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'UserRole'
 */
export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>;
/**
 * Reference to a field of type 'UserRole[]'
 */
export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>;
/**
 * Reference to a field of type 'UserStatus'
 */
export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>;
/**
 * Reference to a field of type 'UserStatus[]'
 */
export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'MachineStatus'
 */
export type EnumMachineStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MachineStatus'>;
/**
 * Reference to a field of type 'MachineStatus[]'
 */
export type ListEnumMachineStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MachineStatus[]'>;
/**
 * Reference to a field of type 'MachineCriticality'
 */
export type EnumMachineCriticalityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MachineCriticality'>;
/**
 * Reference to a field of type 'MachineCriticality[]'
 */
export type ListEnumMachineCriticalityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MachineCriticality[]'>;
/**
 * Reference to a field of type 'WorkOrderStatus'
 */
export type EnumWorkOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkOrderStatus'>;
/**
 * Reference to a field of type 'WorkOrderStatus[]'
 */
export type ListEnumWorkOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkOrderStatus[]'>;
/**
 * Reference to a field of type 'WorkOrderType'
 */
export type EnumWorkOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkOrderType'>;
/**
 * Reference to a field of type 'WorkOrderType[]'
 */
export type ListEnumWorkOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkOrderType[]'>;
/**
 * Reference to a field of type 'WorkOrderPriority'
 */
export type EnumWorkOrderPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkOrderPriority'>;
/**
 * Reference to a field of type 'WorkOrderPriority[]'
 */
export type ListEnumWorkOrderPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkOrderPriority[]'>;
/**
 * Reference to a field of type 'Decimal'
 */
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
/**
 * Reference to a field of type 'Decimal[]'
 */
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'DocumentType'
 */
export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>;
/**
 * Reference to a field of type 'DocumentType[]'
 */
export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>;
/**
 * Reference to a field of type 'DocumentIngestionStatus'
 */
export type EnumDocumentIngestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentIngestionStatus'>;
/**
 * Reference to a field of type 'DocumentIngestionStatus[]'
 */
export type ListEnumDocumentIngestionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentIngestionStatus[]'>;
/**
 * Reference to a field of type 'ChatMessageRole'
 */
export type EnumChatMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatMessageRole'>;
/**
 * Reference to a field of type 'ChatMessageRole[]'
 */
export type ListEnumChatMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatMessageRole[]'>;
/**
 * Reference to a field of type 'AiFeedbackValue'
 */
export type EnumAiFeedbackValueFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AiFeedbackValue'>;
/**
 * Reference to a field of type 'AiFeedbackValue[]'
 */
export type ListEnumAiFeedbackValueFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AiFeedbackValue[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export type Datasource = {
    url?: string;
};
export type Datasources = {
    db?: Datasource;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
}
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    machine?: Prisma.MachineOmit;
    workOrder?: Prisma.WorkOrderOmit;
    repairAction?: Prisma.RepairActionOmit;
    part?: Prisma.PartOmit;
    workOrderPart?: Prisma.WorkOrderPartOmit;
    document?: Prisma.DocumentOmit;
    documentChunk?: Prisma.DocumentChunkOmit;
    incidentChunk?: Prisma.IncidentChunkOmit;
    chatConversation?: Prisma.ChatConversationOmit;
    chatMessage?: Prisma.ChatMessageOmit;
    chatMessageFeedback?: Prisma.ChatMessageFeedbackOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map