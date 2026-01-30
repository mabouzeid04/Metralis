import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model WorkOrder
 *
 */
export type WorkOrderModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkOrderPayload>;
export type AggregateWorkOrder = {
    _count: WorkOrderCountAggregateOutputType | null;
    _avg: WorkOrderAvgAggregateOutputType | null;
    _sum: WorkOrderSumAggregateOutputType | null;
    _min: WorkOrderMinAggregateOutputType | null;
    _max: WorkOrderMaxAggregateOutputType | null;
};
export type WorkOrderAvgAggregateOutputType = {
    maintenanceDurationMin: number | null;
    downtimeDurationMin: number | null;
};
export type WorkOrderSumAggregateOutputType = {
    maintenanceDurationMin: number | null;
    downtimeDurationMin: number | null;
};
export type WorkOrderMinAggregateOutputType = {
    id: string | null;
    publicId: string | null;
    machineId: string | null;
    assetId: string | null;
    title: string | null;
    descriptionRaw: string | null;
    status: $Enums.WorkOrderStatus | null;
    type: $Enums.WorkOrderType | null;
    priority: $Enums.WorkOrderPriority | null;
    reportedAt: Date | null;
    reportedById: string | null;
    assignedToId: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    suspectedCause: string | null;
    rootCause: string | null;
    failureMode: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    maintenanceType: string | null;
    equipmentStopTime: Date | null;
    faultReportTime: Date | null;
    repairStartTime: Date | null;
    maintenanceStartTime: Date | null;
    maintenanceEndTime: Date | null;
    maintenanceDescription: string | null;
    correctiveAction: string | null;
    notesAndRecommendations: string | null;
    equipmentStatusAfter: string | null;
    maintenanceDurationMin: number | null;
    downtimeDurationMin: number | null;
    areaLeaderId: string | null;
    maintenanceSupervisorId: string | null;
    performerId: string | null;
    machineReceiverId: string | null;
    responsibleEngineerId: string | null;
    maintenanceEngineerId: string | null;
    maintenanceManagerId: string | null;
};
export type WorkOrderMaxAggregateOutputType = {
    id: string | null;
    publicId: string | null;
    machineId: string | null;
    assetId: string | null;
    title: string | null;
    descriptionRaw: string | null;
    status: $Enums.WorkOrderStatus | null;
    type: $Enums.WorkOrderType | null;
    priority: $Enums.WorkOrderPriority | null;
    reportedAt: Date | null;
    reportedById: string | null;
    assignedToId: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    suspectedCause: string | null;
    rootCause: string | null;
    failureMode: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    maintenanceType: string | null;
    equipmentStopTime: Date | null;
    faultReportTime: Date | null;
    repairStartTime: Date | null;
    maintenanceStartTime: Date | null;
    maintenanceEndTime: Date | null;
    maintenanceDescription: string | null;
    correctiveAction: string | null;
    notesAndRecommendations: string | null;
    equipmentStatusAfter: string | null;
    maintenanceDurationMin: number | null;
    downtimeDurationMin: number | null;
    areaLeaderId: string | null;
    maintenanceSupervisorId: string | null;
    performerId: string | null;
    machineReceiverId: string | null;
    responsibleEngineerId: string | null;
    maintenanceEngineerId: string | null;
    maintenanceManagerId: string | null;
};
export type WorkOrderCountAggregateOutputType = {
    id: number;
    publicId: number;
    machineId: number;
    assetId: number;
    title: number;
    descriptionRaw: number;
    status: number;
    type: number;
    priority: number;
    reportedAt: number;
    reportedById: number;
    assignedToId: number;
    startedAt: number;
    completedAt: number;
    symptoms: number;
    suspectedCause: number;
    rootCause: number;
    failureMode: number;
    environmentContext: number;
    metadata: number;
    createdAt: number;
    updatedAt: number;
    maintenanceType: number;
    maintenanceDisciplines: number;
    equipmentStopTime: number;
    faultReportTime: number;
    repairStartTime: number;
    maintenanceStartTime: number;
    maintenanceEndTime: number;
    maintenanceDescription: number;
    correctiveAction: number;
    notesAndRecommendations: number;
    equipmentStatusAfter: number;
    maintenanceDurationMin: number;
    downtimeDurationMin: number;
    areaLeaderId: number;
    maintenanceSupervisorId: number;
    performerId: number;
    machineReceiverId: number;
    responsibleEngineerId: number;
    maintenanceEngineerId: number;
    maintenanceManagerId: number;
    _all: number;
};
export type WorkOrderAvgAggregateInputType = {
    maintenanceDurationMin?: true;
    downtimeDurationMin?: true;
};
export type WorkOrderSumAggregateInputType = {
    maintenanceDurationMin?: true;
    downtimeDurationMin?: true;
};
export type WorkOrderMinAggregateInputType = {
    id?: true;
    publicId?: true;
    machineId?: true;
    assetId?: true;
    title?: true;
    descriptionRaw?: true;
    status?: true;
    type?: true;
    priority?: true;
    reportedAt?: true;
    reportedById?: true;
    assignedToId?: true;
    startedAt?: true;
    completedAt?: true;
    suspectedCause?: true;
    rootCause?: true;
    failureMode?: true;
    createdAt?: true;
    updatedAt?: true;
    maintenanceType?: true;
    equipmentStopTime?: true;
    faultReportTime?: true;
    repairStartTime?: true;
    maintenanceStartTime?: true;
    maintenanceEndTime?: true;
    maintenanceDescription?: true;
    correctiveAction?: true;
    notesAndRecommendations?: true;
    equipmentStatusAfter?: true;
    maintenanceDurationMin?: true;
    downtimeDurationMin?: true;
    areaLeaderId?: true;
    maintenanceSupervisorId?: true;
    performerId?: true;
    machineReceiverId?: true;
    responsibleEngineerId?: true;
    maintenanceEngineerId?: true;
    maintenanceManagerId?: true;
};
export type WorkOrderMaxAggregateInputType = {
    id?: true;
    publicId?: true;
    machineId?: true;
    assetId?: true;
    title?: true;
    descriptionRaw?: true;
    status?: true;
    type?: true;
    priority?: true;
    reportedAt?: true;
    reportedById?: true;
    assignedToId?: true;
    startedAt?: true;
    completedAt?: true;
    suspectedCause?: true;
    rootCause?: true;
    failureMode?: true;
    createdAt?: true;
    updatedAt?: true;
    maintenanceType?: true;
    equipmentStopTime?: true;
    faultReportTime?: true;
    repairStartTime?: true;
    maintenanceStartTime?: true;
    maintenanceEndTime?: true;
    maintenanceDescription?: true;
    correctiveAction?: true;
    notesAndRecommendations?: true;
    equipmentStatusAfter?: true;
    maintenanceDurationMin?: true;
    downtimeDurationMin?: true;
    areaLeaderId?: true;
    maintenanceSupervisorId?: true;
    performerId?: true;
    machineReceiverId?: true;
    responsibleEngineerId?: true;
    maintenanceEngineerId?: true;
    maintenanceManagerId?: true;
};
export type WorkOrderCountAggregateInputType = {
    id?: true;
    publicId?: true;
    machineId?: true;
    assetId?: true;
    title?: true;
    descriptionRaw?: true;
    status?: true;
    type?: true;
    priority?: true;
    reportedAt?: true;
    reportedById?: true;
    assignedToId?: true;
    startedAt?: true;
    completedAt?: true;
    symptoms?: true;
    suspectedCause?: true;
    rootCause?: true;
    failureMode?: true;
    environmentContext?: true;
    metadata?: true;
    createdAt?: true;
    updatedAt?: true;
    maintenanceType?: true;
    maintenanceDisciplines?: true;
    equipmentStopTime?: true;
    faultReportTime?: true;
    repairStartTime?: true;
    maintenanceStartTime?: true;
    maintenanceEndTime?: true;
    maintenanceDescription?: true;
    correctiveAction?: true;
    notesAndRecommendations?: true;
    equipmentStatusAfter?: true;
    maintenanceDurationMin?: true;
    downtimeDurationMin?: true;
    areaLeaderId?: true;
    maintenanceSupervisorId?: true;
    performerId?: true;
    machineReceiverId?: true;
    responsibleEngineerId?: true;
    maintenanceEngineerId?: true;
    maintenanceManagerId?: true;
    _all?: true;
};
export type WorkOrderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrder to aggregate.
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WorkOrders
    **/
    _count?: true | WorkOrderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: WorkOrderAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: WorkOrderSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: WorkOrderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: WorkOrderMaxAggregateInputType;
};
export type GetWorkOrderAggregateType<T extends WorkOrderAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkOrder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkOrder[P]> : Prisma.GetScalarType<T[P], AggregateWorkOrder[P]>;
};
export type WorkOrderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithAggregationInput | Prisma.WorkOrderOrderByWithAggregationInput[];
    by: Prisma.WorkOrderScalarFieldEnum[] | Prisma.WorkOrderScalarFieldEnum;
    having?: Prisma.WorkOrderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkOrderCountAggregateInputType | true;
    _avg?: WorkOrderAvgAggregateInputType;
    _sum?: WorkOrderSumAggregateInputType;
    _min?: WorkOrderMinAggregateInputType;
    _max?: WorkOrderMaxAggregateInputType;
};
export type WorkOrderGroupByOutputType = {
    id: string;
    publicId: string;
    machineId: string | null;
    assetId: string | null;
    title: string;
    descriptionRaw: string;
    status: $Enums.WorkOrderStatus;
    type: $Enums.WorkOrderType;
    priority: $Enums.WorkOrderPriority;
    reportedAt: Date;
    reportedById: string;
    assignedToId: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    symptoms: runtime.JsonValue | null;
    suspectedCause: string | null;
    rootCause: string | null;
    failureMode: string | null;
    environmentContext: runtime.JsonValue | null;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    maintenanceType: string | null;
    maintenanceDisciplines: string[];
    equipmentStopTime: Date | null;
    faultReportTime: Date | null;
    repairStartTime: Date | null;
    maintenanceStartTime: Date | null;
    maintenanceEndTime: Date | null;
    maintenanceDescription: string | null;
    correctiveAction: string | null;
    notesAndRecommendations: string | null;
    equipmentStatusAfter: string | null;
    maintenanceDurationMin: number | null;
    downtimeDurationMin: number | null;
    areaLeaderId: string | null;
    maintenanceSupervisorId: string | null;
    performerId: string | null;
    machineReceiverId: string | null;
    responsibleEngineerId: string | null;
    maintenanceEngineerId: string | null;
    maintenanceManagerId: string | null;
    _count: WorkOrderCountAggregateOutputType | null;
    _avg: WorkOrderAvgAggregateOutputType | null;
    _sum: WorkOrderSumAggregateOutputType | null;
    _min: WorkOrderMinAggregateOutputType | null;
    _max: WorkOrderMaxAggregateOutputType | null;
};
type GetWorkOrderGroupByPayload<T extends WorkOrderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkOrderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkOrderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkOrderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkOrderGroupByOutputType[P]>;
}>>;
export type WorkOrderWhereInput = {
    AND?: Prisma.WorkOrderWhereInput | Prisma.WorkOrderWhereInput[];
    OR?: Prisma.WorkOrderWhereInput[];
    NOT?: Prisma.WorkOrderWhereInput | Prisma.WorkOrderWhereInput[];
    id?: Prisma.StringFilter<"WorkOrder"> | string;
    publicId?: Prisma.StringFilter<"WorkOrder"> | string;
    machineId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    assetId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    title?: Prisma.StringFilter<"WorkOrder"> | string;
    descriptionRaw?: Prisma.StringFilter<"WorkOrder"> | string;
    status?: Prisma.EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFilter<"WorkOrder"> | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFilter<"WorkOrder"> | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    reportedById?: Prisma.StringFilter<"WorkOrder"> | string;
    assignedToId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    symptoms?: Prisma.JsonNullableFilter<"WorkOrder">;
    suspectedCause?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    rootCause?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    failureMode?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    environmentContext?: Prisma.JsonNullableFilter<"WorkOrder">;
    metadata?: Prisma.JsonNullableFilter<"WorkOrder">;
    createdAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    maintenanceType?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceDisciplines?: Prisma.StringNullableListFilter<"WorkOrder">;
    equipmentStopTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    faultReportTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    repairStartTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    maintenanceStartTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    maintenanceEndTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    maintenanceDescription?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    correctiveAction?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    notesAndRecommendations?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    equipmentStatusAfter?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceDurationMin?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    downtimeDurationMin?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    areaLeaderId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceSupervisorId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    performerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    machineReceiverId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    responsibleEngineerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceEngineerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceManagerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    machine?: Prisma.XOR<Prisma.MachineNullableScalarRelationFilter, Prisma.MachineWhereInput> | null;
    asset?: Prisma.XOR<Prisma.AssetNullableScalarRelationFilter, Prisma.AssetWhereInput> | null;
    reportedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    assignedTo?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    areaLeader?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    maintenanceSupervisor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    performer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    machineReceiver?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    responsibleEngineer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    maintenanceEngineer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    maintenanceManager?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    repairActions?: Prisma.RepairActionListRelationFilter;
    parts?: Prisma.WorkOrderPartListRelationFilter;
    attachments?: Prisma.DocumentListRelationFilter;
    incidentChunks?: Prisma.IncidentChunkListRelationFilter;
};
export type WorkOrderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    machineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    assetId?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    descriptionRaw?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    reportedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    symptoms?: Prisma.SortOrderInput | Prisma.SortOrder;
    suspectedCause?: Prisma.SortOrderInput | Prisma.SortOrder;
    rootCause?: Prisma.SortOrderInput | Prisma.SortOrder;
    failureMode?: Prisma.SortOrderInput | Prisma.SortOrder;
    environmentContext?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    maintenanceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceDisciplines?: Prisma.SortOrder;
    equipmentStopTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    faultReportTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    repairStartTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceStartTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceEndTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    correctiveAction?: Prisma.SortOrderInput | Prisma.SortOrder;
    notesAndRecommendations?: Prisma.SortOrderInput | Prisma.SortOrder;
    equipmentStatusAfter?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceDurationMin?: Prisma.SortOrderInput | Prisma.SortOrder;
    downtimeDurationMin?: Prisma.SortOrderInput | Prisma.SortOrder;
    areaLeaderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceSupervisorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    performerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    machineReceiverId?: Prisma.SortOrderInput | Prisma.SortOrder;
    responsibleEngineerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceEngineerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceManagerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    machine?: Prisma.MachineOrderByWithRelationInput;
    asset?: Prisma.AssetOrderByWithRelationInput;
    reportedBy?: Prisma.UserOrderByWithRelationInput;
    assignedTo?: Prisma.UserOrderByWithRelationInput;
    areaLeader?: Prisma.UserOrderByWithRelationInput;
    maintenanceSupervisor?: Prisma.UserOrderByWithRelationInput;
    performer?: Prisma.UserOrderByWithRelationInput;
    machineReceiver?: Prisma.UserOrderByWithRelationInput;
    responsibleEngineer?: Prisma.UserOrderByWithRelationInput;
    maintenanceEngineer?: Prisma.UserOrderByWithRelationInput;
    maintenanceManager?: Prisma.UserOrderByWithRelationInput;
    repairActions?: Prisma.RepairActionOrderByRelationAggregateInput;
    parts?: Prisma.WorkOrderPartOrderByRelationAggregateInput;
    attachments?: Prisma.DocumentOrderByRelationAggregateInput;
    incidentChunks?: Prisma.IncidentChunkOrderByRelationAggregateInput;
};
export type WorkOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    publicId?: string;
    AND?: Prisma.WorkOrderWhereInput | Prisma.WorkOrderWhereInput[];
    OR?: Prisma.WorkOrderWhereInput[];
    NOT?: Prisma.WorkOrderWhereInput | Prisma.WorkOrderWhereInput[];
    machineId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    assetId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    title?: Prisma.StringFilter<"WorkOrder"> | string;
    descriptionRaw?: Prisma.StringFilter<"WorkOrder"> | string;
    status?: Prisma.EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFilter<"WorkOrder"> | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFilter<"WorkOrder"> | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    reportedById?: Prisma.StringFilter<"WorkOrder"> | string;
    assignedToId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    symptoms?: Prisma.JsonNullableFilter<"WorkOrder">;
    suspectedCause?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    rootCause?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    failureMode?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    environmentContext?: Prisma.JsonNullableFilter<"WorkOrder">;
    metadata?: Prisma.JsonNullableFilter<"WorkOrder">;
    createdAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    maintenanceType?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceDisciplines?: Prisma.StringNullableListFilter<"WorkOrder">;
    equipmentStopTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    faultReportTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    repairStartTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    maintenanceStartTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    maintenanceEndTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    maintenanceDescription?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    correctiveAction?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    notesAndRecommendations?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    equipmentStatusAfter?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceDurationMin?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    downtimeDurationMin?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    areaLeaderId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceSupervisorId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    performerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    machineReceiverId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    responsibleEngineerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceEngineerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceManagerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    machine?: Prisma.XOR<Prisma.MachineNullableScalarRelationFilter, Prisma.MachineWhereInput> | null;
    asset?: Prisma.XOR<Prisma.AssetNullableScalarRelationFilter, Prisma.AssetWhereInput> | null;
    reportedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    assignedTo?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    areaLeader?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    maintenanceSupervisor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    performer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    machineReceiver?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    responsibleEngineer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    maintenanceEngineer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    maintenanceManager?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    repairActions?: Prisma.RepairActionListRelationFilter;
    parts?: Prisma.WorkOrderPartListRelationFilter;
    attachments?: Prisma.DocumentListRelationFilter;
    incidentChunks?: Prisma.IncidentChunkListRelationFilter;
}, "id" | "publicId">;
export type WorkOrderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    machineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    assetId?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrder;
    descriptionRaw?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    reportedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    symptoms?: Prisma.SortOrderInput | Prisma.SortOrder;
    suspectedCause?: Prisma.SortOrderInput | Prisma.SortOrder;
    rootCause?: Prisma.SortOrderInput | Prisma.SortOrder;
    failureMode?: Prisma.SortOrderInput | Prisma.SortOrder;
    environmentContext?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    maintenanceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceDisciplines?: Prisma.SortOrder;
    equipmentStopTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    faultReportTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    repairStartTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceStartTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceEndTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    correctiveAction?: Prisma.SortOrderInput | Prisma.SortOrder;
    notesAndRecommendations?: Prisma.SortOrderInput | Prisma.SortOrder;
    equipmentStatusAfter?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceDurationMin?: Prisma.SortOrderInput | Prisma.SortOrder;
    downtimeDurationMin?: Prisma.SortOrderInput | Prisma.SortOrder;
    areaLeaderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceSupervisorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    performerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    machineReceiverId?: Prisma.SortOrderInput | Prisma.SortOrder;
    responsibleEngineerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceEngineerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    maintenanceManagerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.WorkOrderCountOrderByAggregateInput;
    _avg?: Prisma.WorkOrderAvgOrderByAggregateInput;
    _max?: Prisma.WorkOrderMaxOrderByAggregateInput;
    _min?: Prisma.WorkOrderMinOrderByAggregateInput;
    _sum?: Prisma.WorkOrderSumOrderByAggregateInput;
};
export type WorkOrderScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkOrderScalarWhereWithAggregatesInput | Prisma.WorkOrderScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkOrderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkOrderScalarWhereWithAggregatesInput | Prisma.WorkOrderScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WorkOrder"> | string;
    publicId?: Prisma.StringWithAggregatesFilter<"WorkOrder"> | string;
    machineId?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    assetId?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    title?: Prisma.StringWithAggregatesFilter<"WorkOrder"> | string;
    descriptionRaw?: Prisma.StringWithAggregatesFilter<"WorkOrder"> | string;
    status?: Prisma.EnumWorkOrderStatusWithAggregatesFilter<"WorkOrder"> | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeWithAggregatesFilter<"WorkOrder"> | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityWithAggregatesFilter<"WorkOrder"> | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkOrder"> | Date | string;
    reportedById?: Prisma.StringWithAggregatesFilter<"WorkOrder"> | string;
    assignedToId?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    symptoms?: Prisma.JsonNullableWithAggregatesFilter<"WorkOrder">;
    suspectedCause?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    rootCause?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    failureMode?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    environmentContext?: Prisma.JsonNullableWithAggregatesFilter<"WorkOrder">;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"WorkOrder">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WorkOrder"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkOrder"> | Date | string;
    maintenanceType?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    maintenanceDisciplines?: Prisma.StringNullableListFilter<"WorkOrder">;
    equipmentStopTime?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    faultReportTime?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    repairStartTime?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    maintenanceStartTime?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    maintenanceEndTime?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    maintenanceDescription?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    correctiveAction?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    notesAndRecommendations?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    equipmentStatusAfter?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    maintenanceDurationMin?: Prisma.IntNullableWithAggregatesFilter<"WorkOrder"> | number | null;
    downtimeDurationMin?: Prisma.IntNullableWithAggregatesFilter<"WorkOrder"> | number | null;
    areaLeaderId?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    maintenanceSupervisorId?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    performerId?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    machineReceiverId?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    responsibleEngineerId?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    maintenanceEngineerId?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
    maintenanceManagerId?: Prisma.StringNullableWithAggregatesFilter<"WorkOrder"> | string | null;
};
export type WorkOrderCreateInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderCreateManyInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type WorkOrderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderListRelationFilter = {
    every?: Prisma.WorkOrderWhereInput;
    some?: Prisma.WorkOrderWhereInput;
    none?: Prisma.WorkOrderWhereInput;
};
export type WorkOrderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkOrderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    machineId?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    descriptionRaw?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    reportedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    symptoms?: Prisma.SortOrder;
    suspectedCause?: Prisma.SortOrder;
    rootCause?: Prisma.SortOrder;
    failureMode?: Prisma.SortOrder;
    environmentContext?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    maintenanceType?: Prisma.SortOrder;
    maintenanceDisciplines?: Prisma.SortOrder;
    equipmentStopTime?: Prisma.SortOrder;
    faultReportTime?: Prisma.SortOrder;
    repairStartTime?: Prisma.SortOrder;
    maintenanceStartTime?: Prisma.SortOrder;
    maintenanceEndTime?: Prisma.SortOrder;
    maintenanceDescription?: Prisma.SortOrder;
    correctiveAction?: Prisma.SortOrder;
    notesAndRecommendations?: Prisma.SortOrder;
    equipmentStatusAfter?: Prisma.SortOrder;
    maintenanceDurationMin?: Prisma.SortOrder;
    downtimeDurationMin?: Prisma.SortOrder;
    areaLeaderId?: Prisma.SortOrder;
    maintenanceSupervisorId?: Prisma.SortOrder;
    performerId?: Prisma.SortOrder;
    machineReceiverId?: Prisma.SortOrder;
    responsibleEngineerId?: Prisma.SortOrder;
    maintenanceEngineerId?: Prisma.SortOrder;
    maintenanceManagerId?: Prisma.SortOrder;
};
export type WorkOrderAvgOrderByAggregateInput = {
    maintenanceDurationMin?: Prisma.SortOrder;
    downtimeDurationMin?: Prisma.SortOrder;
};
export type WorkOrderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    machineId?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    descriptionRaw?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    reportedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    suspectedCause?: Prisma.SortOrder;
    rootCause?: Prisma.SortOrder;
    failureMode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    maintenanceType?: Prisma.SortOrder;
    equipmentStopTime?: Prisma.SortOrder;
    faultReportTime?: Prisma.SortOrder;
    repairStartTime?: Prisma.SortOrder;
    maintenanceStartTime?: Prisma.SortOrder;
    maintenanceEndTime?: Prisma.SortOrder;
    maintenanceDescription?: Prisma.SortOrder;
    correctiveAction?: Prisma.SortOrder;
    notesAndRecommendations?: Prisma.SortOrder;
    equipmentStatusAfter?: Prisma.SortOrder;
    maintenanceDurationMin?: Prisma.SortOrder;
    downtimeDurationMin?: Prisma.SortOrder;
    areaLeaderId?: Prisma.SortOrder;
    maintenanceSupervisorId?: Prisma.SortOrder;
    performerId?: Prisma.SortOrder;
    machineReceiverId?: Prisma.SortOrder;
    responsibleEngineerId?: Prisma.SortOrder;
    maintenanceEngineerId?: Prisma.SortOrder;
    maintenanceManagerId?: Prisma.SortOrder;
};
export type WorkOrderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    machineId?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    descriptionRaw?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    reportedAt?: Prisma.SortOrder;
    reportedById?: Prisma.SortOrder;
    assignedToId?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    suspectedCause?: Prisma.SortOrder;
    rootCause?: Prisma.SortOrder;
    failureMode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    maintenanceType?: Prisma.SortOrder;
    equipmentStopTime?: Prisma.SortOrder;
    faultReportTime?: Prisma.SortOrder;
    repairStartTime?: Prisma.SortOrder;
    maintenanceStartTime?: Prisma.SortOrder;
    maintenanceEndTime?: Prisma.SortOrder;
    maintenanceDescription?: Prisma.SortOrder;
    correctiveAction?: Prisma.SortOrder;
    notesAndRecommendations?: Prisma.SortOrder;
    equipmentStatusAfter?: Prisma.SortOrder;
    maintenanceDurationMin?: Prisma.SortOrder;
    downtimeDurationMin?: Prisma.SortOrder;
    areaLeaderId?: Prisma.SortOrder;
    maintenanceSupervisorId?: Prisma.SortOrder;
    performerId?: Prisma.SortOrder;
    machineReceiverId?: Prisma.SortOrder;
    responsibleEngineerId?: Prisma.SortOrder;
    maintenanceEngineerId?: Prisma.SortOrder;
    maintenanceManagerId?: Prisma.SortOrder;
};
export type WorkOrderSumOrderByAggregateInput = {
    maintenanceDurationMin?: Prisma.SortOrder;
    downtimeDurationMin?: Prisma.SortOrder;
};
export type WorkOrderScalarRelationFilter = {
    is?: Prisma.WorkOrderWhereInput;
    isNot?: Prisma.WorkOrderWhereInput;
};
export type WorkOrderNullableScalarRelationFilter = {
    is?: Prisma.WorkOrderWhereInput | null;
    isNot?: Prisma.WorkOrderWhereInput | null;
};
export type WorkOrderCreateNestedManyWithoutReportedByInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutReportedByInput, Prisma.WorkOrderUncheckedCreateWithoutReportedByInput> | Prisma.WorkOrderCreateWithoutReportedByInput[] | Prisma.WorkOrderUncheckedCreateWithoutReportedByInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutReportedByInput | Prisma.WorkOrderCreateOrConnectWithoutReportedByInput[];
    createMany?: Prisma.WorkOrderCreateManyReportedByInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderCreateNestedManyWithoutAssignedToInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedToInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput> | Prisma.WorkOrderCreateWithoutAssignedToInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedToInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedToInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedToInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderCreateNestedManyWithoutAreaLeaderInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAreaLeaderInput, Prisma.WorkOrderUncheckedCreateWithoutAreaLeaderInput> | Prisma.WorkOrderCreateWithoutAreaLeaderInput[] | Prisma.WorkOrderUncheckedCreateWithoutAreaLeaderInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAreaLeaderInput | Prisma.WorkOrderCreateOrConnectWithoutAreaLeaderInput[];
    createMany?: Prisma.WorkOrderCreateManyAreaLeaderInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceSupervisorInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput> | Prisma.WorkOrderCreateWithoutMaintenanceSupervisorInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceSupervisorInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceSupervisorInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceSupervisorInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderCreateNestedManyWithoutPerformerInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutPerformerInput, Prisma.WorkOrderUncheckedCreateWithoutPerformerInput> | Prisma.WorkOrderCreateWithoutPerformerInput[] | Prisma.WorkOrderUncheckedCreateWithoutPerformerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutPerformerInput | Prisma.WorkOrderCreateOrConnectWithoutPerformerInput[];
    createMany?: Prisma.WorkOrderCreateManyPerformerInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderCreateNestedManyWithoutMachineReceiverInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineReceiverInput, Prisma.WorkOrderUncheckedCreateWithoutMachineReceiverInput> | Prisma.WorkOrderCreateWithoutMachineReceiverInput[] | Prisma.WorkOrderUncheckedCreateWithoutMachineReceiverInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMachineReceiverInput | Prisma.WorkOrderCreateOrConnectWithoutMachineReceiverInput[];
    createMany?: Prisma.WorkOrderCreateManyMachineReceiverInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderCreateNestedManyWithoutResponsibleEngineerInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutResponsibleEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutResponsibleEngineerInput> | Prisma.WorkOrderCreateWithoutResponsibleEngineerInput[] | Prisma.WorkOrderUncheckedCreateWithoutResponsibleEngineerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutResponsibleEngineerInput | Prisma.WorkOrderCreateOrConnectWithoutResponsibleEngineerInput[];
    createMany?: Prisma.WorkOrderCreateManyResponsibleEngineerInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput> | Prisma.WorkOrderCreateWithoutMaintenanceEngineerInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceEngineerInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceEngineerInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceEngineerInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderCreateNestedManyWithoutMaintenanceManagerInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceManagerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceManagerInput> | Prisma.WorkOrderCreateWithoutMaintenanceManagerInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceManagerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceManagerInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceManagerInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceManagerInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutReportedByInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutReportedByInput, Prisma.WorkOrderUncheckedCreateWithoutReportedByInput> | Prisma.WorkOrderCreateWithoutReportedByInput[] | Prisma.WorkOrderUncheckedCreateWithoutReportedByInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutReportedByInput | Prisma.WorkOrderCreateOrConnectWithoutReportedByInput[];
    createMany?: Prisma.WorkOrderCreateManyReportedByInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedToInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput> | Prisma.WorkOrderCreateWithoutAssignedToInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedToInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedToInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedToInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAreaLeaderInput, Prisma.WorkOrderUncheckedCreateWithoutAreaLeaderInput> | Prisma.WorkOrderCreateWithoutAreaLeaderInput[] | Prisma.WorkOrderUncheckedCreateWithoutAreaLeaderInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAreaLeaderInput | Prisma.WorkOrderCreateOrConnectWithoutAreaLeaderInput[];
    createMany?: Prisma.WorkOrderCreateManyAreaLeaderInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceSupervisorInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput> | Prisma.WorkOrderCreateWithoutMaintenanceSupervisorInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceSupervisorInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceSupervisorInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceSupervisorInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutPerformerInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutPerformerInput, Prisma.WorkOrderUncheckedCreateWithoutPerformerInput> | Prisma.WorkOrderCreateWithoutPerformerInput[] | Prisma.WorkOrderUncheckedCreateWithoutPerformerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutPerformerInput | Prisma.WorkOrderCreateOrConnectWithoutPerformerInput[];
    createMany?: Prisma.WorkOrderCreateManyPerformerInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineReceiverInput, Prisma.WorkOrderUncheckedCreateWithoutMachineReceiverInput> | Prisma.WorkOrderCreateWithoutMachineReceiverInput[] | Prisma.WorkOrderUncheckedCreateWithoutMachineReceiverInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMachineReceiverInput | Prisma.WorkOrderCreateOrConnectWithoutMachineReceiverInput[];
    createMany?: Prisma.WorkOrderCreateManyMachineReceiverInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutResponsibleEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutResponsibleEngineerInput> | Prisma.WorkOrderCreateWithoutResponsibleEngineerInput[] | Prisma.WorkOrderUncheckedCreateWithoutResponsibleEngineerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutResponsibleEngineerInput | Prisma.WorkOrderCreateOrConnectWithoutResponsibleEngineerInput[];
    createMany?: Prisma.WorkOrderCreateManyResponsibleEngineerInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput> | Prisma.WorkOrderCreateWithoutMaintenanceEngineerInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceEngineerInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceEngineerInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceEngineerInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceManagerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceManagerInput> | Prisma.WorkOrderCreateWithoutMaintenanceManagerInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceManagerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceManagerInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceManagerInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceManagerInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUpdateManyWithoutReportedByNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutReportedByInput, Prisma.WorkOrderUncheckedCreateWithoutReportedByInput> | Prisma.WorkOrderCreateWithoutReportedByInput[] | Prisma.WorkOrderUncheckedCreateWithoutReportedByInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutReportedByInput | Prisma.WorkOrderCreateOrConnectWithoutReportedByInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutReportedByInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutReportedByInput[];
    createMany?: Prisma.WorkOrderCreateManyReportedByInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutReportedByInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutReportedByInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutReportedByInput | Prisma.WorkOrderUpdateManyWithWhereWithoutReportedByInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUpdateManyWithoutAssignedToNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedToInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput> | Prisma.WorkOrderCreateWithoutAssignedToInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedToInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedToInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedToInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedToInput | Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedToInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUpdateManyWithoutAreaLeaderNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAreaLeaderInput, Prisma.WorkOrderUncheckedCreateWithoutAreaLeaderInput> | Prisma.WorkOrderCreateWithoutAreaLeaderInput[] | Prisma.WorkOrderUncheckedCreateWithoutAreaLeaderInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAreaLeaderInput | Prisma.WorkOrderCreateOrConnectWithoutAreaLeaderInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutAreaLeaderInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutAreaLeaderInput[];
    createMany?: Prisma.WorkOrderCreateManyAreaLeaderInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutAreaLeaderInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutAreaLeaderInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutAreaLeaderInput | Prisma.WorkOrderUpdateManyWithWhereWithoutAreaLeaderInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceSupervisorInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput> | Prisma.WorkOrderCreateWithoutMaintenanceSupervisorInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceSupervisorInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceSupervisorInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceSupervisorInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceSupervisorInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceSupervisorInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceSupervisorInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceSupervisorInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceSupervisorInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceSupervisorInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUpdateManyWithoutPerformerNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutPerformerInput, Prisma.WorkOrderUncheckedCreateWithoutPerformerInput> | Prisma.WorkOrderCreateWithoutPerformerInput[] | Prisma.WorkOrderUncheckedCreateWithoutPerformerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutPerformerInput | Prisma.WorkOrderCreateOrConnectWithoutPerformerInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutPerformerInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutPerformerInput[];
    createMany?: Prisma.WorkOrderCreateManyPerformerInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutPerformerInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutPerformerInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutPerformerInput | Prisma.WorkOrderUpdateManyWithWhereWithoutPerformerInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUpdateManyWithoutMachineReceiverNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineReceiverInput, Prisma.WorkOrderUncheckedCreateWithoutMachineReceiverInput> | Prisma.WorkOrderCreateWithoutMachineReceiverInput[] | Prisma.WorkOrderUncheckedCreateWithoutMachineReceiverInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMachineReceiverInput | Prisma.WorkOrderCreateOrConnectWithoutMachineReceiverInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMachineReceiverInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMachineReceiverInput[];
    createMany?: Prisma.WorkOrderCreateManyMachineReceiverInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMachineReceiverInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMachineReceiverInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMachineReceiverInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMachineReceiverInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutResponsibleEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutResponsibleEngineerInput> | Prisma.WorkOrderCreateWithoutResponsibleEngineerInput[] | Prisma.WorkOrderUncheckedCreateWithoutResponsibleEngineerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutResponsibleEngineerInput | Prisma.WorkOrderCreateOrConnectWithoutResponsibleEngineerInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutResponsibleEngineerInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutResponsibleEngineerInput[];
    createMany?: Prisma.WorkOrderCreateManyResponsibleEngineerInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutResponsibleEngineerInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutResponsibleEngineerInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutResponsibleEngineerInput | Prisma.WorkOrderUpdateManyWithWhereWithoutResponsibleEngineerInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput> | Prisma.WorkOrderCreateWithoutMaintenanceEngineerInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceEngineerInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceEngineerInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceEngineerInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceEngineerInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceEngineerInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceEngineerInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceEngineerInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceEngineerInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceEngineerInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceManagerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceManagerInput> | Prisma.WorkOrderCreateWithoutMaintenanceManagerInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceManagerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceManagerInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceManagerInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceManagerInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceManagerInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceManagerInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceManagerInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceManagerInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceManagerInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceManagerInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutReportedByInput, Prisma.WorkOrderUncheckedCreateWithoutReportedByInput> | Prisma.WorkOrderCreateWithoutReportedByInput[] | Prisma.WorkOrderUncheckedCreateWithoutReportedByInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutReportedByInput | Prisma.WorkOrderCreateOrConnectWithoutReportedByInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutReportedByInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutReportedByInput[];
    createMany?: Prisma.WorkOrderCreateManyReportedByInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutReportedByInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutReportedByInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutReportedByInput | Prisma.WorkOrderUpdateManyWithWhereWithoutReportedByInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedToInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput> | Prisma.WorkOrderCreateWithoutAssignedToInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedToInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedToInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedToInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedToInput | Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedToInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAreaLeaderInput, Prisma.WorkOrderUncheckedCreateWithoutAreaLeaderInput> | Prisma.WorkOrderCreateWithoutAreaLeaderInput[] | Prisma.WorkOrderUncheckedCreateWithoutAreaLeaderInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAreaLeaderInput | Prisma.WorkOrderCreateOrConnectWithoutAreaLeaderInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutAreaLeaderInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutAreaLeaderInput[];
    createMany?: Prisma.WorkOrderCreateManyAreaLeaderInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutAreaLeaderInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutAreaLeaderInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutAreaLeaderInput | Prisma.WorkOrderUpdateManyWithWhereWithoutAreaLeaderInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceSupervisorInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput> | Prisma.WorkOrderCreateWithoutMaintenanceSupervisorInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceSupervisorInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceSupervisorInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceSupervisorInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceSupervisorInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceSupervisorInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceSupervisorInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceSupervisorInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceSupervisorInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceSupervisorInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutPerformerInput, Prisma.WorkOrderUncheckedCreateWithoutPerformerInput> | Prisma.WorkOrderCreateWithoutPerformerInput[] | Prisma.WorkOrderUncheckedCreateWithoutPerformerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutPerformerInput | Prisma.WorkOrderCreateOrConnectWithoutPerformerInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutPerformerInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutPerformerInput[];
    createMany?: Prisma.WorkOrderCreateManyPerformerInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutPerformerInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutPerformerInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutPerformerInput | Prisma.WorkOrderUpdateManyWithWhereWithoutPerformerInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineReceiverInput, Prisma.WorkOrderUncheckedCreateWithoutMachineReceiverInput> | Prisma.WorkOrderCreateWithoutMachineReceiverInput[] | Prisma.WorkOrderUncheckedCreateWithoutMachineReceiverInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMachineReceiverInput | Prisma.WorkOrderCreateOrConnectWithoutMachineReceiverInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMachineReceiverInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMachineReceiverInput[];
    createMany?: Prisma.WorkOrderCreateManyMachineReceiverInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMachineReceiverInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMachineReceiverInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMachineReceiverInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMachineReceiverInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutResponsibleEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutResponsibleEngineerInput> | Prisma.WorkOrderCreateWithoutResponsibleEngineerInput[] | Prisma.WorkOrderUncheckedCreateWithoutResponsibleEngineerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutResponsibleEngineerInput | Prisma.WorkOrderCreateOrConnectWithoutResponsibleEngineerInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutResponsibleEngineerInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutResponsibleEngineerInput[];
    createMany?: Prisma.WorkOrderCreateManyResponsibleEngineerInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutResponsibleEngineerInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutResponsibleEngineerInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutResponsibleEngineerInput | Prisma.WorkOrderUpdateManyWithWhereWithoutResponsibleEngineerInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput> | Prisma.WorkOrderCreateWithoutMaintenanceEngineerInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceEngineerInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceEngineerInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceEngineerInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceEngineerInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceEngineerInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceEngineerInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceEngineerInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceEngineerInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceEngineerInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceManagerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceManagerInput> | Prisma.WorkOrderCreateWithoutMaintenanceManagerInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceManagerInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceManagerInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceManagerInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceManagerInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceManagerInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceManagerInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceManagerInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceManagerInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceManagerInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceManagerInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderCreateNestedManyWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssetInput, Prisma.WorkOrderUncheckedCreateWithoutAssetInput> | Prisma.WorkOrderCreateWithoutAssetInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssetInput | Prisma.WorkOrderCreateOrConnectWithoutAssetInput[];
    createMany?: Prisma.WorkOrderCreateManyAssetInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssetInput, Prisma.WorkOrderUncheckedCreateWithoutAssetInput> | Prisma.WorkOrderCreateWithoutAssetInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssetInput | Prisma.WorkOrderCreateOrConnectWithoutAssetInput[];
    createMany?: Prisma.WorkOrderCreateManyAssetInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUpdateManyWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssetInput, Prisma.WorkOrderUncheckedCreateWithoutAssetInput> | Prisma.WorkOrderCreateWithoutAssetInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssetInput | Prisma.WorkOrderCreateOrConnectWithoutAssetInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssetInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssetInput[];
    createMany?: Prisma.WorkOrderCreateManyAssetInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssetInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssetInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutAssetInput | Prisma.WorkOrderUpdateManyWithWhereWithoutAssetInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssetInput, Prisma.WorkOrderUncheckedCreateWithoutAssetInput> | Prisma.WorkOrderCreateWithoutAssetInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssetInput | Prisma.WorkOrderCreateOrConnectWithoutAssetInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssetInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssetInput[];
    createMany?: Prisma.WorkOrderCreateManyAssetInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssetInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssetInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutAssetInput | Prisma.WorkOrderUpdateManyWithWhereWithoutAssetInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderCreateNestedManyWithoutMachineInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineInput, Prisma.WorkOrderUncheckedCreateWithoutMachineInput> | Prisma.WorkOrderCreateWithoutMachineInput[] | Prisma.WorkOrderUncheckedCreateWithoutMachineInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMachineInput | Prisma.WorkOrderCreateOrConnectWithoutMachineInput[];
    createMany?: Prisma.WorkOrderCreateManyMachineInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutMachineInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineInput, Prisma.WorkOrderUncheckedCreateWithoutMachineInput> | Prisma.WorkOrderCreateWithoutMachineInput[] | Prisma.WorkOrderUncheckedCreateWithoutMachineInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMachineInput | Prisma.WorkOrderCreateOrConnectWithoutMachineInput[];
    createMany?: Prisma.WorkOrderCreateManyMachineInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUpdateManyWithoutMachineNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineInput, Prisma.WorkOrderUncheckedCreateWithoutMachineInput> | Prisma.WorkOrderCreateWithoutMachineInput[] | Prisma.WorkOrderUncheckedCreateWithoutMachineInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMachineInput | Prisma.WorkOrderCreateOrConnectWithoutMachineInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMachineInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMachineInput[];
    createMany?: Prisma.WorkOrderCreateManyMachineInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMachineInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMachineInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMachineInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMachineInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutMachineNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineInput, Prisma.WorkOrderUncheckedCreateWithoutMachineInput> | Prisma.WorkOrderCreateWithoutMachineInput[] | Prisma.WorkOrderUncheckedCreateWithoutMachineInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMachineInput | Prisma.WorkOrderCreateOrConnectWithoutMachineInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMachineInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMachineInput[];
    createMany?: Prisma.WorkOrderCreateManyMachineInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMachineInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMachineInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMachineInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMachineInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderCreatemaintenanceDisciplinesInput = {
    set: string[];
};
export type EnumWorkOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkOrderStatus;
};
export type EnumWorkOrderTypeFieldUpdateOperationsInput = {
    set?: $Enums.WorkOrderType;
};
export type EnumWorkOrderPriorityFieldUpdateOperationsInput = {
    set?: $Enums.WorkOrderPriority;
};
export type WorkOrderUpdatemaintenanceDisciplinesInput = {
    set?: string[];
    push?: string | string[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type WorkOrderCreateNestedOneWithoutRepairActionsInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutRepairActionsInput, Prisma.WorkOrderUncheckedCreateWithoutRepairActionsInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutRepairActionsInput;
    connect?: Prisma.WorkOrderWhereUniqueInput;
};
export type WorkOrderUpdateOneRequiredWithoutRepairActionsNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutRepairActionsInput, Prisma.WorkOrderUncheckedCreateWithoutRepairActionsInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutRepairActionsInput;
    upsert?: Prisma.WorkOrderUpsertWithoutRepairActionsInput;
    connect?: Prisma.WorkOrderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkOrderUpdateToOneWithWhereWithoutRepairActionsInput, Prisma.WorkOrderUpdateWithoutRepairActionsInput>, Prisma.WorkOrderUncheckedUpdateWithoutRepairActionsInput>;
};
export type WorkOrderCreateNestedOneWithoutPartsInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutPartsInput, Prisma.WorkOrderUncheckedCreateWithoutPartsInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutPartsInput;
    connect?: Prisma.WorkOrderWhereUniqueInput;
};
export type WorkOrderUpdateOneRequiredWithoutPartsNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutPartsInput, Prisma.WorkOrderUncheckedCreateWithoutPartsInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutPartsInput;
    upsert?: Prisma.WorkOrderUpsertWithoutPartsInput;
    connect?: Prisma.WorkOrderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkOrderUpdateToOneWithWhereWithoutPartsInput, Prisma.WorkOrderUpdateWithoutPartsInput>, Prisma.WorkOrderUncheckedUpdateWithoutPartsInput>;
};
export type WorkOrderCreateNestedOneWithoutAttachmentsInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAttachmentsInput, Prisma.WorkOrderUncheckedCreateWithoutAttachmentsInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAttachmentsInput;
    connect?: Prisma.WorkOrderWhereUniqueInput;
};
export type WorkOrderUpdateOneWithoutAttachmentsNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAttachmentsInput, Prisma.WorkOrderUncheckedCreateWithoutAttachmentsInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAttachmentsInput;
    upsert?: Prisma.WorkOrderUpsertWithoutAttachmentsInput;
    disconnect?: Prisma.WorkOrderWhereInput | boolean;
    delete?: Prisma.WorkOrderWhereInput | boolean;
    connect?: Prisma.WorkOrderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkOrderUpdateToOneWithWhereWithoutAttachmentsInput, Prisma.WorkOrderUpdateWithoutAttachmentsInput>, Prisma.WorkOrderUncheckedUpdateWithoutAttachmentsInput>;
};
export type WorkOrderUpdateOneRequiredWithoutIncidentChunksNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutIncidentChunksInput, Prisma.WorkOrderUncheckedCreateWithoutIncidentChunksInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutIncidentChunksInput;
    upsert?: Prisma.WorkOrderUpsertWithoutIncidentChunksInput;
    connect?: Prisma.WorkOrderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkOrderUpdateToOneWithWhereWithoutIncidentChunksInput, Prisma.WorkOrderUpdateWithoutIncidentChunksInput>, Prisma.WorkOrderUncheckedUpdateWithoutIncidentChunksInput>;
};
export type WorkOrderCreateWithoutReportedByInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutReportedByInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutReportedByInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutReportedByInput, Prisma.WorkOrderUncheckedCreateWithoutReportedByInput>;
};
export type WorkOrderCreateManyReportedByInputEnvelope = {
    data: Prisma.WorkOrderCreateManyReportedByInput | Prisma.WorkOrderCreateManyReportedByInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderCreateWithoutAssignedToInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutAssignedToInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutAssignedToInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedToInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput>;
};
export type WorkOrderCreateManyAssignedToInputEnvelope = {
    data: Prisma.WorkOrderCreateManyAssignedToInput | Prisma.WorkOrderCreateManyAssignedToInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderCreateWithoutAreaLeaderInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutAreaLeaderInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutAreaLeaderInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAreaLeaderInput, Prisma.WorkOrderUncheckedCreateWithoutAreaLeaderInput>;
};
export type WorkOrderCreateManyAreaLeaderInputEnvelope = {
    data: Prisma.WorkOrderCreateManyAreaLeaderInput | Prisma.WorkOrderCreateManyAreaLeaderInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderCreateWithoutMaintenanceSupervisorInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutMaintenanceSupervisorInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceSupervisorInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput>;
};
export type WorkOrderCreateManyMaintenanceSupervisorInputEnvelope = {
    data: Prisma.WorkOrderCreateManyMaintenanceSupervisorInput | Prisma.WorkOrderCreateManyMaintenanceSupervisorInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderCreateWithoutPerformerInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutPerformerInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutPerformerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutPerformerInput, Prisma.WorkOrderUncheckedCreateWithoutPerformerInput>;
};
export type WorkOrderCreateManyPerformerInputEnvelope = {
    data: Prisma.WorkOrderCreateManyPerformerInput | Prisma.WorkOrderCreateManyPerformerInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderCreateWithoutMachineReceiverInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutMachineReceiverInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutMachineReceiverInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineReceiverInput, Prisma.WorkOrderUncheckedCreateWithoutMachineReceiverInput>;
};
export type WorkOrderCreateManyMachineReceiverInputEnvelope = {
    data: Prisma.WorkOrderCreateManyMachineReceiverInput | Prisma.WorkOrderCreateManyMachineReceiverInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderCreateWithoutResponsibleEngineerInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutResponsibleEngineerInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutResponsibleEngineerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutResponsibleEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutResponsibleEngineerInput>;
};
export type WorkOrderCreateManyResponsibleEngineerInputEnvelope = {
    data: Prisma.WorkOrderCreateManyResponsibleEngineerInput | Prisma.WorkOrderCreateManyResponsibleEngineerInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderCreateWithoutMaintenanceEngineerInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutMaintenanceEngineerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput>;
};
export type WorkOrderCreateManyMaintenanceEngineerInputEnvelope = {
    data: Prisma.WorkOrderCreateManyMaintenanceEngineerInput | Prisma.WorkOrderCreateManyMaintenanceEngineerInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderCreateWithoutMaintenanceManagerInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutMaintenanceManagerInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutMaintenanceManagerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceManagerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceManagerInput>;
};
export type WorkOrderCreateManyMaintenanceManagerInputEnvelope = {
    data: Prisma.WorkOrderCreateManyMaintenanceManagerInput | Prisma.WorkOrderCreateManyMaintenanceManagerInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderUpsertWithWhereUniqueWithoutReportedByInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutReportedByInput, Prisma.WorkOrderUncheckedUpdateWithoutReportedByInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutReportedByInput, Prisma.WorkOrderUncheckedCreateWithoutReportedByInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutReportedByInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutReportedByInput, Prisma.WorkOrderUncheckedUpdateWithoutReportedByInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutReportedByInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByInput>;
};
export type WorkOrderScalarWhereInput = {
    AND?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
    OR?: Prisma.WorkOrderScalarWhereInput[];
    NOT?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
    id?: Prisma.StringFilter<"WorkOrder"> | string;
    publicId?: Prisma.StringFilter<"WorkOrder"> | string;
    machineId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    assetId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    title?: Prisma.StringFilter<"WorkOrder"> | string;
    descriptionRaw?: Prisma.StringFilter<"WorkOrder"> | string;
    status?: Prisma.EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFilter<"WorkOrder"> | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFilter<"WorkOrder"> | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    reportedById?: Prisma.StringFilter<"WorkOrder"> | string;
    assignedToId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    symptoms?: Prisma.JsonNullableFilter<"WorkOrder">;
    suspectedCause?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    rootCause?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    failureMode?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    environmentContext?: Prisma.JsonNullableFilter<"WorkOrder">;
    metadata?: Prisma.JsonNullableFilter<"WorkOrder">;
    createdAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    maintenanceType?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceDisciplines?: Prisma.StringNullableListFilter<"WorkOrder">;
    equipmentStopTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    faultReportTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    repairStartTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    maintenanceStartTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    maintenanceEndTime?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    maintenanceDescription?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    correctiveAction?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    notesAndRecommendations?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    equipmentStatusAfter?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceDurationMin?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    downtimeDurationMin?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    areaLeaderId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceSupervisorId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    performerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    machineReceiverId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    responsibleEngineerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceEngineerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
    maintenanceManagerId?: Prisma.StringNullableFilter<"WorkOrder"> | string | null;
};
export type WorkOrderUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAssignedToInput, Prisma.WorkOrderUncheckedUpdateWithoutAssignedToInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedToInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAssignedToInput, Prisma.WorkOrderUncheckedUpdateWithoutAssignedToInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutAssignedToInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToInput>;
};
export type WorkOrderUpsertWithWhereUniqueWithoutAreaLeaderInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAreaLeaderInput, Prisma.WorkOrderUncheckedUpdateWithoutAreaLeaderInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAreaLeaderInput, Prisma.WorkOrderUncheckedCreateWithoutAreaLeaderInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutAreaLeaderInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAreaLeaderInput, Prisma.WorkOrderUncheckedUpdateWithoutAreaLeaderInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutAreaLeaderInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderInput>;
};
export type WorkOrderUpsertWithWhereUniqueWithoutMaintenanceSupervisorInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMaintenanceSupervisorInput, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceSupervisorInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceSupervisorInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceSupervisorInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutMaintenanceSupervisorInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMaintenanceSupervisorInput, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceSupervisorInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutMaintenanceSupervisorInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorInput>;
};
export type WorkOrderUpsertWithWhereUniqueWithoutPerformerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutPerformerInput, Prisma.WorkOrderUncheckedUpdateWithoutPerformerInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutPerformerInput, Prisma.WorkOrderUncheckedCreateWithoutPerformerInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutPerformerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutPerformerInput, Prisma.WorkOrderUncheckedUpdateWithoutPerformerInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutPerformerInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerInput>;
};
export type WorkOrderUpsertWithWhereUniqueWithoutMachineReceiverInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMachineReceiverInput, Prisma.WorkOrderUncheckedUpdateWithoutMachineReceiverInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineReceiverInput, Prisma.WorkOrderUncheckedCreateWithoutMachineReceiverInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutMachineReceiverInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMachineReceiverInput, Prisma.WorkOrderUncheckedUpdateWithoutMachineReceiverInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutMachineReceiverInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverInput>;
};
export type WorkOrderUpsertWithWhereUniqueWithoutResponsibleEngineerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutResponsibleEngineerInput, Prisma.WorkOrderUncheckedUpdateWithoutResponsibleEngineerInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutResponsibleEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutResponsibleEngineerInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutResponsibleEngineerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutResponsibleEngineerInput, Prisma.WorkOrderUncheckedUpdateWithoutResponsibleEngineerInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutResponsibleEngineerInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerInput>;
};
export type WorkOrderUpsertWithWhereUniqueWithoutMaintenanceEngineerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMaintenanceEngineerInput, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceEngineerInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceEngineerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceEngineerInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutMaintenanceEngineerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMaintenanceEngineerInput, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceEngineerInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutMaintenanceEngineerInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerInput>;
};
export type WorkOrderUpsertWithWhereUniqueWithoutMaintenanceManagerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMaintenanceManagerInput, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceManagerInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceManagerInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceManagerInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutMaintenanceManagerInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMaintenanceManagerInput, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceManagerInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutMaintenanceManagerInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerInput>;
};
export type WorkOrderCreateWithoutAssetInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutAssetInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutAssetInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssetInput, Prisma.WorkOrderUncheckedCreateWithoutAssetInput>;
};
export type WorkOrderCreateManyAssetInputEnvelope = {
    data: Prisma.WorkOrderCreateManyAssetInput | Prisma.WorkOrderCreateManyAssetInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderUpsertWithWhereUniqueWithoutAssetInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAssetInput, Prisma.WorkOrderUncheckedUpdateWithoutAssetInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssetInput, Prisma.WorkOrderUncheckedCreateWithoutAssetInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutAssetInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAssetInput, Prisma.WorkOrderUncheckedUpdateWithoutAssetInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutAssetInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutAssetInput>;
};
export type WorkOrderCreateWithoutMachineInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutMachineInput = {
    id?: string;
    publicId?: string;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutMachineInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineInput, Prisma.WorkOrderUncheckedCreateWithoutMachineInput>;
};
export type WorkOrderCreateManyMachineInputEnvelope = {
    data: Prisma.WorkOrderCreateManyMachineInput | Prisma.WorkOrderCreateManyMachineInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderUpsertWithWhereUniqueWithoutMachineInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMachineInput, Prisma.WorkOrderUncheckedUpdateWithoutMachineInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMachineInput, Prisma.WorkOrderUncheckedCreateWithoutMachineInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutMachineInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMachineInput, Prisma.WorkOrderUncheckedUpdateWithoutMachineInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutMachineInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutMachineInput>;
};
export type WorkOrderCreateWithoutRepairActionsInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutRepairActionsInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutRepairActionsInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutRepairActionsInput, Prisma.WorkOrderUncheckedCreateWithoutRepairActionsInput>;
};
export type WorkOrderUpsertWithoutRepairActionsInput = {
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutRepairActionsInput, Prisma.WorkOrderUncheckedUpdateWithoutRepairActionsInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutRepairActionsInput, Prisma.WorkOrderUncheckedCreateWithoutRepairActionsInput>;
    where?: Prisma.WorkOrderWhereInput;
};
export type WorkOrderUpdateToOneWithWhereWithoutRepairActionsInput = {
    where?: Prisma.WorkOrderWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutRepairActionsInput, Prisma.WorkOrderUncheckedUpdateWithoutRepairActionsInput>;
};
export type WorkOrderUpdateWithoutRepairActionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutRepairActionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderCreateWithoutPartsInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutPartsInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutPartsInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutPartsInput, Prisma.WorkOrderUncheckedCreateWithoutPartsInput>;
};
export type WorkOrderUpsertWithoutPartsInput = {
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutPartsInput, Prisma.WorkOrderUncheckedUpdateWithoutPartsInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutPartsInput, Prisma.WorkOrderUncheckedCreateWithoutPartsInput>;
    where?: Prisma.WorkOrderWhereInput;
};
export type WorkOrderUpdateToOneWithWhereWithoutPartsInput = {
    where?: Prisma.WorkOrderWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutPartsInput, Prisma.WorkOrderUncheckedUpdateWithoutPartsInput>;
};
export type WorkOrderUpdateWithoutPartsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutPartsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderCreateWithoutAttachmentsInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutAttachmentsInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutAttachmentsInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAttachmentsInput, Prisma.WorkOrderUncheckedCreateWithoutAttachmentsInput>;
};
export type WorkOrderUpsertWithoutAttachmentsInput = {
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAttachmentsInput, Prisma.WorkOrderUncheckedUpdateWithoutAttachmentsInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAttachmentsInput, Prisma.WorkOrderUncheckedCreateWithoutAttachmentsInput>;
    where?: Prisma.WorkOrderWhereInput;
};
export type WorkOrderUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: Prisma.WorkOrderWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAttachmentsInput, Prisma.WorkOrderUncheckedUpdateWithoutAttachmentsInput>;
};
export type WorkOrderUpdateWithoutAttachmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutAttachmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderCreateWithoutIncidentChunksInput = {
    id?: string;
    publicId?: string;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    machine?: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    asset?: Prisma.AssetCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    areaLeader?: Prisma.UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput;
    maintenanceSupervisor?: Prisma.UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput;
    performer?: Prisma.UserCreateNestedOneWithoutPerformerWorkOrdersInput;
    machineReceiver?: Prisma.UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput;
    responsibleEngineer?: Prisma.UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput;
    maintenanceEngineer?: Prisma.UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput;
    maintenanceManager?: Prisma.UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutIncidentChunksInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
    attachments?: Prisma.DocumentUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutIncidentChunksInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutIncidentChunksInput, Prisma.WorkOrderUncheckedCreateWithoutIncidentChunksInput>;
};
export type WorkOrderUpsertWithoutIncidentChunksInput = {
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutIncidentChunksInput, Prisma.WorkOrderUncheckedUpdateWithoutIncidentChunksInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutIncidentChunksInput, Prisma.WorkOrderUncheckedCreateWithoutIncidentChunksInput>;
    where?: Prisma.WorkOrderWhereInput;
};
export type WorkOrderUpdateToOneWithWhereWithoutIncidentChunksInput = {
    where?: Prisma.WorkOrderWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutIncidentChunksInput, Prisma.WorkOrderUncheckedUpdateWithoutIncidentChunksInput>;
};
export type WorkOrderUpdateWithoutIncidentChunksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutIncidentChunksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderCreateManyReportedByInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderCreateManyAssignedToInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderCreateManyAreaLeaderInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderCreateManyMaintenanceSupervisorInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderCreateManyPerformerInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderCreateManyMachineReceiverInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderCreateManyResponsibleEngineerInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderCreateManyMaintenanceEngineerInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderCreateManyMaintenanceManagerInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
};
export type WorkOrderUpdateWithoutReportedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutReportedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutReportedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderUpdateWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderUpdateWithoutAreaLeaderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutAreaLeaderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutAreaLeaderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderUpdateWithoutMaintenanceSupervisorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutMaintenanceSupervisorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderUpdateWithoutPerformerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutPerformerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutPerformerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderUpdateWithoutMachineReceiverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutMachineReceiverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutMachineReceiverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderUpdateWithoutResponsibleEngineerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutResponsibleEngineerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderUpdateWithoutMaintenanceEngineerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutMaintenanceEngineerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderUpdateWithoutMaintenanceManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutMaintenanceManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderCreateManyAssetInput = {
    id?: string;
    publicId?: string;
    machineId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderUpdateWithoutAssetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    machine?: Prisma.MachineUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutAssetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutAssetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderCreateManyMachineInput = {
    id?: string;
    publicId?: string;
    assetId?: string | null;
    title: string;
    descriptionRaw: string;
    status?: $Enums.WorkOrderStatus;
    type?: $Enums.WorkOrderType;
    priority?: $Enums.WorkOrderPriority;
    reportedAt?: Date | string;
    reportedById: string;
    assignedToId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: string | null;
    rootCause?: string | null;
    failureMode?: string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceType?: string | null;
    maintenanceDisciplines?: Prisma.WorkOrderCreatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Date | string | null;
    faultReportTime?: Date | string | null;
    repairStartTime?: Date | string | null;
    maintenanceStartTime?: Date | string | null;
    maintenanceEndTime?: Date | string | null;
    maintenanceDescription?: string | null;
    correctiveAction?: string | null;
    notesAndRecommendations?: string | null;
    equipmentStatusAfter?: string | null;
    maintenanceDurationMin?: number | null;
    downtimeDurationMin?: number | null;
    areaLeaderId?: string | null;
    maintenanceSupervisorId?: string | null;
    performerId?: string | null;
    machineReceiverId?: string | null;
    responsibleEngineerId?: string | null;
    maintenanceEngineerId?: string | null;
    maintenanceManagerId?: string | null;
};
export type WorkOrderUpdateWithoutMachineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    asset?: Prisma.AssetUpdateOneWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    areaLeader?: Prisma.UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput;
    maintenanceSupervisor?: Prisma.UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput;
    performer?: Prisma.UserUpdateOneWithoutPerformerWorkOrdersNestedInput;
    machineReceiver?: Prisma.UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput;
    responsibleEngineer?: Prisma.UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput;
    maintenanceEngineer?: Prisma.UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput;
    maintenanceManager?: Prisma.UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutMachineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
    attachments?: Prisma.DocumentUncheckedUpdateManyWithoutWorkOrderNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutMachineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.StringFieldUpdateOperationsInput | string;
    assetId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    descriptionRaw?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    type?: Prisma.EnumWorkOrderTypeFieldUpdateOperationsInput | $Enums.WorkOrderType;
    priority?: Prisma.EnumWorkOrderPriorityFieldUpdateOperationsInput | $Enums.WorkOrderPriority;
    reportedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedById?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedToId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    symptoms?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    suspectedCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rootCause?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    failureMode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    environmentContext?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDisciplines?: Prisma.WorkOrderUpdatemaintenanceDisciplinesInput | string[];
    equipmentStopTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    faultReportTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    repairStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceStartTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceEndTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    maintenanceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    correctiveAction?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notesAndRecommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    equipmentStatusAfter?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    downtimeDurationMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    areaLeaderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceSupervisorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    performerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineReceiverId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsibleEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceEngineerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maintenanceManagerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
/**
 * Count Type WorkOrderCountOutputType
 */
export type WorkOrderCountOutputType = {
    repairActions: number;
    parts: number;
    attachments: number;
    incidentChunks: number;
};
export type WorkOrderCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    repairActions?: boolean | WorkOrderCountOutputTypeCountRepairActionsArgs;
    parts?: boolean | WorkOrderCountOutputTypeCountPartsArgs;
    attachments?: boolean | WorkOrderCountOutputTypeCountAttachmentsArgs;
    incidentChunks?: boolean | WorkOrderCountOutputTypeCountIncidentChunksArgs;
};
/**
 * WorkOrderCountOutputType without action
 */
