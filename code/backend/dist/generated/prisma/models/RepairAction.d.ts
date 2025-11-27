import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model RepairAction
 *
 */
export type RepairActionModel = runtime.Types.Result.DefaultSelection<Prisma.$RepairActionPayload>;
export type AggregateRepairAction = {
    _count: RepairActionCountAggregateOutputType | null;
    _min: RepairActionMinAggregateOutputType | null;
    _max: RepairActionMaxAggregateOutputType | null;
};
export type RepairActionMinAggregateOutputType = {
    id: string | null;
    workOrderId: string | null;
    performedById: string | null;
    actions: string | null;
    adjustments: string | null;
    verification: string | null;
    success: boolean | null;
    failureNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RepairActionMaxAggregateOutputType = {
    id: string | null;
    workOrderId: string | null;
    performedById: string | null;
    actions: string | null;
    adjustments: string | null;
    verification: string | null;
    success: boolean | null;
    failureNote: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RepairActionCountAggregateOutputType = {
    id: number;
    workOrderId: number;
    performedById: number;
    actions: number;
    partsUsed: number;
    adjustments: number;
    verification: number;
    success: number;
    failureNote: number;
    metadata: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RepairActionMinAggregateInputType = {
    id?: true;
    workOrderId?: true;
    performedById?: true;
    actions?: true;
    adjustments?: true;
    verification?: true;
    success?: true;
    failureNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RepairActionMaxAggregateInputType = {
    id?: true;
    workOrderId?: true;
    performedById?: true;
    actions?: true;
    adjustments?: true;
    verification?: true;
    success?: true;
    failureNote?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RepairActionCountAggregateInputType = {
    id?: true;
    workOrderId?: true;
    performedById?: true;
    actions?: true;
    partsUsed?: true;
    adjustments?: true;
    verification?: true;
    success?: true;
    failureNote?: true;
    metadata?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RepairActionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RepairAction to aggregate.
     */
    where?: Prisma.RepairActionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RepairActions to fetch.
     */
    orderBy?: Prisma.RepairActionOrderByWithRelationInput | Prisma.RepairActionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RepairActionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RepairActions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RepairActions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RepairActions
    **/
    _count?: true | RepairActionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RepairActionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RepairActionMaxAggregateInputType;
};
export type GetRepairActionAggregateType<T extends RepairActionAggregateArgs> = {
    [P in keyof T & keyof AggregateRepairAction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRepairAction[P]> : Prisma.GetScalarType<T[P], AggregateRepairAction[P]>;
};
export type RepairActionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RepairActionWhereInput;
    orderBy?: Prisma.RepairActionOrderByWithAggregationInput | Prisma.RepairActionOrderByWithAggregationInput[];
    by: Prisma.RepairActionScalarFieldEnum[] | Prisma.RepairActionScalarFieldEnum;
    having?: Prisma.RepairActionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RepairActionCountAggregateInputType | true;
    _min?: RepairActionMinAggregateInputType;
    _max?: RepairActionMaxAggregateInputType;
};
export type RepairActionGroupByOutputType = {
    id: string;
    workOrderId: string;
    performedById: string;
    actions: string;
    partsUsed: runtime.JsonValue | null;
    adjustments: string | null;
    verification: string | null;
    success: boolean;
    failureNote: string | null;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: RepairActionCountAggregateOutputType | null;
    _min: RepairActionMinAggregateOutputType | null;
    _max: RepairActionMaxAggregateOutputType | null;
};
type GetRepairActionGroupByPayload<T extends RepairActionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RepairActionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RepairActionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RepairActionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RepairActionGroupByOutputType[P]>;
}>>;
export type RepairActionWhereInput = {
    AND?: Prisma.RepairActionWhereInput | Prisma.RepairActionWhereInput[];
    OR?: Prisma.RepairActionWhereInput[];
    NOT?: Prisma.RepairActionWhereInput | Prisma.RepairActionWhereInput[];
    id?: Prisma.StringFilter<"RepairAction"> | string;
    workOrderId?: Prisma.StringFilter<"RepairAction"> | string;
    performedById?: Prisma.StringFilter<"RepairAction"> | string;
    actions?: Prisma.StringFilter<"RepairAction"> | string;
    partsUsed?: Prisma.JsonNullableFilter<"RepairAction">;
    adjustments?: Prisma.StringNullableFilter<"RepairAction"> | string | null;
    verification?: Prisma.StringNullableFilter<"RepairAction"> | string | null;
    success?: Prisma.BoolFilter<"RepairAction"> | boolean;
    failureNote?: Prisma.StringNullableFilter<"RepairAction"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"RepairAction">;
    createdAt?: Prisma.DateTimeFilter<"RepairAction"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RepairAction"> | Date | string;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
    performedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RepairActionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    performedById?: Prisma.SortOrder;
    actions?: Prisma.SortOrder;
    partsUsed?: Prisma.SortOrderInput | Prisma.SortOrder;
    adjustments?: Prisma.SortOrderInput | Prisma.SortOrder;
    verification?: Prisma.SortOrderInput | Prisma.SortOrder;
    success?: Prisma.SortOrder;
    failureNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workOrder?: Prisma.WorkOrderOrderByWithRelationInput;
    performedBy?: Prisma.UserOrderByWithRelationInput;
};
export type RepairActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RepairActionWhereInput | Prisma.RepairActionWhereInput[];
    OR?: Prisma.RepairActionWhereInput[];
    NOT?: Prisma.RepairActionWhereInput | Prisma.RepairActionWhereInput[];
    workOrderId?: Prisma.StringFilter<"RepairAction"> | string;
    performedById?: Prisma.StringFilter<"RepairAction"> | string;
    actions?: Prisma.StringFilter<"RepairAction"> | string;
    partsUsed?: Prisma.JsonNullableFilter<"RepairAction">;
    adjustments?: Prisma.StringNullableFilter<"RepairAction"> | string | null;
    verification?: Prisma.StringNullableFilter<"RepairAction"> | string | null;
    success?: Prisma.BoolFilter<"RepairAction"> | boolean;
    failureNote?: Prisma.StringNullableFilter<"RepairAction"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"RepairAction">;
    createdAt?: Prisma.DateTimeFilter<"RepairAction"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RepairAction"> | Date | string;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
    performedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type RepairActionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    performedById?: Prisma.SortOrder;
    actions?: Prisma.SortOrder;
    partsUsed?: Prisma.SortOrderInput | Prisma.SortOrder;
    adjustments?: Prisma.SortOrderInput | Prisma.SortOrder;
    verification?: Prisma.SortOrderInput | Prisma.SortOrder;
    success?: Prisma.SortOrder;
    failureNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RepairActionCountOrderByAggregateInput;
    _max?: Prisma.RepairActionMaxOrderByAggregateInput;
    _min?: Prisma.RepairActionMinOrderByAggregateInput;
};
export type RepairActionScalarWhereWithAggregatesInput = {
    AND?: Prisma.RepairActionScalarWhereWithAggregatesInput | Prisma.RepairActionScalarWhereWithAggregatesInput[];
    OR?: Prisma.RepairActionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RepairActionScalarWhereWithAggregatesInput | Prisma.RepairActionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RepairAction"> | string;
    workOrderId?: Prisma.StringWithAggregatesFilter<"RepairAction"> | string;
    performedById?: Prisma.StringWithAggregatesFilter<"RepairAction"> | string;
    actions?: Prisma.StringWithAggregatesFilter<"RepairAction"> | string;
    partsUsed?: Prisma.JsonNullableWithAggregatesFilter<"RepairAction">;
    adjustments?: Prisma.StringNullableWithAggregatesFilter<"RepairAction"> | string | null;
    verification?: Prisma.StringNullableWithAggregatesFilter<"RepairAction"> | string | null;
    success?: Prisma.BoolWithAggregatesFilter<"RepairAction"> | boolean;
    failureNote?: Prisma.StringNullableWithAggregatesFilter<"RepairAction"> | string | null;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"RepairAction">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RepairAction"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"RepairAction"> | Date | string;
};
export type RepairActionCreateInput = {
    id?: string;
    actions: string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: string | null;
    verification?: string | null;
    success: boolean;
    failureNote?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutRepairActionsInput;
    performedBy: Prisma.UserCreateNestedOneWithoutRepairActionsInput;
};
export type RepairActionUncheckedCreateInput = {
    id?: string;
    workOrderId: string;
    performedById: string;
    actions: string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: string | null;
    verification?: string | null;
    success: boolean;
    failureNote?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RepairActionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actions?: Prisma.StringFieldUpdateOperationsInput | string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failureNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutRepairActionsNestedInput;
    performedBy?: Prisma.UserUpdateOneRequiredWithoutRepairActionsNestedInput;
};
export type RepairActionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    actions?: Prisma.StringFieldUpdateOperationsInput | string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failureNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairActionCreateManyInput = {
    id?: string;
    workOrderId: string;
    performedById: string;
    actions: string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: string | null;
    verification?: string | null;
    success: boolean;
    failureNote?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RepairActionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actions?: Prisma.StringFieldUpdateOperationsInput | string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failureNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairActionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    actions?: Prisma.StringFieldUpdateOperationsInput | string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failureNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairActionListRelationFilter = {
    every?: Prisma.RepairActionWhereInput;
    some?: Prisma.RepairActionWhereInput;
    none?: Prisma.RepairActionWhereInput;
};
export type RepairActionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RepairActionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    performedById?: Prisma.SortOrder;
    actions?: Prisma.SortOrder;
    partsUsed?: Prisma.SortOrder;
    adjustments?: Prisma.SortOrder;
    verification?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    failureNote?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RepairActionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    performedById?: Prisma.SortOrder;
    actions?: Prisma.SortOrder;
    adjustments?: Prisma.SortOrder;
    verification?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    failureNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RepairActionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    performedById?: Prisma.SortOrder;
    actions?: Prisma.SortOrder;
    adjustments?: Prisma.SortOrder;
    verification?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    failureNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RepairActionCreateNestedManyWithoutPerformedByInput = {
    create?: Prisma.XOR<Prisma.RepairActionCreateWithoutPerformedByInput, Prisma.RepairActionUncheckedCreateWithoutPerformedByInput> | Prisma.RepairActionCreateWithoutPerformedByInput[] | Prisma.RepairActionUncheckedCreateWithoutPerformedByInput[];
    connectOrCreate?: Prisma.RepairActionCreateOrConnectWithoutPerformedByInput | Prisma.RepairActionCreateOrConnectWithoutPerformedByInput[];
    createMany?: Prisma.RepairActionCreateManyPerformedByInputEnvelope;
    connect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
};
export type RepairActionUncheckedCreateNestedManyWithoutPerformedByInput = {
    create?: Prisma.XOR<Prisma.RepairActionCreateWithoutPerformedByInput, Prisma.RepairActionUncheckedCreateWithoutPerformedByInput> | Prisma.RepairActionCreateWithoutPerformedByInput[] | Prisma.RepairActionUncheckedCreateWithoutPerformedByInput[];
    connectOrCreate?: Prisma.RepairActionCreateOrConnectWithoutPerformedByInput | Prisma.RepairActionCreateOrConnectWithoutPerformedByInput[];
    createMany?: Prisma.RepairActionCreateManyPerformedByInputEnvelope;
    connect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
};
export type RepairActionUpdateManyWithoutPerformedByNestedInput = {
    create?: Prisma.XOR<Prisma.RepairActionCreateWithoutPerformedByInput, Prisma.RepairActionUncheckedCreateWithoutPerformedByInput> | Prisma.RepairActionCreateWithoutPerformedByInput[] | Prisma.RepairActionUncheckedCreateWithoutPerformedByInput[];
    connectOrCreate?: Prisma.RepairActionCreateOrConnectWithoutPerformedByInput | Prisma.RepairActionCreateOrConnectWithoutPerformedByInput[];
    upsert?: Prisma.RepairActionUpsertWithWhereUniqueWithoutPerformedByInput | Prisma.RepairActionUpsertWithWhereUniqueWithoutPerformedByInput[];
    createMany?: Prisma.RepairActionCreateManyPerformedByInputEnvelope;
    set?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    disconnect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    delete?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    connect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    update?: Prisma.RepairActionUpdateWithWhereUniqueWithoutPerformedByInput | Prisma.RepairActionUpdateWithWhereUniqueWithoutPerformedByInput[];
    updateMany?: Prisma.RepairActionUpdateManyWithWhereWithoutPerformedByInput | Prisma.RepairActionUpdateManyWithWhereWithoutPerformedByInput[];
    deleteMany?: Prisma.RepairActionScalarWhereInput | Prisma.RepairActionScalarWhereInput[];
};
export type RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput = {
    create?: Prisma.XOR<Prisma.RepairActionCreateWithoutPerformedByInput, Prisma.RepairActionUncheckedCreateWithoutPerformedByInput> | Prisma.RepairActionCreateWithoutPerformedByInput[] | Prisma.RepairActionUncheckedCreateWithoutPerformedByInput[];
    connectOrCreate?: Prisma.RepairActionCreateOrConnectWithoutPerformedByInput | Prisma.RepairActionCreateOrConnectWithoutPerformedByInput[];
    upsert?: Prisma.RepairActionUpsertWithWhereUniqueWithoutPerformedByInput | Prisma.RepairActionUpsertWithWhereUniqueWithoutPerformedByInput[];
    createMany?: Prisma.RepairActionCreateManyPerformedByInputEnvelope;
    set?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    disconnect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    delete?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    connect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    update?: Prisma.RepairActionUpdateWithWhereUniqueWithoutPerformedByInput | Prisma.RepairActionUpdateWithWhereUniqueWithoutPerformedByInput[];
    updateMany?: Prisma.RepairActionUpdateManyWithWhereWithoutPerformedByInput | Prisma.RepairActionUpdateManyWithWhereWithoutPerformedByInput[];
    deleteMany?: Prisma.RepairActionScalarWhereInput | Prisma.RepairActionScalarWhereInput[];
};
export type RepairActionCreateNestedManyWithoutWorkOrderInput = {
    create?: Prisma.XOR<Prisma.RepairActionCreateWithoutWorkOrderInput, Prisma.RepairActionUncheckedCreateWithoutWorkOrderInput> | Prisma.RepairActionCreateWithoutWorkOrderInput[] | Prisma.RepairActionUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.RepairActionCreateOrConnectWithoutWorkOrderInput | Prisma.RepairActionCreateOrConnectWithoutWorkOrderInput[];
    createMany?: Prisma.RepairActionCreateManyWorkOrderInputEnvelope;
    connect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
};
export type RepairActionUncheckedCreateNestedManyWithoutWorkOrderInput = {
    create?: Prisma.XOR<Prisma.RepairActionCreateWithoutWorkOrderInput, Prisma.RepairActionUncheckedCreateWithoutWorkOrderInput> | Prisma.RepairActionCreateWithoutWorkOrderInput[] | Prisma.RepairActionUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.RepairActionCreateOrConnectWithoutWorkOrderInput | Prisma.RepairActionCreateOrConnectWithoutWorkOrderInput[];
    createMany?: Prisma.RepairActionCreateManyWorkOrderInputEnvelope;
    connect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
};
export type RepairActionUpdateManyWithoutWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.RepairActionCreateWithoutWorkOrderInput, Prisma.RepairActionUncheckedCreateWithoutWorkOrderInput> | Prisma.RepairActionCreateWithoutWorkOrderInput[] | Prisma.RepairActionUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.RepairActionCreateOrConnectWithoutWorkOrderInput | Prisma.RepairActionCreateOrConnectWithoutWorkOrderInput[];
    upsert?: Prisma.RepairActionUpsertWithWhereUniqueWithoutWorkOrderInput | Prisma.RepairActionUpsertWithWhereUniqueWithoutWorkOrderInput[];
    createMany?: Prisma.RepairActionCreateManyWorkOrderInputEnvelope;
    set?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    disconnect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    delete?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    connect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    update?: Prisma.RepairActionUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.RepairActionUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.RepairActionUpdateManyWithWhereWithoutWorkOrderInput | Prisma.RepairActionUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.RepairActionScalarWhereInput | Prisma.RepairActionScalarWhereInput[];
};
export type RepairActionUncheckedUpdateManyWithoutWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.RepairActionCreateWithoutWorkOrderInput, Prisma.RepairActionUncheckedCreateWithoutWorkOrderInput> | Prisma.RepairActionCreateWithoutWorkOrderInput[] | Prisma.RepairActionUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.RepairActionCreateOrConnectWithoutWorkOrderInput | Prisma.RepairActionCreateOrConnectWithoutWorkOrderInput[];
    upsert?: Prisma.RepairActionUpsertWithWhereUniqueWithoutWorkOrderInput | Prisma.RepairActionUpsertWithWhereUniqueWithoutWorkOrderInput[];
    createMany?: Prisma.RepairActionCreateManyWorkOrderInputEnvelope;
    set?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    disconnect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    delete?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    connect?: Prisma.RepairActionWhereUniqueInput | Prisma.RepairActionWhereUniqueInput[];
    update?: Prisma.RepairActionUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.RepairActionUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.RepairActionUpdateManyWithWhereWithoutWorkOrderInput | Prisma.RepairActionUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.RepairActionScalarWhereInput | Prisma.RepairActionScalarWhereInput[];
};
export type RepairActionCreateWithoutPerformedByInput = {
    id?: string;
    actions: string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: string | null;
    verification?: string | null;
    success: boolean;
    failureNote?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutRepairActionsInput;
};
export type RepairActionUncheckedCreateWithoutPerformedByInput = {
    id?: string;
    workOrderId: string;
    actions: string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: string | null;
    verification?: string | null;
    success: boolean;
    failureNote?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RepairActionCreateOrConnectWithoutPerformedByInput = {
    where: Prisma.RepairActionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RepairActionCreateWithoutPerformedByInput, Prisma.RepairActionUncheckedCreateWithoutPerformedByInput>;
};
export type RepairActionCreateManyPerformedByInputEnvelope = {
    data: Prisma.RepairActionCreateManyPerformedByInput | Prisma.RepairActionCreateManyPerformedByInput[];
    skipDuplicates?: boolean;
};
export type RepairActionUpsertWithWhereUniqueWithoutPerformedByInput = {
    where: Prisma.RepairActionWhereUniqueInput;
    update: Prisma.XOR<Prisma.RepairActionUpdateWithoutPerformedByInput, Prisma.RepairActionUncheckedUpdateWithoutPerformedByInput>;
    create: Prisma.XOR<Prisma.RepairActionCreateWithoutPerformedByInput, Prisma.RepairActionUncheckedCreateWithoutPerformedByInput>;
};
export type RepairActionUpdateWithWhereUniqueWithoutPerformedByInput = {
    where: Prisma.RepairActionWhereUniqueInput;
    data: Prisma.XOR<Prisma.RepairActionUpdateWithoutPerformedByInput, Prisma.RepairActionUncheckedUpdateWithoutPerformedByInput>;
};
export type RepairActionUpdateManyWithWhereWithoutPerformedByInput = {
    where: Prisma.RepairActionScalarWhereInput;
    data: Prisma.XOR<Prisma.RepairActionUpdateManyMutationInput, Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByInput>;
};
export type RepairActionScalarWhereInput = {
    AND?: Prisma.RepairActionScalarWhereInput | Prisma.RepairActionScalarWhereInput[];
    OR?: Prisma.RepairActionScalarWhereInput[];
    NOT?: Prisma.RepairActionScalarWhereInput | Prisma.RepairActionScalarWhereInput[];
    id?: Prisma.StringFilter<"RepairAction"> | string;
    workOrderId?: Prisma.StringFilter<"RepairAction"> | string;
    performedById?: Prisma.StringFilter<"RepairAction"> | string;
    actions?: Prisma.StringFilter<"RepairAction"> | string;
    partsUsed?: Prisma.JsonNullableFilter<"RepairAction">;
    adjustments?: Prisma.StringNullableFilter<"RepairAction"> | string | null;
    verification?: Prisma.StringNullableFilter<"RepairAction"> | string | null;
    success?: Prisma.BoolFilter<"RepairAction"> | boolean;
    failureNote?: Prisma.StringNullableFilter<"RepairAction"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"RepairAction">;
    createdAt?: Prisma.DateTimeFilter<"RepairAction"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RepairAction"> | Date | string;
};
export type RepairActionCreateWithoutWorkOrderInput = {
    id?: string;
    actions: string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: string | null;
    verification?: string | null;
    success: boolean;
    failureNote?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    performedBy: Prisma.UserCreateNestedOneWithoutRepairActionsInput;
};
export type RepairActionUncheckedCreateWithoutWorkOrderInput = {
    id?: string;
    performedById: string;
    actions: string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: string | null;
    verification?: string | null;
    success: boolean;
    failureNote?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RepairActionCreateOrConnectWithoutWorkOrderInput = {
    where: Prisma.RepairActionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RepairActionCreateWithoutWorkOrderInput, Prisma.RepairActionUncheckedCreateWithoutWorkOrderInput>;
};
export type RepairActionCreateManyWorkOrderInputEnvelope = {
    data: Prisma.RepairActionCreateManyWorkOrderInput | Prisma.RepairActionCreateManyWorkOrderInput[];
    skipDuplicates?: boolean;
};
export type RepairActionUpsertWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.RepairActionWhereUniqueInput;
    update: Prisma.XOR<Prisma.RepairActionUpdateWithoutWorkOrderInput, Prisma.RepairActionUncheckedUpdateWithoutWorkOrderInput>;
    create: Prisma.XOR<Prisma.RepairActionCreateWithoutWorkOrderInput, Prisma.RepairActionUncheckedCreateWithoutWorkOrderInput>;
};
export type RepairActionUpdateWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.RepairActionWhereUniqueInput;
    data: Prisma.XOR<Prisma.RepairActionUpdateWithoutWorkOrderInput, Prisma.RepairActionUncheckedUpdateWithoutWorkOrderInput>;
};
export type RepairActionUpdateManyWithWhereWithoutWorkOrderInput = {
    where: Prisma.RepairActionScalarWhereInput;
    data: Prisma.XOR<Prisma.RepairActionUpdateManyMutationInput, Prisma.RepairActionUncheckedUpdateManyWithoutWorkOrderInput>;
};
export type RepairActionCreateManyPerformedByInput = {
    id?: string;
    workOrderId: string;
    actions: string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: string | null;
    verification?: string | null;
    success: boolean;
    failureNote?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RepairActionUpdateWithoutPerformedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actions?: Prisma.StringFieldUpdateOperationsInput | string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failureNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutRepairActionsNestedInput;
};
export type RepairActionUncheckedUpdateWithoutPerformedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    actions?: Prisma.StringFieldUpdateOperationsInput | string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failureNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairActionUncheckedUpdateManyWithoutPerformedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    actions?: Prisma.StringFieldUpdateOperationsInput | string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failureNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairActionCreateManyWorkOrderInput = {
    id?: string;
    performedById: string;
    actions: string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: string | null;
    verification?: string | null;
    success: boolean;
    failureNote?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RepairActionUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actions?: Prisma.StringFieldUpdateOperationsInput | string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failureNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    performedBy?: Prisma.UserUpdateOneRequiredWithoutRepairActionsNestedInput;
};
export type RepairActionUncheckedUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    actions?: Prisma.StringFieldUpdateOperationsInput | string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failureNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairActionUncheckedUpdateManyWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    performedById?: Prisma.StringFieldUpdateOperationsInput | string;
    actions?: Prisma.StringFieldUpdateOperationsInput | string;
    partsUsed?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    adjustments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verification?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    failureNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RepairActionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workOrderId?: boolean;
    performedById?: boolean;
    actions?: boolean;
    partsUsed?: boolean;
    adjustments?: boolean;
    verification?: boolean;
    success?: boolean;
    failureNote?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["repairAction"]>;
export type RepairActionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workOrderId?: boolean;
    performedById?: boolean;
    actions?: boolean;
    partsUsed?: boolean;
    adjustments?: boolean;
    verification?: boolean;
    success?: boolean;
    failureNote?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["repairAction"]>;
export type RepairActionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workOrderId?: boolean;
    performedById?: boolean;
    actions?: boolean;
    partsUsed?: boolean;
    adjustments?: boolean;
    verification?: boolean;
    success?: boolean;
    failureNote?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["repairAction"]>;
export type RepairActionSelectScalar = {
    id?: boolean;
    workOrderId?: boolean;
    performedById?: boolean;
    actions?: boolean;
    partsUsed?: boolean;
    adjustments?: boolean;
    verification?: boolean;
    success?: boolean;
    failureNote?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RepairActionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "workOrderId" | "performedById" | "actions" | "partsUsed" | "adjustments" | "verification" | "success" | "failureNote" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["repairAction"]>;
export type RepairActionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RepairActionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RepairActionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    performedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RepairActionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RepairAction";
    objects: {
        workOrder: Prisma.$WorkOrderPayload<ExtArgs>;
        performedBy: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        workOrderId: string;
        performedById: string;
        actions: string;
        partsUsed: runtime.JsonValue | null;
        adjustments: string | null;
        verification: string | null;
        success: boolean;
        failureNote: string | null;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["repairAction"]>;
    composites: {};
};
export type RepairActionGetPayload<S extends boolean | null | undefined | RepairActionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RepairActionPayload, S>;
export type RepairActionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RepairActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RepairActionCountAggregateInputType | true;
};
export interface RepairActionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RepairAction'];
        meta: {
            name: 'RepairAction';
        };
    };
    /**
     * Find zero or one RepairAction that matches the filter.
     * @param {RepairActionFindUniqueArgs} args - Arguments to find a RepairAction
     * @example
     * // Get one RepairAction
     * const repairAction = await prisma.repairAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepairActionFindUniqueArgs>(args: Prisma.SelectSubset<T, RepairActionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RepairActionClient<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one RepairAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepairActionFindUniqueOrThrowArgs} args - Arguments to find a RepairAction
     * @example
     * // Get one RepairAction
     * const repairAction = await prisma.repairAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepairActionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RepairActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RepairActionClient<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RepairAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairActionFindFirstArgs} args - Arguments to find a RepairAction
     * @example
     * // Get one RepairAction
     * const repairAction = await prisma.repairAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepairActionFindFirstArgs>(args?: Prisma.SelectSubset<T, RepairActionFindFirstArgs<ExtArgs>>): Prisma.Prisma__RepairActionClient<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RepairAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairActionFindFirstOrThrowArgs} args - Arguments to find a RepairAction
     * @example
     * // Get one RepairAction
     * const repairAction = await prisma.repairAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepairActionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RepairActionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RepairActionClient<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more RepairActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepairActions
     * const repairActions = await prisma.repairAction.findMany()
     *
     * // Get first 10 RepairActions
     * const repairActions = await prisma.repairAction.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const repairActionWithIdOnly = await prisma.repairAction.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RepairActionFindManyArgs>(args?: Prisma.SelectSubset<T, RepairActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a RepairAction.
     * @param {RepairActionCreateArgs} args - Arguments to create a RepairAction.
     * @example
     * // Create one RepairAction
     * const RepairAction = await prisma.repairAction.create({
     *   data: {
     *     // ... data to create a RepairAction
     *   }
     * })
     *
     */
    create<T extends RepairActionCreateArgs>(args: Prisma.SelectSubset<T, RepairActionCreateArgs<ExtArgs>>): Prisma.Prisma__RepairActionClient<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many RepairActions.
     * @param {RepairActionCreateManyArgs} args - Arguments to create many RepairActions.
     * @example
     * // Create many RepairActions
     * const repairAction = await prisma.repairAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RepairActionCreateManyArgs>(args?: Prisma.SelectSubset<T, RepairActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many RepairActions and returns the data saved in the database.
     * @param {RepairActionCreateManyAndReturnArgs} args - Arguments to create many RepairActions.
     * @example
     * // Create many RepairActions
     * const repairAction = await prisma.repairAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RepairActions and only return the `id`
     * const repairActionWithIdOnly = await prisma.repairAction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RepairActionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RepairActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a RepairAction.
     * @param {RepairActionDeleteArgs} args - Arguments to delete one RepairAction.
     * @example
     * // Delete one RepairAction
     * const RepairAction = await prisma.repairAction.delete({
     *   where: {
     *     // ... filter to delete one RepairAction
     *   }
     * })
     *
     */
    delete<T extends RepairActionDeleteArgs>(args: Prisma.SelectSubset<T, RepairActionDeleteArgs<ExtArgs>>): Prisma.Prisma__RepairActionClient<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one RepairAction.
     * @param {RepairActionUpdateArgs} args - Arguments to update one RepairAction.
     * @example
     * // Update one RepairAction
     * const repairAction = await prisma.repairAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RepairActionUpdateArgs>(args: Prisma.SelectSubset<T, RepairActionUpdateArgs<ExtArgs>>): Prisma.Prisma__RepairActionClient<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more RepairActions.
     * @param {RepairActionDeleteManyArgs} args - Arguments to filter RepairActions to delete.
     * @example
     * // Delete a few RepairActions
     * const { count } = await prisma.repairAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RepairActionDeleteManyArgs>(args?: Prisma.SelectSubset<T, RepairActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RepairActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepairActions
     * const repairAction = await prisma.repairAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RepairActionUpdateManyArgs>(args: Prisma.SelectSubset<T, RepairActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RepairActions and returns the data updated in the database.
     * @param {RepairActionUpdateManyAndReturnArgs} args - Arguments to update many RepairActions.
     * @example
     * // Update many RepairActions
     * const repairAction = await prisma.repairAction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RepairActions and only return the `id`
     * const repairActionWithIdOnly = await prisma.repairAction.updateManyAndReturn({
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
    updateManyAndReturn<T extends RepairActionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RepairActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one RepairAction.
     * @param {RepairActionUpsertArgs} args - Arguments to update or create a RepairAction.
     * @example
     * // Update or create a RepairAction
     * const repairAction = await prisma.repairAction.upsert({
     *   create: {
     *     // ... data to create a RepairAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepairAction we want to update
     *   }
     * })
     */
    upsert<T extends RepairActionUpsertArgs>(args: Prisma.SelectSubset<T, RepairActionUpsertArgs<ExtArgs>>): Prisma.Prisma__RepairActionClient<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of RepairActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairActionCountArgs} args - Arguments to filter RepairActions to count.
     * @example
     * // Count the number of RepairActions
     * const count = await prisma.repairAction.count({
     *   where: {
     *     // ... the filter for the RepairActions we want to count
     *   }
     * })
    **/
    count<T extends RepairActionCountArgs>(args?: Prisma.Subset<T, RepairActionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RepairActionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a RepairAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RepairActionAggregateArgs>(args: Prisma.Subset<T, RepairActionAggregateArgs>): Prisma.PrismaPromise<GetRepairActionAggregateType<T>>;
    /**
     * Group by RepairAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepairActionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends RepairActionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RepairActionGroupByArgs['orderBy'];
    } : {
        orderBy?: RepairActionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RepairActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepairActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RepairAction model
     */
    readonly fields: RepairActionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for RepairAction.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RepairActionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workOrder<T extends Prisma.WorkOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    performedBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the RepairAction model
 */
export interface RepairActionFieldRefs {
    readonly id: Prisma.FieldRef<"RepairAction", 'String'>;
    readonly workOrderId: Prisma.FieldRef<"RepairAction", 'String'>;
    readonly performedById: Prisma.FieldRef<"RepairAction", 'String'>;
    readonly actions: Prisma.FieldRef<"RepairAction", 'String'>;
    readonly partsUsed: Prisma.FieldRef<"RepairAction", 'Json'>;
    readonly adjustments: Prisma.FieldRef<"RepairAction", 'String'>;
    readonly verification: Prisma.FieldRef<"RepairAction", 'String'>;
    readonly success: Prisma.FieldRef<"RepairAction", 'Boolean'>;
    readonly failureNote: Prisma.FieldRef<"RepairAction", 'String'>;
    readonly metadata: Prisma.FieldRef<"RepairAction", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"RepairAction", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"RepairAction", 'DateTime'>;
}
/**
 * RepairAction findUnique
 */
export type RepairActionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RepairAction to fetch.
     */
    where: Prisma.RepairActionWhereUniqueInput;
};
/**
 * RepairAction findUniqueOrThrow
 */
export type RepairActionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RepairAction to fetch.
     */
    where: Prisma.RepairActionWhereUniqueInput;
};
/**
 * RepairAction findFirst
 */
export type RepairActionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RepairAction to fetch.
     */
    where?: Prisma.RepairActionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RepairActions to fetch.
     */
    orderBy?: Prisma.RepairActionOrderByWithRelationInput | Prisma.RepairActionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RepairActions.
     */
    cursor?: Prisma.RepairActionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RepairActions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RepairActions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RepairActions.
     */
    distinct?: Prisma.RepairActionScalarFieldEnum | Prisma.RepairActionScalarFieldEnum[];
};
/**
 * RepairAction findFirstOrThrow
 */
export type RepairActionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RepairAction to fetch.
     */
    where?: Prisma.RepairActionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RepairActions to fetch.
     */
    orderBy?: Prisma.RepairActionOrderByWithRelationInput | Prisma.RepairActionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RepairActions.
     */
    cursor?: Prisma.RepairActionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RepairActions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RepairActions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RepairActions.
     */
    distinct?: Prisma.RepairActionScalarFieldEnum | Prisma.RepairActionScalarFieldEnum[];
};
/**
 * RepairAction findMany
 */
export type RepairActionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RepairActions to fetch.
     */
    where?: Prisma.RepairActionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RepairActions to fetch.
     */
    orderBy?: Prisma.RepairActionOrderByWithRelationInput | Prisma.RepairActionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RepairActions.
     */
    cursor?: Prisma.RepairActionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RepairActions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RepairActions.
     */
    skip?: number;
    distinct?: Prisma.RepairActionScalarFieldEnum | Prisma.RepairActionScalarFieldEnum[];
};
/**
 * RepairAction create
 */
export type RepairActionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a RepairAction.
     */
    data: Prisma.XOR<Prisma.RepairActionCreateInput, Prisma.RepairActionUncheckedCreateInput>;
};
/**
 * RepairAction createMany
 */
