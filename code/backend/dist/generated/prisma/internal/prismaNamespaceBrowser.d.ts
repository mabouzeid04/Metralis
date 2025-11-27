import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
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
export declare const ModelName: {
    readonly User: "User";
    readonly Machine: "Machine";
    readonly WorkOrder: "WorkOrder";
    readonly RepairAction: "RepairAction";
    readonly Part: "Part";
    readonly WorkOrderPart: "WorkOrderPart";
    readonly Document: "Document";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
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
    readonly active: "active";
    readonly lastLoginAt: "lastLoginAt";
    readonly preferences: "preferences";
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
    readonly machineType: "machineType";
    readonly language: "language";
    readonly version: "version";
    readonly metadata: "metadata";
    readonly uploadedById: "uploadedById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum];
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
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map