export type WorkOrderCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderCountOutputType
     */
    select?: Prisma.WorkOrderCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * WorkOrderCountOutputType without action
 */
export type WorkOrderCountOutputTypeCountRepairActionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RepairActionWhereInput;
};
/**
 * WorkOrderCountOutputType without action
 */
export type WorkOrderCountOutputTypeCountPartsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderPartWhereInput;
};
/**
 * WorkOrderCountOutputType without action
 */
export type WorkOrderCountOutputTypeCountAttachmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentWhereInput;
};
/**
 * WorkOrderCountOutputType without action
 */
export type WorkOrderCountOutputTypeCountIncidentChunksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IncidentChunkWhereInput;
};
export type WorkOrderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    machineId?: boolean;
    assetId?: boolean;
    title?: boolean;
    descriptionRaw?: boolean;
    status?: boolean;
    type?: boolean;
    priority?: boolean;
    reportedAt?: boolean;
    reportedById?: boolean;
    assignedToId?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    symptoms?: boolean;
    suspectedCause?: boolean;
    rootCause?: boolean;
    failureMode?: boolean;
    environmentContext?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    maintenanceType?: boolean;
    maintenanceDisciplines?: boolean;
    equipmentStopTime?: boolean;
    faultReportTime?: boolean;
    repairStartTime?: boolean;
    maintenanceStartTime?: boolean;
    maintenanceEndTime?: boolean;
    maintenanceDescription?: boolean;
    correctiveAction?: boolean;
    notesAndRecommendations?: boolean;
    equipmentStatusAfter?: boolean;
    maintenanceDurationMin?: boolean;
    downtimeDurationMin?: boolean;
    areaLeaderId?: boolean;
    maintenanceSupervisorId?: boolean;
    performerId?: boolean;
    machineReceiverId?: boolean;
    responsibleEngineerId?: boolean;
    maintenanceEngineerId?: boolean;
    maintenanceManagerId?: boolean;
    machine?: boolean | Prisma.WorkOrder$machineArgs<ExtArgs>;
    asset?: boolean | Prisma.WorkOrder$assetArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
    areaLeader?: boolean | Prisma.WorkOrder$areaLeaderArgs<ExtArgs>;
    maintenanceSupervisor?: boolean | Prisma.WorkOrder$maintenanceSupervisorArgs<ExtArgs>;
    performer?: boolean | Prisma.WorkOrder$performerArgs<ExtArgs>;
    machineReceiver?: boolean | Prisma.WorkOrder$machineReceiverArgs<ExtArgs>;
    responsibleEngineer?: boolean | Prisma.WorkOrder$responsibleEngineerArgs<ExtArgs>;
    maintenanceEngineer?: boolean | Prisma.WorkOrder$maintenanceEngineerArgs<ExtArgs>;
    maintenanceManager?: boolean | Prisma.WorkOrder$maintenanceManagerArgs<ExtArgs>;
    repairActions?: boolean | Prisma.WorkOrder$repairActionsArgs<ExtArgs>;
    parts?: boolean | Prisma.WorkOrder$partsArgs<ExtArgs>;
    attachments?: boolean | Prisma.WorkOrder$attachmentsArgs<ExtArgs>;
    incidentChunks?: boolean | Prisma.WorkOrder$incidentChunksArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkOrderCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workOrder"]>;