export type RepairActionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RepairActions.
     */
    data: Prisma.RepairActionCreateManyInput | Prisma.RepairActionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RepairAction createManyAndReturn
 */
export type RepairActionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairAction
     */
    select?: Prisma.RepairActionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RepairAction
     */
    omit?: Prisma.RepairActionOmit<ExtArgs> | null;
    /**
     * The data used to create many RepairActions.
     */
    data: Prisma.RepairActionCreateManyInput | Prisma.RepairActionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RepairActionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * RepairAction update
 */
export type RepairActionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a RepairAction.
     */
    data: Prisma.XOR<Prisma.RepairActionUpdateInput, Prisma.RepairActionUncheckedUpdateInput>;
    /**
     * Choose, which RepairAction to update.
     */
    where: Prisma.RepairActionWhereUniqueInput;
};
/**
 * RepairAction updateMany
 */
export type RepairActionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RepairActions.
     */
    data: Prisma.XOR<Prisma.RepairActionUpdateManyMutationInput, Prisma.RepairActionUncheckedUpdateManyInput>;
    /**
     * Filter which RepairActions to update
     */
    where?: Prisma.RepairActionWhereInput;
    /**
     * Limit how many RepairActions to update.
     */
    limit?: number;
};
/**
 * RepairAction updateManyAndReturn
 */
