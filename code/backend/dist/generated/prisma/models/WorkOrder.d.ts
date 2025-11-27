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
    _min: WorkOrderMinAggregateOutputType | null;
    _max: WorkOrderMaxAggregateOutputType | null;
};
export type WorkOrderMinAggregateOutputType = {
    id: string | null;
    machineId: string | null;
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
};
export type WorkOrderMaxAggregateOutputType = {
    id: string | null;
    machineId: string | null;
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
};
export type WorkOrderCountAggregateOutputType = {
    id: number;
    machineId: number;
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
    _all: number;
};
export type WorkOrderMinAggregateInputType = {
    id?: true;
    machineId?: true;
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
};
export type WorkOrderMaxAggregateInputType = {
    id?: true;
    machineId?: true;
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
};
export type WorkOrderCountAggregateInputType = {
    id?: true;
    machineId?: true;
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
    _min?: WorkOrderMinAggregateInputType;
    _max?: WorkOrderMaxAggregateInputType;
};
export type WorkOrderGroupByOutputType = {
    id: string;
    machineId: string;
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
    _count: WorkOrderCountAggregateOutputType | null;
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
    machineId?: Prisma.StringFilter<"WorkOrder"> | string;
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
    machine?: Prisma.XOR<Prisma.MachineScalarRelationFilter, Prisma.MachineWhereInput>;
    reportedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    assignedTo?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    repairActions?: Prisma.RepairActionListRelationFilter;
    parts?: Prisma.WorkOrderPartListRelationFilter;
};
export type WorkOrderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    machineId?: Prisma.SortOrder;
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
    machine?: Prisma.MachineOrderByWithRelationInput;
    reportedBy?: Prisma.UserOrderByWithRelationInput;
    assignedTo?: Prisma.UserOrderByWithRelationInput;
    repairActions?: Prisma.RepairActionOrderByRelationAggregateInput;
    parts?: Prisma.WorkOrderPartOrderByRelationAggregateInput;
};
export type WorkOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WorkOrderWhereInput | Prisma.WorkOrderWhereInput[];
    OR?: Prisma.WorkOrderWhereInput[];
    NOT?: Prisma.WorkOrderWhereInput | Prisma.WorkOrderWhereInput[];
    machineId?: Prisma.StringFilter<"WorkOrder"> | string;
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
    machine?: Prisma.XOR<Prisma.MachineScalarRelationFilter, Prisma.MachineWhereInput>;
    reportedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    assignedTo?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    repairActions?: Prisma.RepairActionListRelationFilter;
    parts?: Prisma.WorkOrderPartListRelationFilter;
}, "id">;
export type WorkOrderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    machineId?: Prisma.SortOrder;
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
    _count?: Prisma.WorkOrderCountOrderByAggregateInput;
    _max?: Prisma.WorkOrderMaxOrderByAggregateInput;
    _min?: Prisma.WorkOrderMinOrderByAggregateInput;
};
export type WorkOrderScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkOrderScalarWhereWithAggregatesInput | Prisma.WorkOrderScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkOrderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkOrderScalarWhereWithAggregatesInput | Prisma.WorkOrderScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WorkOrder"> | string;
    machineId?: Prisma.StringWithAggregatesFilter<"WorkOrder"> | string;
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
};
export type WorkOrderCreateInput = {
    id?: string;
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
    machine: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateInput = {
    id?: string;
    machineId: string;
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
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
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
    machine?: Prisma.MachineUpdateOneRequiredWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.StringFieldUpdateOperationsInput | string;
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
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderCreateManyInput = {
    id?: string;
    machineId: string;
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
};
export type WorkOrderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
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
};
export type WorkOrderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.StringFieldUpdateOperationsInput | string;
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
    machineId?: Prisma.SortOrder;
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
};
export type WorkOrderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    machineId?: Prisma.SortOrder;
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
};
export type WorkOrderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    machineId?: Prisma.SortOrder;
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
};
export type WorkOrderScalarRelationFilter = {
    is?: Prisma.WorkOrderWhereInput;
    isNot?: Prisma.WorkOrderWhereInput;
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
export type EnumWorkOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkOrderStatus;
};
export type EnumWorkOrderTypeFieldUpdateOperationsInput = {
    set?: $Enums.WorkOrderType;
};
export type EnumWorkOrderPriorityFieldUpdateOperationsInput = {
    set?: $Enums.WorkOrderPriority;
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
export type WorkOrderCreateWithoutReportedByInput = {
    id?: string;
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
    machine: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutReportedByInput = {
    id?: string;
    machineId: string;
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
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
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
    machine: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutAssignedToInput = {
    id?: string;
    machineId: string;
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
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderCreateOrConnectWithoutAssignedToInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedToInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedToInput>;
};
export type WorkOrderCreateManyAssignedToInputEnvelope = {
    data: Prisma.WorkOrderCreateManyAssignedToInput | Prisma.WorkOrderCreateManyAssignedToInput[];
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
    machineId?: Prisma.StringFilter<"WorkOrder"> | string;
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
export type WorkOrderCreateWithoutMachineInput = {
    id?: string;
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
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutMachineInput = {
    id?: string;
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
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
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
    machine: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    parts?: Prisma.WorkOrderPartCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutRepairActionsInput = {
    id?: string;
    machineId: string;
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
    parts?: Prisma.WorkOrderPartUncheckedCreateNestedManyWithoutWorkOrderInput;
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
    machine?: Prisma.MachineUpdateOneRequiredWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutRepairActionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.StringFieldUpdateOperationsInput | string;
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
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderCreateWithoutPartsInput = {
    id?: string;
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
    machine: Prisma.MachineCreateNestedOneWithoutWorkOrdersInput;
    reportedBy: Prisma.UserCreateNestedOneWithoutReportedWorkOrdersInput;
    assignedTo?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutWorkOrderInput;
};
export type WorkOrderUncheckedCreateWithoutPartsInput = {
    id?: string;
    machineId: string;
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
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput;
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
    machine?: Prisma.MachineUpdateOneRequiredWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutPartsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.StringFieldUpdateOperationsInput | string;
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
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderCreateManyReportedByInput = {
    id?: string;
    machineId: string;
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
};
export type WorkOrderCreateManyAssignedToInput = {
    id?: string;
    machineId: string;
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
};
export type WorkOrderUpdateWithoutReportedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
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
    machine?: Prisma.MachineUpdateOneRequiredWithoutWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutReportedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.StringFieldUpdateOperationsInput | string;
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
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutReportedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.StringFieldUpdateOperationsInput | string;
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
};
export type WorkOrderUpdateWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
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
    machine?: Prisma.MachineUpdateOneRequiredWithoutWorkOrdersNestedInput;
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.StringFieldUpdateOperationsInput | string;
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
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutAssignedToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    machineId?: Prisma.StringFieldUpdateOperationsInput | string;
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
};
export type WorkOrderCreateManyMachineInput = {
    id?: string;
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
};
export type WorkOrderUpdateWithoutMachineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
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
    reportedBy?: Prisma.UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput;
    assignedTo?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutMachineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
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
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput;
    parts?: Prisma.WorkOrderPartUncheckedUpdateManyWithoutWorkOrderNestedInput;
};
export type WorkOrderUncheckedUpdateManyWithoutMachineInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
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
};
/**
 * Count Type WorkOrderCountOutputType
 */
export type WorkOrderCountOutputType = {
    repairActions: number;
    parts: number;
};
export type WorkOrderCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    repairActions?: boolean | WorkOrderCountOutputTypeCountRepairActionsArgs;
    parts?: boolean | WorkOrderCountOutputTypeCountPartsArgs;
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
export type WorkOrderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    machineId?: boolean;
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
    machine?: boolean | Prisma.MachineDefaultArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
    repairActions?: boolean | Prisma.WorkOrder$repairActionsArgs<ExtArgs>;
    parts?: boolean | Prisma.WorkOrder$partsArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkOrderCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workOrder"]>;
export type WorkOrderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    machineId?: boolean;
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
    machine?: boolean | Prisma.MachineDefaultArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
}, ExtArgs["result"]["workOrder"]>;
export type WorkOrderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    machineId?: boolean;
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
    machine?: boolean | Prisma.MachineDefaultArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
}, ExtArgs["result"]["workOrder"]>;
export type WorkOrderSelectScalar = {
    id?: boolean;
    machineId?: boolean;
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
};
export type WorkOrderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "machineId" | "title" | "descriptionRaw" | "status" | "type" | "priority" | "reportedAt" | "reportedById" | "assignedToId" | "startedAt" | "completedAt" | "symptoms" | "suspectedCause" | "rootCause" | "failureMode" | "environmentContext" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["workOrder"]>;
export type WorkOrderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    machine?: boolean | Prisma.MachineDefaultArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
    repairActions?: boolean | Prisma.WorkOrder$repairActionsArgs<ExtArgs>;
    parts?: boolean | Prisma.WorkOrder$partsArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkOrderCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WorkOrderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    machine?: boolean | Prisma.MachineDefaultArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
};
export type WorkOrderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    machine?: boolean | Prisma.MachineDefaultArgs<ExtArgs>;
    reportedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    assignedTo?: boolean | Prisma.WorkOrder$assignedToArgs<ExtArgs>;
};
export type $WorkOrderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkOrder";
    objects: {
        machine: Prisma.$MachinePayload<ExtArgs>;
        reportedBy: Prisma.$UserPayload<ExtArgs>;
        assignedTo: Prisma.$UserPayload<ExtArgs> | null;
        repairActions: Prisma.$RepairActionPayload<ExtArgs>[];
        parts: Prisma.$WorkOrderPartPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        machineId: string;
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
    machine<T extends Prisma.MachineDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MachineDefaultArgs<ExtArgs>>): Prisma.Prisma__MachineClient<runtime.Types.Result.GetResult<Prisma.$MachinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reportedBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assignedTo<T extends Prisma.WorkOrder$assignedToArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$assignedToArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    repairActions<T extends Prisma.WorkOrder$repairActionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$repairActionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    parts<T extends Prisma.WorkOrder$partsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$partsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
    readonly machineId: Prisma.FieldRef<"WorkOrder", 'String'>;
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