export type WorkOrderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    machineId?: boolean;
    assetId?: boolean;
    title?: boolean;
    descriptionRaw?: boolean;
    status?: boolean;
    type?: boolean;
    priority?: boolean;
    reportedAt?: boolean;
    reportedById?: boolean;
    assignedToId?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    symptoms?: boolean;
    suspectedCause?: boolean;
    rootCause?: boolean;
    failureMode?: boolean;
    environmentContext?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    maintenanceType?: boolean;
    maintenanceDisciplines?: boolean;
    equipmentStopTime?: boolean;
    faultReportTime?: boolean;
    repairStartTime?: boolean;
    maintenanceStartTime?: boolean;
    maintenanceEndTime?: boolean;
    maintenanceDescription?: boolean;
    correctiveAction?: boolean;
    notesAndRecommendations?: boolean;
    equipmentStatusAfter?: boolean;
    maintenanceDurationMin?: boolean;
    downtimeDurationMin?: boolean;
    areaLeaderId?: boolean;
    maintenanceSupervisorId?: boolean;
    performerId?: boolean;
    machineReceiverId?: boolean;
    responsibleEngineerId?: boolean;
    maintenanceEngineerId?: boolean;
    maintenanceManagerId?: boolean;
    machine?: boolean | Prisma.WorkOrder$machineArgs<ExtArgs>;
    asset?: boolean | Prisma.WorkOrder$assetArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
    areaLeader?: boolean | Prisma.WorkOrder$areaLeaderArgs<ExtArgs>;
    maintenanceSupervisor?: boolean | Prisma.WorkOrder$maintenanceSupervisorArgs<ExtArgs>;
    performer?: boolean | Prisma.WorkOrder$performerArgs<ExtArgs>;
    machineReceiver?: boolean | Prisma.WorkOrder$machineReceiverArgs<ExtArgs>;
    responsibleEngineer?: boolean | Prisma.WorkOrder$responsibleEngineerArgs<ExtArgs>;
    maintenanceEngineer?: boolean | Prisma.WorkOrder$maintenanceEngineerArgs<ExtArgs>;
    maintenanceManager?: boolean | Prisma.WorkOrder$maintenanceManagerArgs<ExtArgs>;
}, ExtArgs["result"]["workOrder"]>;
export type WorkOrderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    publicId?: boolean;
    machineId?: boolean;
    assetId?: boolean;
    title?: boolean;
    descriptionRaw?: boolean;
    status?: boolean;
    type?: boolean;
    priority?: boolean;
    reportedAt?: boolean;
    reportedById?: boolean;
    assignedToId?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    symptoms?: boolean;
    suspectedCause?: boolean;
    rootCause?: boolean;
    failureMode?: boolean;
    environmentContext?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    maintenanceType?: boolean;
    maintenanceDisciplines?: boolean;
    equipmentStopTime?: boolean;
    faultReportTime?: boolean;
    repairStartTime?: boolean;
    maintenanceStartTime?: boolean;
    maintenanceEndTime?: boolean;
    maintenanceDescription?: boolean;
    correctiveAction?: boolean;
    notesAndRecommendations?: boolean;
    equipmentStatusAfter?: boolean;
    maintenanceDurationMin?: boolean;
    downtimeDurationMin?: boolean;
    areaLeaderId?: boolean;
    maintenanceSupervisorId?: boolean;
    performerId?: boolean;
    machineReceiverId?: boolean;
    responsibleEngineerId?: boolean;
    maintenanceEngineerId?: boolean;
    maintenanceManagerId?: boolean;
    machine?: boolean | Prisma.WorkOrder$machineArgs<ExtArgs>;
    asset?: boolean | Prisma.WorkOrder$assetArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
    areaLeader?: boolean | Prisma.WorkOrder$areaLeaderArgs<ExtArgs>;
    maintenanceSupervisor?: boolean | Prisma.WorkOrder$maintenanceSupervisorArgs<ExtArgs>;
    performer?: boolean | Prisma.WorkOrder$performerArgs<ExtArgs>;
    machineReceiver?: boolean | Prisma.WorkOrder$machineReceiverArgs<ExtArgs>;
    responsibleEngineer?: boolean | Prisma.WorkOrder$responsibleEngineerArgs<ExtArgs>;
    maintenanceEngineer?: boolean | Prisma.WorkOrder$maintenanceEngineerArgs<ExtArgs>;
    maintenanceManager?: boolean | Prisma.WorkOrder$maintenanceManagerArgs<ExtArgs>;
}, ExtArgs["result"]["workOrder"]>;
export type WorkOrderSelectScalar = {
    id?: boolean;
    publicId?: boolean;
    machineId?: boolean;
    assetId?: boolean;
    title?: boolean;
    descriptionRaw?: boolean;
    status?: boolean;
    type?: boolean;
    priority?: boolean;
    reportedAt?: boolean;
    reportedById?: boolean;
    assignedToId?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    symptoms?: boolean;
    suspectedCause?: boolean;
    rootCause?: boolean;
    failureMode?: boolean;
    environmentContext?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    maintenanceType?: boolean;
    maintenanceDisciplines?: boolean;
    equipmentStopTime?: boolean;
    faultReportTime?: boolean;
    repairStartTime?: boolean;
    maintenanceStartTime?: boolean;
    maintenanceEndTime?: boolean;
    maintenanceDescription?: boolean;
    correctiveAction?: boolean;
    notesAndRecommendations?: boolean;
    equipmentStatusAfter?: boolean;
    maintenanceDurationMin?: boolean;
    downtimeDurationMin?: boolean;
    areaLeaderId?: boolean;
    maintenanceSupervisorId?: boolean;
    performerId?: boolean;
    machineReceiverId?: boolean;
    responsibleEngineerId?: boolean;
    maintenanceEngineerId?: boolean;
    maintenanceManagerId?: boolean;
};
export type WorkOrderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "publicId" | "machineId" | "assetId" | "title" | "descriptionRaw" | "status" | "type" | "priority" | "reportedAt" | "reportedById" | "assignedToId" | "startedAt" | "completedAt" | "symptoms" | "suspectedCause" | "rootCause" | "failureMode" | "environmentContext" | "metadata" | "createdAt" | "updatedAt" | "maintenanceType" | "maintenanceDisciplines" | "equipmentStopTime" | "faultReportTime" | "repairStartTime" | "maintenanceStartTime" | "maintenanceEndTime" | "maintenanceDescription" | "correctiveAction" | "notesAndRecommendations" | "equipmentStatusAfter" | "maintenanceDurationMin" | "downtimeDurationMin" | "areaLeaderId" | "maintenanceSupervisorId" | "performerId" | "machineReceiverId" | "responsibleEngineerId" | "maintenanceEngineerId" | "maintenanceManagerId", ExtArgs["result"]["workOrder"]>;
export type WorkOrderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    machine?: boolean | Prisma.WorkOrder$machineArgs<ExtArgs>;
    asset?: boolean | Prisma.WorkOrder$assetArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
    areaLeader?: boolean | Prisma.WorkOrder$areaLeaderArgs<ExtArgs>;
    maintenanceSupervisor?: boolean | Prisma.WorkOrder$maintenanceSupervisorArgs<ExtArgs>;
    performer?: boolean | Prisma.WorkOrder$performerArgs<ExtArgs>;
    machineReceiver?: boolean | Prisma.WorkOrder$machineReceiverArgs<ExtArgs>;
    responsibleEngineer?: boolean | Prisma.WorkOrder$responsibleEngineerArgs<ExtArgs>;
    maintenanceEngineer?: boolean | Prisma.WorkOrder$maintenanceEngineerArgs<ExtArgs>;
    maintenanceManager?: boolean | Prisma.WorkOrder$maintenanceManagerArgs<ExtArgs>;
    repairActions?: boolean | Prisma.WorkOrder$repairActionsArgs<ExtArgs>;
    parts?: boolean | Prisma.WorkOrder$partsArgs<ExtArgs>;
    attachments?: boolean | Prisma.WorkOrder$attachmentsArgs<ExtArgs>;
    incidentChunks?: boolean | Prisma.WorkOrder$incidentChunksArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkOrderCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WorkOrderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    machine?: boolean | Prisma.WorkOrder$machineArgs<ExtArgs>;
    asset?: boolean | Prisma.WorkOrder$assetArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
    areaLeader?: boolean | Prisma.WorkOrder$areaLeaderArgs<ExtArgs>;
    maintenanceSupervisor?: boolean | Prisma.WorkOrder$maintenanceSupervisorArgs<ExtArgs>;
    performer?: boolean | Prisma.WorkOrder$performerArgs<ExtArgs>;
    machineReceiver?: boolean | Prisma.WorkOrder$machineReceiverArgs<ExtArgs>;
    responsibleEngineer?: boolean | Prisma.WorkOrder$responsibleEngineerArgs<ExtArgs>;
    maintenanceEngineer?: boolean | Prisma.WorkOrder$maintenanceEngineerArgs<ExtArgs>;
    maintenanceManager?: boolean | Prisma.WorkOrder$maintenanceManagerArgs<ExtArgs>;
};
export type WorkOrderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    machine?: boolean | Prisma.WorkOrder$machineArgs<ExtArgs>;
    asset?: boolean | Prisma.WorkOrder$assetArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
    areaLeader?: boolean | Prisma.WorkOrder$areaLeaderArgs<ExtArgs>;
    maintenanceSupervisor?: boolean | Prisma.WorkOrder$maintenanceSupervisorArgs<ExtArgs>;
    performer?: boolean | Prisma.WorkOrder$performerArgs<ExtArgs>;
    machineReceiver?: boolean | Prisma.WorkOrder$machineReceiverArgs<ExtArgs>;
    responsibleEngineer?: boolean | Prisma.WorkOrder$responsibleEngineerArgs<ExtArgs>;
    maintenanceEngineer?: boolean | Prisma.WorkOrder$maintenanceEngineerArgs<ExtArgs>;
    maintenanceManager?: boolean | Prisma.WorkOrder$maintenanceManagerArgs<ExtArgs>;
};
export type $WorkOrderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkOrder";
    objects: {
        machine: Prisma.$MachinePayload<ExtArgs> | null;
        asset: Prisma.$AssetPayload<ExtArgs> | null;
        reportedBy: Prisma.$UserPayload<ExtArgs>;
        assignedTo: Prisma.$UserPayload<ExtArgs> | null;
        areaLeader: Prisma.$UserPayload<ExtArgs> | null;
        maintenanceSupervisor: Prisma.$UserPayload<ExtArgs> | null;
        performer: Prisma.$UserPayload<ExtArgs> | null;
        machineReceiver: Prisma.$UserPayload<ExtArgs> | null;
        responsibleEngineer: Prisma.$UserPayload<ExtArgs> | null;
        maintenanceEngineer: Prisma.$UserPayload<ExtArgs> | null;
        maintenanceManager: Prisma.$UserPayload<ExtArgs> | null;
        repairActions: Prisma.$RepairActionPayload<ExtArgs>[];
        parts: Prisma.$WorkOrderPartPayload<ExtArgs>[];
        attachments: Prisma.$DocumentPayload<ExtArgs>[];
        incidentChunks: Prisma.$IncidentChunkPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        publicId: string;
        machineId: string | null;
        assetId: string | null;
        title: string;
        descriptionRaw: string;
        status: $Enums.WorkOrderStatus;
        type: $Enums.WorkOrderType;
        priority: $Enums.WorkOrderPriority;
        reportedAt: Date;
        reportedById: string;
        assignedToId: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        symptoms: runtime.JsonValue | null;
        suspectedCause: string | null;
        rootCause: string | null;
        failureMode: string | null;
        environmentContext: runtime.JsonValue | null;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        maintenanceType: string | null;
        maintenanceDisciplines: string[];
        equipmentStopTime: Date | null;
        faultReportTime: Date | null;
        repairStartTime: Date | null;
        maintenanceStartTime: Date | null;
        maintenanceEndTime: Date | null;
        maintenanceDescription: string | null;
        correctiveAction: string | null;
        notesAndRecommendations: string | null;
        equipmentStatusAfter: string | null;
        maintenanceDurationMin: number | null;
        downtimeDurationMin: number | null;
        areaLeaderId: string | null;
        maintenanceSupervisorId: string | null;
        performerId: string | null;
        machineReceiverId: string | null;
        responsibleEngineerId: string | null;
        maintenanceEngineerId: string | null;
        maintenanceManagerId: string | null;
    }, ExtArgs["result"]["workOrder"]>;
    composites: {};
};
export type WorkOrderGetPayload<S extends boolean | null | undefined | WorkOrderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload, S>;
export type WorkOrderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkOrderCountAggregateInputType | true;
};
export interface WorkOrderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkOrder'];
        meta: {
            name: 'WorkOrder';
        };
    };
    /**
     * Find zero or one WorkOrder that matches the filter.
     * @param {WorkOrderFindUniqueArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkOrderFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkOrderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one WorkOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkOrderFindUniqueOrThrowArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkOrderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WorkOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindFirstArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkOrderFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkOrderFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WorkOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindFirstOrThrowArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkOrderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more WorkOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkOrders
     * const workOrders = await prisma.workOrder.findMany()
     *
     * // Get first 10 WorkOrders
     * const workOrders = await prisma.workOrder.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const workOrderWithIdOnly = await prisma.workOrder.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WorkOrderFindManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a WorkOrder.
     * @param {WorkOrderCreateArgs} args - Arguments to create a WorkOrder.
     * @example
     * // Create one WorkOrder
     * const WorkOrder = await prisma.workOrder.create({
     *   data: {
     *     // ... data to create a WorkOrder
     *   }
     * })
     *
     */
    create<T extends WorkOrderCreateArgs>(args: Prisma.SelectSubset<T, WorkOrderCreateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many WorkOrders.
     * @param {WorkOrderCreateManyArgs} args - Arguments to create many WorkOrders.
     * @example
     * // Create many WorkOrders
     * const workOrder = await prisma.workOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WorkOrderCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many WorkOrders and returns the data saved in the database.
     * @param {WorkOrderCreateManyAndReturnArgs} args - Arguments to create many WorkOrders.
     * @example
     * // Create many WorkOrders
     * const workOrder = await prisma.workOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many WorkOrders and only return the `id`
     * const workOrderWithIdOnly = await prisma.workOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WorkOrderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a WorkOrder.
     * @param {WorkOrderDeleteArgs} args - Arguments to delete one WorkOrder.
     * @example
     * // Delete one WorkOrder
     * const WorkOrder = await prisma.workOrder.delete({
     *   where: {
     *     // ... filter to delete one WorkOrder
     *   }
     * })
     *
     */
    delete<T extends WorkOrderDeleteArgs>(args: Prisma.SelectSubset<T, WorkOrderDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one WorkOrder.
     * @param {WorkOrderUpdateArgs} args - Arguments to update one WorkOrder.
     * @example
     * // Update one WorkOrder
     * const workOrder = await prisma.workOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WorkOrderUpdateArgs>(args: Prisma.SelectSubset<T, WorkOrderUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more WorkOrders.
     * @param {WorkOrderDeleteManyArgs} args - Arguments to filter WorkOrders to delete.
     * @example
     * // Delete a few WorkOrders
     * const { count } = await prisma.workOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WorkOrderDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WorkOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkOrders
     * const workOrder = await prisma.workOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WorkOrderUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WorkOrders and returns the data updated in the database.
     * @param {WorkOrderUpdateManyAndReturnArgs} args - Arguments to update many WorkOrders.
     * @example
     * // Update many WorkOrders
     * const workOrder = await prisma.workOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more WorkOrders and only return the `id`
     * const workOrderWithIdOnly = await prisma.workOrder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends WorkOrderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one WorkOrder.
     * @param {WorkOrderUpsertArgs} args - Arguments to update or create a WorkOrder.
     * @example
     * // Update or create a WorkOrder
     * const workOrder = await prisma.workOrder.upsert({
     *   create: {
     *     // ... data to create a WorkOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkOrder we want to update
     *   }
     * })
     */
    upsert<T extends WorkOrderUpsertArgs>(args: Prisma.SelectSubset<T, WorkOrderUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of WorkOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderCountArgs} args - Arguments to filter WorkOrders to count.
     * @example
     * // Count the number of WorkOrders
     * const count = await prisma.workOrder.count({
     *   where: {
     *     // ... the filter for the WorkOrders we want to count
     *   }
     * })
    **/
    count<T extends WorkOrderCountArgs>(args?: Prisma.Subset<T, WorkOrderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkOrderCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a WorkOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkOrderAggregateArgs>(args: Prisma.Subset<T, WorkOrderAggregateArgs>): Prisma.PrismaPromise<GetWorkOrderAggregateType<T>>;
    /**
     * Group by WorkOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends WorkOrderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkOrderGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkOrderGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WorkOrder model
     */
    readonly fields: WorkOrderFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for WorkOrder.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__WorkOrderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    machine<T extends Prisma.WorkOrder$machineArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$machineArgs<ExtArgs>>): Prisma.Prisma__MachineClient<runtime.Types.Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    asset<T extends Prisma.WorkOrder$assetArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$assetArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    reportedBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assignedTo<T extends Prisma.WorkOrder$assignedToArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$assignedToArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    areaLeader<T extends Prisma.WorkOrder$areaLeaderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$areaLeaderArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    maintenanceSupervisor<T extends Prisma.WorkOrder$maintenanceSupervisorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$maintenanceSupervisorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    performer<T extends Prisma.WorkOrder$performerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$performerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    machineReceiver<T extends Prisma.WorkOrder$machineReceiverArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$machineReceiverArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    responsibleEngineer<T extends Prisma.WorkOrder$responsibleEngineerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$responsibleEngineerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    maintenanceEngineer<T extends Prisma.WorkOrder$maintenanceEngineerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$maintenanceEngineerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    maintenanceManager<T extends Prisma.WorkOrder$maintenanceManagerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$maintenanceManagerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    repairActions<T extends Prisma.WorkOrder$repairActionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$repairActionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    parts<T extends Prisma.WorkOrder$partsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$partsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    attachments<T extends Prisma.WorkOrder$attachmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    incidentChunks<T extends Prisma.WorkOrder$incidentChunksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$incidentChunksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the WorkOrder model
 */
export interface WorkOrderFieldRefs {
    readonly id: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly publicId: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly machineId: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly assetId: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly title: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly descriptionRaw: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly status: Prisma.FieldRef<"WorkOrder", 'WorkOrderStatus'>;
    readonly type: Prisma.FieldRef<"WorkOrder", 'WorkOrderType'>;
    readonly priority: Prisma.FieldRef<"WorkOrder", 'WorkOrderPriority'>;
    readonly reportedAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly reportedById: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly assignedToId: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly startedAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly symptoms: Prisma.FieldRef<"WorkOrder", 'Json'>;
    readonly suspectedCause: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly rootCause: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly failureMode: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly environmentContext: Prisma.FieldRef<"WorkOrder", 'Json'>;
    readonly metadata: Prisma.FieldRef<"WorkOrder", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly maintenanceType: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly maintenanceDisciplines: Prisma.FieldRef<"WorkOrder", 'String[]'>;
    readonly equipmentStopTime: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly faultReportTime: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly repairStartTime: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly maintenanceStartTime: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly maintenanceEndTime: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly maintenanceDescription: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly correctiveAction: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly notesAndRecommendations: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly equipmentStatusAfter: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly maintenanceDurationMin: Prisma.FieldRef<"WorkOrder", 'Int'>;
    readonly downtimeDurationMin: Prisma.FieldRef<"WorkOrder", 'Int'>;
    readonly areaLeaderId: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly maintenanceSupervisorId: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly performerId: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly machineReceiverId: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly responsibleEngineerId: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly maintenanceEngineerId: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly maintenanceManagerId: Prisma.FieldRef<"WorkOrder", 'String'>;
}
/**
 * WorkOrder findUnique
 */
export type WorkOrderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    /**
     * Filter, which WorkOrder to fetch.
     */
    where: Prisma.WorkOrderWhereUniqueInput;
};
/**
 * WorkOrder findUniqueOrThrow
 */
export type WorkOrderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    /**
     * Filter, which WorkOrder to fetch.
     */
    where: Prisma.WorkOrderWhereUniqueInput;
};
/**
 * WorkOrder findFirst
 */
export type WorkOrderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    /**
     * Filter, which WorkOrder to fetch.
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkOrders.
     */
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkOrders.
     */
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * WorkOrder findFirstOrThrow
 */
export type WorkOrderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    /**
     * Filter, which WorkOrder to fetch.
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkOrders.
     */
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkOrders.
     */
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * WorkOrder findMany
 */
export type WorkOrderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    /**
     * Filter, which WorkOrders to fetch.
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WorkOrders.
     */
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrders.
     */
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * WorkOrder create
 */
export type WorkOrderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    /**
     * The data needed to create a WorkOrder.
     */
    data: Prisma.XOR<Prisma.WorkOrderCreateInput, Prisma.WorkOrderUncheckedCreateInput>;
};
/**
 * WorkOrder createMany
 */