export type RepairActionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairAction
     */
    select?: Prisma.RepairActionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RepairAction
     */
    omit?: Prisma.RepairActionOmit<ExtArgs> | null;
    /**
     * The data used to update RepairActions.
     */
    data: Prisma.XOR<Prisma.RepairActionUpdateManyMutationInput, Prisma.RepairActionUncheckedUpdateManyInput>;
    /**
     * Filter which RepairActions to update
     */
    where?: Prisma.RepairActionWhereInput;
    /**
     * Limit how many RepairActions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RepairActionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * RepairAction upsert
 */
export type RepairActionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the RepairAction to update in case it exists.
     */
    where: Prisma.RepairActionWhereUniqueInput;
    /**
     * In case the RepairAction found by the `where` argument doesn't exist, create a new RepairAction with this data.
     */
    create: Prisma.XOR<Prisma.RepairActionCreateInput, Prisma.RepairActionUncheckedCreateInput>;
    /**
     * In case the RepairAction was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RepairActionUpdateInput, Prisma.RepairActionUncheckedUpdateInput>;
};
/**
 * RepairAction delete
 */
export type RepairActionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which RepairAction to delete.
     */
    where: Prisma.RepairActionWhereUniqueInput;
};
/**
 * RepairAction deleteMany
 */
export type RepairActionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RepairActions to delete
     */
    where?: Prisma.RepairActionWhereInput;
    /**
     * Limit how many RepairActions to delete.
     */
    limit?: number;
};
/**
 * RepairAction without action
 */
export type RepairActionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=RepairAction.d.ts.map