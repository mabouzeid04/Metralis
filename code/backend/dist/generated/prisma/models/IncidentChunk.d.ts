import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model IncidentChunk
 *
 */
export type IncidentChunkModel = runtime.Types.Result.DefaultSelection<Prisma.$IncidentChunkPayload>;
export type AggregateIncidentChunk = {
    _count: IncidentChunkCountAggregateOutputType | null;
    _avg: IncidentChunkAvgAggregateOutputType | null;
    _sum: IncidentChunkSumAggregateOutputType | null;
    _min: IncidentChunkMinAggregateOutputType | null;
    _max: IncidentChunkMaxAggregateOutputType | null;
};
export type IncidentChunkAvgAggregateOutputType = {
    chunkIndex: number | null;
    tokens: number | null;
};
export type IncidentChunkSumAggregateOutputType = {
    chunkIndex: number | null;
    tokens: number | null;
};
export type IncidentChunkMinAggregateOutputType = {
    id: string | null;
    workOrderId: string | null;
    chunkIndex: number | null;
    content: string | null;
    tokens: number | null;
    machineId: string | null;
    machineType: string | null;
    language: string | null;
    createdAt: Date | null;
};
export type IncidentChunkMaxAggregateOutputType = {
    id: string | null;
    workOrderId: string | null;
    chunkIndex: number | null;
    content: string | null;
    tokens: number | null;
    machineId: string | null;
    machineType: string | null;
    language: string | null;
    createdAt: Date | null;
};
export type IncidentChunkCountAggregateOutputType = {
    id: number;
    workOrderId: number;
    chunkIndex: number;
    content: number;
    tokens: number;
    machineId: number;
    machineType: number;
    language: number;
    metadata: number;
    createdAt: number;
    _all: number;
};
export type IncidentChunkAvgAggregateInputType = {
    chunkIndex?: true;
    tokens?: true;
};
export type IncidentChunkSumAggregateInputType = {
    chunkIndex?: true;
    tokens?: true;
};
export type IncidentChunkMinAggregateInputType = {
    id?: true;
    workOrderId?: true;
    chunkIndex?: true;
    content?: true;
    tokens?: true;
    machineId?: true;
    machineType?: true;
    language?: true;
    createdAt?: true;
};
export type IncidentChunkMaxAggregateInputType = {
    id?: true;
    workOrderId?: true;
    chunkIndex?: true;
    content?: true;
    tokens?: true;
    machineId?: true;
    machineType?: true;
    language?: true;
    createdAt?: true;
};
export type IncidentChunkCountAggregateInputType = {
    id?: true;
    workOrderId?: true;
    chunkIndex?: true;
    content?: true;
    tokens?: true;
    machineId?: true;
    machineType?: true;
    language?: true;
    metadata?: true;
    createdAt?: true;
    _all?: true;
};
export type IncidentChunkAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which IncidentChunk to aggregate.
     */
    where?: Prisma.IncidentChunkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IncidentChunks to fetch.
     */
    orderBy?: Prisma.IncidentChunkOrderByWithRelationInput | Prisma.IncidentChunkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.IncidentChunkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IncidentChunks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IncidentChunks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned IncidentChunks
    **/
    _count?: true | IncidentChunkCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: IncidentChunkAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: IncidentChunkSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: IncidentChunkMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: IncidentChunkMaxAggregateInputType;
};
export type GetIncidentChunkAggregateType<T extends IncidentChunkAggregateArgs> = {
    [P in keyof T & keyof AggregateIncidentChunk]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIncidentChunk[P]> : Prisma.GetScalarType<T[P], AggregateIncidentChunk[P]>;
};
export type IncidentChunkGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IncidentChunkWhereInput;
    orderBy?: Prisma.IncidentChunkOrderByWithAggregationInput | Prisma.IncidentChunkOrderByWithAggregationInput[];
    by: Prisma.IncidentChunkScalarFieldEnum[] | Prisma.IncidentChunkScalarFieldEnum;
    having?: Prisma.IncidentChunkScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IncidentChunkCountAggregateInputType | true;
    _avg?: IncidentChunkAvgAggregateInputType;
    _sum?: IncidentChunkSumAggregateInputType;
    _min?: IncidentChunkMinAggregateInputType;
    _max?: IncidentChunkMaxAggregateInputType;
};
export type IncidentChunkGroupByOutputType = {
    id: string;
    workOrderId: string;
    chunkIndex: number;
    content: string;
    tokens: number;
    machineId: string | null;
    machineType: string | null;
    language: string | null;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    _count: IncidentChunkCountAggregateOutputType | null;
    _avg: IncidentChunkAvgAggregateOutputType | null;
    _sum: IncidentChunkSumAggregateOutputType | null;
    _min: IncidentChunkMinAggregateOutputType | null;
    _max: IncidentChunkMaxAggregateOutputType | null;
};
type GetIncidentChunkGroupByPayload<T extends IncidentChunkGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IncidentChunkGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IncidentChunkGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IncidentChunkGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IncidentChunkGroupByOutputType[P]>;
}>>;
export type IncidentChunkWhereInput = {
    AND?: Prisma.IncidentChunkWhereInput | Prisma.IncidentChunkWhereInput[];
    OR?: Prisma.IncidentChunkWhereInput[];
    NOT?: Prisma.IncidentChunkWhereInput | Prisma.IncidentChunkWhereInput[];
    id?: Prisma.StringFilter<"IncidentChunk"> | string;
    workOrderId?: Prisma.StringFilter<"IncidentChunk"> | string;
    chunkIndex?: Prisma.IntFilter<"IncidentChunk"> | number;
    content?: Prisma.StringFilter<"IncidentChunk"> | string;
    tokens?: Prisma.IntFilter<"IncidentChunk"> | number;
    machineId?: Prisma.StringNullableFilter<"IncidentChunk"> | string | null;
    machineType?: Prisma.StringNullableFilter<"IncidentChunk"> | string | null;
    language?: Prisma.StringNullableFilter<"IncidentChunk"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"IncidentChunk">;
    createdAt?: Prisma.DateTimeFilter<"IncidentChunk"> | Date | string;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
};
export type IncidentChunkOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    chunkIndex?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    tokens?: Prisma.SortOrder;
    machineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    machineType?: Prisma.SortOrderInput | Prisma.SortOrder;
    language?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    workOrder?: Prisma.WorkOrderOrderByWithRelationInput;
};
export type IncidentChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    workOrderId_chunkIndex?: Prisma.IncidentChunkWorkOrderIdChunkIndexCompoundUniqueInput;
    AND?: Prisma.IncidentChunkWhereInput | Prisma.IncidentChunkWhereInput[];
    OR?: Prisma.IncidentChunkWhereInput[];
    NOT?: Prisma.IncidentChunkWhereInput | Prisma.IncidentChunkWhereInput[];
    workOrderId?: Prisma.StringFilter<"IncidentChunk"> | string;
    chunkIndex?: Prisma.IntFilter<"IncidentChunk"> | number;
    content?: Prisma.StringFilter<"IncidentChunk"> | string;
    tokens?: Prisma.IntFilter<"IncidentChunk"> | number;
    machineId?: Prisma.StringNullableFilter<"IncidentChunk"> | string | null;
    machineType?: Prisma.StringNullableFilter<"IncidentChunk"> | string | null;
    language?: Prisma.StringNullableFilter<"IncidentChunk"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"IncidentChunk">;
    createdAt?: Prisma.DateTimeFilter<"IncidentChunk"> | Date | string;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
}, "id" | "workOrderId_chunkIndex">;
export type IncidentChunkOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    chunkIndex?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    tokens?: Prisma.SortOrder;
    machineId?: Prisma.SortOrderInput | Prisma.SortOrder;
    machineType?: Prisma.SortOrderInput | Prisma.SortOrder;
    language?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.IncidentChunkCountOrderByAggregateInput;
    _avg?: Prisma.IncidentChunkAvgOrderByAggregateInput;
    _max?: Prisma.IncidentChunkMaxOrderByAggregateInput;
    _min?: Prisma.IncidentChunkMinOrderByAggregateInput;
    _sum?: Prisma.IncidentChunkSumOrderByAggregateInput;
};
export type IncidentChunkScalarWhereWithAggregatesInput = {
    AND?: Prisma.IncidentChunkScalarWhereWithAggregatesInput | Prisma.IncidentChunkScalarWhereWithAggregatesInput[];
    OR?: Prisma.IncidentChunkScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IncidentChunkScalarWhereWithAggregatesInput | Prisma.IncidentChunkScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"IncidentChunk"> | string;
    workOrderId?: Prisma.StringWithAggregatesFilter<"IncidentChunk"> | string;
    chunkIndex?: Prisma.IntWithAggregatesFilter<"IncidentChunk"> | number;
    content?: Prisma.StringWithAggregatesFilter<"IncidentChunk"> | string;
    tokens?: Prisma.IntWithAggregatesFilter<"IncidentChunk"> | number;
    machineId?: Prisma.StringNullableWithAggregatesFilter<"IncidentChunk"> | string | null;
    machineType?: Prisma.StringNullableWithAggregatesFilter<"IncidentChunk"> | string | null;
    language?: Prisma.StringNullableWithAggregatesFilter<"IncidentChunk"> | string | null;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"IncidentChunk">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"IncidentChunk"> | Date | string;
};
export type IncidentChunkUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    tokens?: Prisma.IntFieldUpdateOperationsInput | number;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutIncidentChunksNestedInput;
};
export type IncidentChunkUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    tokens?: Prisma.IntFieldUpdateOperationsInput | number;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IncidentChunkUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    tokens?: Prisma.IntFieldUpdateOperationsInput | number;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IncidentChunkUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    tokens?: Prisma.IntFieldUpdateOperationsInput | number;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IncidentChunkListRelationFilter = {
    every?: Prisma.IncidentChunkWhereInput;
    some?: Prisma.IncidentChunkWhereInput;
    none?: Prisma.IncidentChunkWhereInput;
};
export type IncidentChunkOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IncidentChunkWorkOrderIdChunkIndexCompoundUniqueInput = {
    workOrderId: string;
    chunkIndex: number;
};
export type IncidentChunkCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    chunkIndex?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    tokens?: Prisma.SortOrder;
    machineId?: Prisma.SortOrder;
    machineType?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IncidentChunkAvgOrderByAggregateInput = {
    chunkIndex?: Prisma.SortOrder;
    tokens?: Prisma.SortOrder;
};
export type IncidentChunkMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    chunkIndex?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    tokens?: Prisma.SortOrder;
    machineId?: Prisma.SortOrder;
    machineType?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IncidentChunkMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    chunkIndex?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    tokens?: Prisma.SortOrder;
    machineId?: Prisma.SortOrder;
    machineType?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type IncidentChunkSumOrderByAggregateInput = {
    chunkIndex?: Prisma.SortOrder;
    tokens?: Prisma.SortOrder;
};
export type IncidentChunkCreateNestedManyWithoutWorkOrderInput = {
    connect?: Prisma.IncidentChunkWhereUniqueInput | Prisma.IncidentChunkWhereUniqueInput[];
};
export type IncidentChunkUncheckedCreateNestedManyWithoutWorkOrderInput = {
    connect?: Prisma.IncidentChunkWhereUniqueInput | Prisma.IncidentChunkWhereUniqueInput[];
};
export type IncidentChunkUpdateManyWithoutWorkOrderNestedInput = {
    set?: Prisma.IncidentChunkWhereUniqueInput | Prisma.IncidentChunkWhereUniqueInput[];
    disconnect?: Prisma.IncidentChunkWhereUniqueInput | Prisma.IncidentChunkWhereUniqueInput[];
    delete?: Prisma.IncidentChunkWhereUniqueInput | Prisma.IncidentChunkWhereUniqueInput[];
    connect?: Prisma.IncidentChunkWhereUniqueInput | Prisma.IncidentChunkWhereUniqueInput[];
    update?: Prisma.IncidentChunkUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.IncidentChunkUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.IncidentChunkUpdateManyWithWhereWithoutWorkOrderInput | Prisma.IncidentChunkUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.IncidentChunkScalarWhereInput | Prisma.IncidentChunkScalarWhereInput[];
};
export type IncidentChunkUncheckedUpdateManyWithoutWorkOrderNestedInput = {
    set?: Prisma.IncidentChunkWhereUniqueInput | Prisma.IncidentChunkWhereUniqueInput[];
    disconnect?: Prisma.IncidentChunkWhereUniqueInput | Prisma.IncidentChunkWhereUniqueInput[];
    delete?: Prisma.IncidentChunkWhereUniqueInput | Prisma.IncidentChunkWhereUniqueInput[];
    connect?: Prisma.IncidentChunkWhereUniqueInput | Prisma.IncidentChunkWhereUniqueInput[];
    update?: Prisma.IncidentChunkUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.IncidentChunkUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.IncidentChunkUpdateManyWithWhereWithoutWorkOrderInput | Prisma.IncidentChunkUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.IncidentChunkScalarWhereInput | Prisma.IncidentChunkScalarWhereInput[];
};
export type IncidentChunkUpdateWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.IncidentChunkWhereUniqueInput;
    data: Prisma.XOR<Prisma.IncidentChunkUpdateWithoutWorkOrderInput, Prisma.IncidentChunkUncheckedUpdateWithoutWorkOrderInput>;
};
export type IncidentChunkUpdateManyWithWhereWithoutWorkOrderInput = {
    where: Prisma.IncidentChunkScalarWhereInput;
    data: Prisma.XOR<Prisma.IncidentChunkUpdateManyMutationInput, Prisma.IncidentChunkUncheckedUpdateManyWithoutWorkOrderInput>;
};
export type IncidentChunkScalarWhereInput = {
    AND?: Prisma.IncidentChunkScalarWhereInput | Prisma.IncidentChunkScalarWhereInput[];
    OR?: Prisma.IncidentChunkScalarWhereInput[];
    NOT?: Prisma.IncidentChunkScalarWhereInput | Prisma.IncidentChunkScalarWhereInput[];
    id?: Prisma.StringFilter<"IncidentChunk"> | string;
    workOrderId?: Prisma.StringFilter<"IncidentChunk"> | string;
    chunkIndex?: Prisma.IntFilter<"IncidentChunk"> | number;
    content?: Prisma.StringFilter<"IncidentChunk"> | string;
    tokens?: Prisma.IntFilter<"IncidentChunk"> | number;
    machineId?: Prisma.StringNullableFilter<"IncidentChunk"> | string | null;
    machineType?: Prisma.StringNullableFilter<"IncidentChunk"> | string | null;
    language?: Prisma.StringNullableFilter<"IncidentChunk"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"IncidentChunk">;
    createdAt?: Prisma.DateTimeFilter<"IncidentChunk"> | Date | string;
};
export type IncidentChunkUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    tokens?: Prisma.IntFieldUpdateOperationsInput | number;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IncidentChunkUncheckedUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    tokens?: Prisma.IntFieldUpdateOperationsInput | number;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IncidentChunkUncheckedUpdateManyWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    chunkIndex?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    tokens?: Prisma.IntFieldUpdateOperationsInput | number;
    machineId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    machineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IncidentChunkSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workOrderId?: boolean;
    chunkIndex?: boolean;
    content?: boolean;
    tokens?: boolean;
    machineId?: boolean;
    machineType?: boolean;
    language?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["incidentChunk"]>;