export type WorkOrderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkOrders.
     */
    data: Prisma.WorkOrderCreateManyInput | Prisma.WorkOrderCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * WorkOrder createManyAndReturn
 */
export type WorkOrderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * The data used to create many WorkOrders.
     */
    data: Prisma.WorkOrderCreateManyInput | Prisma.WorkOrderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * WorkOrder update
 */
export type WorkOrderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    /**
     * The data needed to update a WorkOrder.
     */
    data: Prisma.XOR<Prisma.WorkOrderUpdateInput, Prisma.WorkOrderUncheckedUpdateInput>;
    /**
     * Choose, which WorkOrder to update.
     */
    where: Prisma.WorkOrderWhereUniqueInput;
};
/**
 * WorkOrder updateMany
 */
export type WorkOrderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkOrders.
     */
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyInput>;
    /**
     * Filter which WorkOrders to update
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * Limit how many WorkOrders to update.
     */
    limit?: number;
};
/**
 * WorkOrder updateManyAndReturn
 */
export type WorkOrderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * The data used to update WorkOrders.
     */
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyInput>;
    /**
     * Filter which WorkOrders to update
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * Limit how many WorkOrders to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * WorkOrder upsert
 */
export type WorkOrderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    /**
     * The filter to search for the WorkOrder to update in case it exists.
     */
    where: Prisma.WorkOrderWhereUniqueInput;
    /**
     * In case the WorkOrder found by the `where` argument doesn't exist, create a new WorkOrder with this data.
     */
    create: Prisma.XOR<Prisma.WorkOrderCreateInput, Prisma.WorkOrderUncheckedCreateInput>;
    /**
     * In case the WorkOrder was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.WorkOrderUpdateInput, Prisma.WorkOrderUncheckedUpdateInput>;
};
/**
 * WorkOrder delete
 */
export type WorkOrderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    /**
     * Filter which WorkOrder to delete.
     */
    where: Prisma.WorkOrderWhereUniqueInput;
};
/**
 * WorkOrder deleteMany
 */
export type WorkOrderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrders to delete
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * Limit how many WorkOrders to delete.
     */
    limit?: number;
};
/**
 * WorkOrder.machine
 */
export type WorkOrder$machineArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Machine
     */
    select?: Prisma.MachineSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Machine
     */
    omit?: Prisma.MachineOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MachineInclude<ExtArgs> | null;
    where?: Prisma.MachineWhereInput;
};
/**
 * WorkOrder.asset
 */
export type WorkOrder$assetArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: Prisma.AssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Asset
     */
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssetInclude<ExtArgs> | null;
    where?: Prisma.AssetWhereInput;
};
/**
 * WorkOrder.assignedTo
 */
export type WorkOrder$assignedToArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * WorkOrder.areaLeader
 */
export type WorkOrder$areaLeaderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * WorkOrder.maintenanceSupervisor
 */
export type WorkOrder$maintenanceSupervisorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * WorkOrder.performer
 */
export type WorkOrder$performerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * WorkOrder.machineReceiver
 */
export type WorkOrder$machineReceiverArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * WorkOrder.responsibleEngineer
 */