export type IncidentChunkSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workOrderId?: boolean;
    chunkIndex?: boolean;
    content?: boolean;
    tokens?: boolean;
    machineId?: boolean;
    machineType?: boolean;
    language?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["incidentChunk"]>;
export type IncidentChunkSelectScalar = {
    id?: boolean;
    workOrderId?: boolean;
    chunkIndex?: boolean;
    content?: boolean;
    tokens?: boolean;
    machineId?: boolean;
    machineType?: boolean;
    language?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
};
export type IncidentChunkOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "workOrderId" | "chunkIndex" | "content" | "tokens" | "machineId" | "machineType" | "language" | "metadata" | "createdAt", ExtArgs["result"]["incidentChunk"]>;
export type IncidentChunkInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
};
export type IncidentChunkIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
};
export type $IncidentChunkPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IncidentChunk";
    objects: {
        workOrder: Prisma.$WorkOrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        workOrderId: string;
        chunkIndex: number;
        content: string;
        tokens: number;
        machineId: string | null;
        machineType: string | null;
        language: string | null;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
    }, ExtArgs["result"]["incidentChunk"]>;
    composites: {};
};
export type IncidentChunkGetPayload<S extends boolean | null | undefined | IncidentChunkDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload, S>;
export type IncidentChunkCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IncidentChunkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IncidentChunkCountAggregateInputType | true;
};
export interface IncidentChunkDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IncidentChunk'];
        meta: {
            name: 'IncidentChunk';
        };
    };
    /**
     * Find zero or one IncidentChunk that matches the filter.
     * @param {IncidentChunkFindUniqueArgs} args - Arguments to find a IncidentChunk
     * @example
     * // Get one IncidentChunk
     * const incidentChunk = await prisma.incidentChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IncidentChunkFindUniqueArgs>(args: Prisma.SelectSubset<T, IncidentChunkFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IncidentChunkClient<runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one IncidentChunk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IncidentChunkFindUniqueOrThrowArgs} args - Arguments to find a IncidentChunk
     * @example
     * // Get one IncidentChunk
     * const incidentChunk = await prisma.incidentChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IncidentChunkFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IncidentChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IncidentChunkClient<runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first IncidentChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidentChunkFindFirstArgs} args - Arguments to find a IncidentChunk
     * @example
     * // Get one IncidentChunk
     * const incidentChunk = await prisma.incidentChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IncidentChunkFindFirstArgs>(args?: Prisma.SelectSubset<T, IncidentChunkFindFirstArgs<ExtArgs>>): Prisma.Prisma__IncidentChunkClient<runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first IncidentChunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidentChunkFindFirstOrThrowArgs} args - Arguments to find a IncidentChunk
     * @example
     * // Get one IncidentChunk
     * const incidentChunk = await prisma.incidentChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IncidentChunkFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IncidentChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IncidentChunkClient<runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more IncidentChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidentChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IncidentChunks
     * const incidentChunks = await prisma.incidentChunk.findMany()
     *
     * // Get first 10 IncidentChunks
     * const incidentChunks = await prisma.incidentChunk.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const incidentChunkWithIdOnly = await prisma.incidentChunk.findMany({ select: { id: true } })
     *
     */
    findMany<T extends IncidentChunkFindManyArgs>(args?: Prisma.SelectSubset<T, IncidentChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Delete a IncidentChunk.
     * @param {IncidentChunkDeleteArgs} args - Arguments to delete one IncidentChunk.
     * @example
     * // Delete one IncidentChunk
     * const IncidentChunk = await prisma.incidentChunk.delete({
     *   where: {
     *     // ... filter to delete one IncidentChunk
     *   }
     * })
     *
     */
    delete<T extends IncidentChunkDeleteArgs>(args: Prisma.SelectSubset<T, IncidentChunkDeleteArgs<ExtArgs>>): Prisma.Prisma__IncidentChunkClient<runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one IncidentChunk.
     * @param {IncidentChunkUpdateArgs} args - Arguments to update one IncidentChunk.
     * @example
     * // Update one IncidentChunk
     * const incidentChunk = await prisma.incidentChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends IncidentChunkUpdateArgs>(args: Prisma.SelectSubset<T, IncidentChunkUpdateArgs<ExtArgs>>): Prisma.Prisma__IncidentChunkClient<runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more IncidentChunks.
     * @param {IncidentChunkDeleteManyArgs} args - Arguments to filter IncidentChunks to delete.
     * @example
     * // Delete a few IncidentChunks
     * const { count } = await prisma.incidentChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends IncidentChunkDeleteManyArgs>(args?: Prisma.SelectSubset<T, IncidentChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more IncidentChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidentChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IncidentChunks
     * const incidentChunk = await prisma.incidentChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends IncidentChunkUpdateManyArgs>(args: Prisma.SelectSubset<T, IncidentChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more IncidentChunks and returns the data updated in the database.
     * @param {IncidentChunkUpdateManyAndReturnArgs} args - Arguments to update many IncidentChunks.
     * @example
     * // Update many IncidentChunks
     * const incidentChunk = await prisma.incidentChunk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more IncidentChunks and only return the `id`
     * const incidentChunkWithIdOnly = await prisma.incidentChunk.updateManyAndReturn({
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
    updateManyAndReturn<T extends IncidentChunkUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IncidentChunkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Count the number of IncidentChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidentChunkCountArgs} args - Arguments to filter IncidentChunks to count.
     * @example
     * // Count the number of IncidentChunks
     * const count = await prisma.incidentChunk.count({
     *   where: {
     *     // ... the filter for the IncidentChunks we want to count
     *   }
     * })
    **/
    count<T extends IncidentChunkCountArgs>(args?: Prisma.Subset<T, IncidentChunkCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IncidentChunkCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a IncidentChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidentChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IncidentChunkAggregateArgs>(args: Prisma.Subset<T, IncidentChunkAggregateArgs>): Prisma.PrismaPromise<GetIncidentChunkAggregateType<T>>;
    /**
     * Group by IncidentChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidentChunkGroupByArgs} args - Group by arguments.
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
    groupBy<T extends IncidentChunkGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IncidentChunkGroupByArgs['orderBy'];
    } : {
        orderBy?: IncidentChunkGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IncidentChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncidentChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the IncidentChunk model
     */
    readonly fields: IncidentChunkFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for IncidentChunk.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__IncidentChunkClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workOrder<T extends Prisma.WorkOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the IncidentChunk model
 */
export interface IncidentChunkFieldRefs {
    readonly id: Prisma.FieldRef<"IncidentChunk", 'String'>;
    readonly workOrderId: Prisma.FieldRef<"IncidentChunk", 'String'>;
    readonly chunkIndex: Prisma.FieldRef<"IncidentChunk", 'Int'>;
    readonly content: Prisma.FieldRef<"IncidentChunk", 'String'>;
    readonly tokens: Prisma.FieldRef<"IncidentChunk", 'Int'>;
    readonly machineId: Prisma.FieldRef<"IncidentChunk", 'String'>;
    readonly machineType: Prisma.FieldRef<"IncidentChunk", 'String'>;
    readonly language: Prisma.FieldRef<"IncidentChunk", 'String'>;
    readonly metadata: Prisma.FieldRef<"IncidentChunk", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"IncidentChunk", 'DateTime'>;
}
/**
 * IncidentChunk findUnique
 */
export type IncidentChunkFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which IncidentChunk to fetch.
     */
    where: Prisma.IncidentChunkWhereUniqueInput;
};
/**
 * IncidentChunk findUniqueOrThrow
 */
export type IncidentChunkFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which IncidentChunk to fetch.
     */
    where: Prisma.IncidentChunkWhereUniqueInput;
};
/**
 * IncidentChunk findFirst
 */
export type IncidentChunkFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which IncidentChunk to fetch.
     */
    where?: Prisma.IncidentChunkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IncidentChunks to fetch.
     */
    orderBy?: Prisma.IncidentChunkOrderByWithRelationInput | Prisma.IncidentChunkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for IncidentChunks.
     */
    cursor?: Prisma.IncidentChunkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IncidentChunks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IncidentChunks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of IncidentChunks.
     */
    distinct?: Prisma.IncidentChunkScalarFieldEnum | Prisma.IncidentChunkScalarFieldEnum[];
};
/**
 * IncidentChunk findFirstOrThrow
 */
export type IncidentChunkFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which IncidentChunk to fetch.
     */
    where?: Prisma.IncidentChunkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IncidentChunks to fetch.
     */
    orderBy?: Prisma.IncidentChunkOrderByWithRelationInput | Prisma.IncidentChunkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for IncidentChunks.
     */
    cursor?: Prisma.IncidentChunkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IncidentChunks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IncidentChunks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of IncidentChunks.
     */
    distinct?: Prisma.IncidentChunkScalarFieldEnum | Prisma.IncidentChunkScalarFieldEnum[];
};
/**
 * IncidentChunk findMany
 */
export type IncidentChunkFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which IncidentChunks to fetch.
     */
    where?: Prisma.IncidentChunkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IncidentChunks to fetch.
     */
    orderBy?: Prisma.IncidentChunkOrderByWithRelationInput | Prisma.IncidentChunkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing IncidentChunks.
     */
    cursor?: Prisma.IncidentChunkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IncidentChunks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IncidentChunks.
     */
    skip?: number;
    distinct?: Prisma.IncidentChunkScalarFieldEnum | Prisma.IncidentChunkScalarFieldEnum[];
};
/**
 * IncidentChunk update
 */