export type WorkOrder$responsibleEngineerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * WorkOrder.maintenanceEngineer
 */
export type WorkOrder$maintenanceEngineerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * WorkOrder.maintenanceManager
 */
export type WorkOrder$maintenanceManagerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * WorkOrder.repairActions
 */
export type WorkOrder$repairActionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairAction
     */
    select?: Prisma.RepairActionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RepairAction
     */
    omit?: Prisma.RepairActionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RepairActionInclude<ExtArgs> | null;
    where?: Prisma.RepairActionWhereInput;
    orderBy?: Prisma.RepairActionOrderByWithRelationInput | Prisma.RepairActionOrderByWithRelationInput[];
    cursor?: Prisma.RepairActionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RepairActionScalarFieldEnum | Prisma.RepairActionScalarFieldEnum[];
};
/**
 * WorkOrder.parts
 */
export type WorkOrder$partsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderPart
     */
    select?: Prisma.WorkOrderPartSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderPart
     */
    omit?: Prisma.WorkOrderPartOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderPartInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderPartWhereInput;
    orderBy?: Prisma.WorkOrderPartOrderByWithRelationInput | Prisma.WorkOrderPartOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderPartWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderPartScalarFieldEnum | Prisma.WorkOrderPartScalarFieldEnum[];
};
/**
 * WorkOrder.attachments
 */
export type WorkOrder$attachmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    where?: Prisma.DocumentWhereInput;
    orderBy?: Prisma.DocumentOrderByWithRelationInput | Prisma.DocumentOrderByWithRelationInput[];
    cursor?: Prisma.DocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocumentScalarFieldEnum | Prisma.DocumentScalarFieldEnum[];
};
/**
 * WorkOrder.incidentChunks
 */
export type WorkOrder$incidentChunksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncidentChunk
     */
    select?: Prisma.IncidentChunkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IncidentChunk
     */
    omit?: Prisma.IncidentChunkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IncidentChunkInclude<ExtArgs> | null;
    where?: Prisma.IncidentChunkWhereInput;
    orderBy?: Prisma.IncidentChunkOrderByWithRelationInput | Prisma.IncidentChunkOrderByWithRelationInput[];
    cursor?: Prisma.IncidentChunkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IncidentChunkScalarFieldEnum | Prisma.IncidentChunkScalarFieldEnum[];
};
/**
 * WorkOrder without action
 */
export type WorkOrderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=WorkOrder.d.ts.map