export type IncidentChunkUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a IncidentChunk.
     */
    data: Prisma.XOR<Prisma.IncidentChunkUpdateInput, Prisma.IncidentChunkUncheckedUpdateInput>;
    /**
     * Choose, which IncidentChunk to update.
     */
    where: Prisma.IncidentChunkWhereUniqueInput;
};
/**
 * IncidentChunk updateMany
 */
export type IncidentChunkUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update IncidentChunks.
     */
    data: Prisma.XOR<Prisma.IncidentChunkUpdateManyMutationInput, Prisma.IncidentChunkUncheckedUpdateManyInput>;
    /**
     * Filter which IncidentChunks to update
     */
    where?: Prisma.IncidentChunkWhereInput;
    /**
     * Limit how many IncidentChunks to update.
     */
    limit?: number;
};
/**
 * IncidentChunk updateManyAndReturn
 */
export type IncidentChunkUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncidentChunk
     */
    select?: Prisma.IncidentChunkSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the IncidentChunk
     */
    omit?: Prisma.IncidentChunkOmit<ExtArgs> | null;
    /**
     * The data used to update IncidentChunks.
     */
    data: Prisma.XOR<Prisma.IncidentChunkUpdateManyMutationInput, Prisma.IncidentChunkUncheckedUpdateManyInput>;
    /**
     * Filter which IncidentChunks to update
     */
    where?: Prisma.IncidentChunkWhereInput;
    /**
     * Limit how many IncidentChunks to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IncidentChunkIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * IncidentChunk delete
 */
export type IncidentChunkDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which IncidentChunk to delete.
     */
    where: Prisma.IncidentChunkWhereUniqueInput;
};
/**
 * IncidentChunk deleteMany
 */
export type IncidentChunkDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which IncidentChunks to delete
     */
    where?: Prisma.IncidentChunkWhereInput;
    /**
     * Limit how many IncidentChunks to delete.
     */
    limit?: number;
};
/**
 * IncidentChunk without action
 */
export type IncidentChunkDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=IncidentChunk.d.ts.map