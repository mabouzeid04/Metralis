import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Asset
 *
 */
export type AssetModel = runtime.Types.Result.DefaultSelection<Prisma.$AssetPayload>;
export type AggregateAsset = {
    _count: AssetCountAggregateOutputType | null;
    _avg: AssetAvgAggregateOutputType | null;
    _sum: AssetSumAggregateOutputType | null;
    _min: AssetMinAggregateOutputType | null;
    _max: AssetMaxAggregateOutputType | null;
};
export type AssetAvgAggregateOutputType = {
    depth: number | null;
};
export type AssetSumAggregateOutputType = {
    depth: number | null;
};
export type AssetMinAggregateOutputType = {
    id: string | null;
    parentId: string | null;
    depth: number | null;
    name: string | null;
    code: string | null;
    levelType: string | null;
    pathString: string | null;
    status: $Enums.AssetStatus | null;
    statusReason: string | null;
    criticality: $Enums.AssetCriticality | null;
    commissionedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AssetMaxAggregateOutputType = {
    id: string | null;
    parentId: string | null;
    depth: number | null;
    name: string | null;
    code: string | null;
    levelType: string | null;
    pathString: string | null;
    status: $Enums.AssetStatus | null;
    statusReason: string | null;
    criticality: $Enums.AssetCriticality | null;
    commissionedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AssetCountAggregateOutputType = {
    id: number;
    parentId: number;
    depth: number;
    name: number;
    nameTranslations: number;
    code: number;
    levelType: number;
    pathString: number;
    pathStringTranslations: number;
    status: number;
    statusReason: number;
    criticality: number;
    attributes: number;
    commissionedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AssetAvgAggregateInputType = {
    depth?: true;
};
export type AssetSumAggregateInputType = {
    depth?: true;
};
export type AssetMinAggregateInputType = {
    id?: true;
    parentId?: true;
    depth?: true;
    name?: true;
    code?: true;
    levelType?: true;
    pathString?: true;
    status?: true;
    statusReason?: true;
    criticality?: true;
    commissionedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AssetMaxAggregateInputType = {
    id?: true;
    parentId?: true;
    depth?: true;
    name?: true;
    code?: true;
    levelType?: true;
    pathString?: true;
    status?: true;
    statusReason?: true;
    criticality?: true;
    commissionedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AssetCountAggregateInputType = {
    id?: true;
    parentId?: true;
    depth?: true;
    name?: true;
    nameTranslations?: true;
    code?: true;
    levelType?: true;
    pathString?: true;
    pathStringTranslations?: true;
    status?: true;
    statusReason?: true;
    criticality?: true;
    attributes?: true;
    commissionedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AssetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Asset to aggregate.
     */
    where?: Prisma.AssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Assets to fetch.
     */
    orderBy?: Prisma.AssetOrderByWithRelationInput | Prisma.AssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Assets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Assets
    **/
    _count?: true | AssetCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: AssetAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: AssetSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AssetMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AssetMaxAggregateInputType;
};
export type GetAssetAggregateType<T extends AssetAggregateArgs> = {
    [P in keyof T & keyof AggregateAsset]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAsset[P]> : Prisma.GetScalarType<T[P], AggregateAsset[P]>;
};
export type AssetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssetWhereInput;
    orderBy?: Prisma.AssetOrderByWithAggregationInput | Prisma.AssetOrderByWithAggregationInput[];
    by: Prisma.AssetScalarFieldEnum[] | Prisma.AssetScalarFieldEnum;
    having?: Prisma.AssetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AssetCountAggregateInputType | true;
    _avg?: AssetAvgAggregateInputType;
    _sum?: AssetSumAggregateInputType;
    _min?: AssetMinAggregateInputType;
    _max?: AssetMaxAggregateInputType;
};
export type AssetGroupByOutputType = {
    id: string;
    parentId: string | null;
    depth: number;
    name: string;
    nameTranslations: runtime.JsonValue | null;
    code: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations: runtime.JsonValue | null;
    status: $Enums.AssetStatus | null;
    statusReason: string | null;
    criticality: $Enums.AssetCriticality | null;
    attributes: runtime.JsonValue | null;
    commissionedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AssetCountAggregateOutputType | null;
    _avg: AssetAvgAggregateOutputType | null;
    _sum: AssetSumAggregateOutputType | null;
    _min: AssetMinAggregateOutputType | null;
    _max: AssetMaxAggregateOutputType | null;
};
type GetAssetGroupByPayload<T extends AssetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AssetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AssetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AssetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AssetGroupByOutputType[P]>;
}>>;
export type AssetWhereInput = {
    AND?: Prisma.AssetWhereInput | Prisma.AssetWhereInput[];
    OR?: Prisma.AssetWhereInput[];
    NOT?: Prisma.AssetWhereInput | Prisma.AssetWhereInput[];
    id?: Prisma.StringFilter<"Asset"> | string;
    parentId?: Prisma.StringNullableFilter<"Asset"> | string | null;
    depth?: Prisma.IntFilter<"Asset"> | number;
    name?: Prisma.StringFilter<"Asset"> | string;
    nameTranslations?: Prisma.JsonNullableFilter<"Asset">;
    code?: Prisma.StringNullableFilter<"Asset"> | string | null;
    levelType?: Prisma.StringFilter<"Asset"> | string;
    pathString?: Prisma.StringFilter<"Asset"> | string;
    pathStringTranslations?: Prisma.JsonNullableFilter<"Asset">;
    status?: Prisma.EnumAssetStatusNullableFilter<"Asset"> | $Enums.AssetStatus | null;
    statusReason?: Prisma.StringNullableFilter<"Asset"> | string | null;
    criticality?: Prisma.EnumAssetCriticalityNullableFilter<"Asset"> | $Enums.AssetCriticality | null;
    attributes?: Prisma.JsonNullableFilter<"Asset">;
    commissionedAt?: Prisma.DateTimeNullableFilter<"Asset"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
    parent?: Prisma.XOR<Prisma.AssetNullableScalarRelationFilter, Prisma.AssetWhereInput> | null;
    children?: Prisma.AssetListRelationFilter;
    documents?: Prisma.DocumentAssetListRelationFilter;
    workOrders?: Prisma.WorkOrderListRelationFilter;
    chatConversations?: Prisma.ChatConversationListRelationFilter;
    incidentChunks?: Prisma.IncidentChunkListRelationFilter;
};
export type AssetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    depth?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTranslations?: Prisma.SortOrderInput | Prisma.SortOrder;
    code?: Prisma.SortOrderInput | Prisma.SortOrder;
    levelType?: Prisma.SortOrder;
    pathString?: Prisma.SortOrder;
    pathStringTranslations?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    statusReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    criticality?: Prisma.SortOrderInput | Prisma.SortOrder;
    attributes?: Prisma.SortOrderInput | Prisma.SortOrder;
    commissionedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    parent?: Prisma.AssetOrderByWithRelationInput;
    children?: Prisma.AssetOrderByRelationAggregateInput;
    documents?: Prisma.DocumentAssetOrderByRelationAggregateInput;
    workOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
    chatConversations?: Prisma.ChatConversationOrderByRelationAggregateInput;
    incidentChunks?: Prisma.IncidentChunkOrderByRelationAggregateInput;
};
export type AssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    parentId_name?: Prisma.AssetParentIdNameCompoundUniqueInput;
    AND?: Prisma.AssetWhereInput | Prisma.AssetWhereInput[];
    OR?: Prisma.AssetWhereInput[];
    NOT?: Prisma.AssetWhereInput | Prisma.AssetWhereInput[];
    parentId?: Prisma.StringNullableFilter<"Asset"> | string | null;
    depth?: Prisma.IntFilter<"Asset"> | number;
    name?: Prisma.StringFilter<"Asset"> | string;
    nameTranslations?: Prisma.JsonNullableFilter<"Asset">;
    code?: Prisma.StringNullableFilter<"Asset"> | string | null;
    levelType?: Prisma.StringFilter<"Asset"> | string;
    pathString?: Prisma.StringFilter<"Asset"> | string;
    pathStringTranslations?: Prisma.JsonNullableFilter<"Asset">;
    status?: Prisma.EnumAssetStatusNullableFilter<"Asset"> | $Enums.AssetStatus | null;
    statusReason?: Prisma.StringNullableFilter<"Asset"> | string | null;
    criticality?: Prisma.EnumAssetCriticalityNullableFilter<"Asset"> | $Enums.AssetCriticality | null;
    attributes?: Prisma.JsonNullableFilter<"Asset">;
    commissionedAt?: Prisma.DateTimeNullableFilter<"Asset"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
    parent?: Prisma.XOR<Prisma.AssetNullableScalarRelationFilter, Prisma.AssetWhereInput> | null;
    children?: Prisma.AssetListRelationFilter;
    documents?: Prisma.DocumentAssetListRelationFilter;
    workOrders?: Prisma.WorkOrderListRelationFilter;
    chatConversations?: Prisma.ChatConversationListRelationFilter;
    incidentChunks?: Prisma.IncidentChunkListRelationFilter;
}, "id" | "parentId_name">;
export type AssetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    depth?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTranslations?: Prisma.SortOrderInput | Prisma.SortOrder;
    code?: Prisma.SortOrderInput | Prisma.SortOrder;
    levelType?: Prisma.SortOrder;
    pathString?: Prisma.SortOrder;
    pathStringTranslations?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    statusReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    criticality?: Prisma.SortOrderInput | Prisma.SortOrder;
    attributes?: Prisma.SortOrderInput | Prisma.SortOrder;
    commissionedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AssetCountOrderByAggregateInput;
    _avg?: Prisma.AssetAvgOrderByAggregateInput;
    _max?: Prisma.AssetMaxOrderByAggregateInput;
    _min?: Prisma.AssetMinOrderByAggregateInput;
    _sum?: Prisma.AssetSumOrderByAggregateInput;
};
export type AssetScalarWhereWithAggregatesInput = {
    AND?: Prisma.AssetScalarWhereWithAggregatesInput | Prisma.AssetScalarWhereWithAggregatesInput[];
    OR?: Prisma.AssetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AssetScalarWhereWithAggregatesInput | Prisma.AssetScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Asset"> | string;
    parentId?: Prisma.StringNullableWithAggregatesFilter<"Asset"> | string | null;
    depth?: Prisma.IntWithAggregatesFilter<"Asset"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Asset"> | string;
    nameTranslations?: Prisma.JsonNullableWithAggregatesFilter<"Asset">;
    code?: Prisma.StringNullableWithAggregatesFilter<"Asset"> | string | null;
    levelType?: Prisma.StringWithAggregatesFilter<"Asset"> | string;
    pathString?: Prisma.StringWithAggregatesFilter<"Asset"> | string;
    pathStringTranslations?: Prisma.JsonNullableWithAggregatesFilter<"Asset">;
    status?: Prisma.EnumAssetStatusNullableWithAggregatesFilter<"Asset"> | $Enums.AssetStatus | null;
    statusReason?: Prisma.StringNullableWithAggregatesFilter<"Asset"> | string | null;
    criticality?: Prisma.EnumAssetCriticalityNullableWithAggregatesFilter<"Asset"> | $Enums.AssetCriticality | null;
    attributes?: Prisma.JsonNullableWithAggregatesFilter<"Asset">;
    commissionedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Asset"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Asset"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Asset"> | Date | string;
};
export type AssetCreateInput = {
    id?: string;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    parent?: Prisma.AssetCreateNestedOneWithoutChildrenInput;
    children?: Prisma.AssetCreateNestedManyWithoutParentInput;
    documents?: Prisma.DocumentAssetCreateNestedManyWithoutAssetInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateInput = {
    id?: string;
    parentId?: string | null;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: Prisma.AssetUncheckedCreateNestedManyWithoutParentInput;
    documents?: Prisma.DocumentAssetUncheckedCreateNestedManyWithoutAssetInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.AssetUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.AssetUpdateManyWithoutParentNestedInput;
    documents?: Prisma.DocumentAssetUpdateManyWithoutAssetNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.AssetUncheckedUpdateManyWithoutParentNestedInput;
    documents?: Prisma.DocumentAssetUncheckedUpdateManyWithoutAssetNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetCreateManyInput = {
    id?: string;
    parentId?: string | null;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssetUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetNullableScalarRelationFilter = {
    is?: Prisma.AssetWhereInput | null;
    isNot?: Prisma.AssetWhereInput | null;
};
export type AssetListRelationFilter = {
    every?: Prisma.AssetWhereInput;
    some?: Prisma.AssetWhereInput;
    none?: Prisma.AssetWhereInput;
};
export type AssetOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AssetParentIdNameCompoundUniqueInput = {
    parentId: string;
    name: string;
};
export type AssetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    depth?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    nameTranslations?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    levelType?: Prisma.SortOrder;
    pathString?: Prisma.SortOrder;
    pathStringTranslations?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    statusReason?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    attributes?: Prisma.SortOrder;
    commissionedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssetAvgOrderByAggregateInput = {
    depth?: Prisma.SortOrder;
};
export type AssetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    depth?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    levelType?: Prisma.SortOrder;
    pathString?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    statusReason?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    commissionedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    depth?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    levelType?: Prisma.SortOrder;
    pathString?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    statusReason?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    commissionedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssetSumOrderByAggregateInput = {
    depth?: Prisma.SortOrder;
};
export type AssetScalarRelationFilter = {
    is?: Prisma.AssetWhereInput;
    isNot?: Prisma.AssetWhereInput;
};
export type AssetCreateNestedOneWithoutChildrenInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutChildrenInput, Prisma.AssetUncheckedCreateWithoutChildrenInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutChildrenInput;
    connect?: Prisma.AssetWhereUniqueInput;
};
export type AssetCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutParentInput, Prisma.AssetUncheckedCreateWithoutParentInput> | Prisma.AssetCreateWithoutParentInput[] | Prisma.AssetUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutParentInput | Prisma.AssetCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.AssetCreateManyParentInputEnvelope;
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
};
export type AssetUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutParentInput, Prisma.AssetUncheckedCreateWithoutParentInput> | Prisma.AssetCreateWithoutParentInput[] | Prisma.AssetUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutParentInput | Prisma.AssetCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.AssetCreateManyParentInputEnvelope;
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
};
export type NullableEnumAssetStatusFieldUpdateOperationsInput = {
    set?: $Enums.AssetStatus | null;
};
export type NullableEnumAssetCriticalityFieldUpdateOperationsInput = {
    set?: $Enums.AssetCriticality | null;
};
export type AssetUpdateOneWithoutChildrenNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutChildrenInput, Prisma.AssetUncheckedCreateWithoutChildrenInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutChildrenInput;
    upsert?: Prisma.AssetUpsertWithoutChildrenInput;
    disconnect?: Prisma.AssetWhereInput | boolean;
    delete?: Prisma.AssetWhereInput | boolean;
    connect?: Prisma.AssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AssetUpdateToOneWithWhereWithoutChildrenInput, Prisma.AssetUpdateWithoutChildrenInput>, Prisma.AssetUncheckedUpdateWithoutChildrenInput>;
};
export type AssetUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutParentInput, Prisma.AssetUncheckedCreateWithoutParentInput> | Prisma.AssetCreateWithoutParentInput[] | Prisma.AssetUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutParentInput | Prisma.AssetCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.AssetUpsertWithWhereUniqueWithoutParentInput | Prisma.AssetUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.AssetCreateManyParentInputEnvelope;
    set?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    disconnect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    delete?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    update?: Prisma.AssetUpdateWithWhereUniqueWithoutParentInput | Prisma.AssetUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.AssetUpdateManyWithWhereWithoutParentInput | Prisma.AssetUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
};
export type AssetUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutParentInput, Prisma.AssetUncheckedCreateWithoutParentInput> | Prisma.AssetCreateWithoutParentInput[] | Prisma.AssetUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutParentInput | Prisma.AssetCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.AssetUpsertWithWhereUniqueWithoutParentInput | Prisma.AssetUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.AssetCreateManyParentInputEnvelope;
    set?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    disconnect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    delete?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    update?: Prisma.AssetUpdateWithWhereUniqueWithoutParentInput | Prisma.AssetUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.AssetUpdateManyWithWhereWithoutParentInput | Prisma.AssetUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
};
export type AssetCreateNestedOneWithoutDocumentsInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutDocumentsInput, Prisma.AssetUncheckedCreateWithoutDocumentsInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutDocumentsInput;
    connect?: Prisma.AssetWhereUniqueInput;
};
export type AssetUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutDocumentsInput, Prisma.AssetUncheckedCreateWithoutDocumentsInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutDocumentsInput;
    upsert?: Prisma.AssetUpsertWithoutDocumentsInput;
    connect?: Prisma.AssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AssetUpdateToOneWithWhereWithoutDocumentsInput, Prisma.AssetUpdateWithoutDocumentsInput>, Prisma.AssetUncheckedUpdateWithoutDocumentsInput>;
};
export type AssetCreateNestedOneWithoutWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutWorkOrdersInput, Prisma.AssetUncheckedCreateWithoutWorkOrdersInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutWorkOrdersInput;
    connect?: Prisma.AssetWhereUniqueInput;
};
export type AssetUpdateOneWithoutWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutWorkOrdersInput, Prisma.AssetUncheckedCreateWithoutWorkOrdersInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutWorkOrdersInput;
    upsert?: Prisma.AssetUpsertWithoutWorkOrdersInput;
    disconnect?: Prisma.AssetWhereInput | boolean;
    delete?: Prisma.AssetWhereInput | boolean;
    connect?: Prisma.AssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AssetUpdateToOneWithWhereWithoutWorkOrdersInput, Prisma.AssetUpdateWithoutWorkOrdersInput>, Prisma.AssetUncheckedUpdateWithoutWorkOrdersInput>;
};
export type AssetUpdateOneWithoutIncidentChunksNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutIncidentChunksInput, Prisma.AssetUncheckedCreateWithoutIncidentChunksInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutIncidentChunksInput;
    upsert?: Prisma.AssetUpsertWithoutIncidentChunksInput;
    disconnect?: Prisma.AssetWhereInput | boolean;
    delete?: Prisma.AssetWhereInput | boolean;
    connect?: Prisma.AssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AssetUpdateToOneWithWhereWithoutIncidentChunksInput, Prisma.AssetUpdateWithoutIncidentChunksInput>, Prisma.AssetUncheckedUpdateWithoutIncidentChunksInput>;
};
export type AssetCreateNestedOneWithoutChatConversationsInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutChatConversationsInput, Prisma.AssetUncheckedCreateWithoutChatConversationsInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutChatConversationsInput;
    connect?: Prisma.AssetWhereUniqueInput;
};
export type AssetUpdateOneWithoutChatConversationsNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutChatConversationsInput, Prisma.AssetUncheckedCreateWithoutChatConversationsInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutChatConversationsInput;
    upsert?: Prisma.AssetUpsertWithoutChatConversationsInput;
    disconnect?: Prisma.AssetWhereInput | boolean;
    delete?: Prisma.AssetWhereInput | boolean;
    connect?: Prisma.AssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AssetUpdateToOneWithWhereWithoutChatConversationsInput, Prisma.AssetUpdateWithoutChatConversationsInput>, Prisma.AssetUncheckedUpdateWithoutChatConversationsInput>;
};
export type AssetCreateWithoutChildrenInput = {
    id?: string;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    parent?: Prisma.AssetCreateNestedOneWithoutChildrenInput;
    documents?: Prisma.DocumentAssetCreateNestedManyWithoutAssetInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateWithoutChildrenInput = {
    id?: string;
    parentId?: string | null;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    documents?: Prisma.DocumentAssetUncheckedCreateNestedManyWithoutAssetInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetCreateOrConnectWithoutChildrenInput = {
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateWithoutChildrenInput, Prisma.AssetUncheckedCreateWithoutChildrenInput>;
};
export type AssetCreateWithoutParentInput = {
    id?: string;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: Prisma.AssetCreateNestedManyWithoutParentInput;
    documents?: Prisma.DocumentAssetCreateNestedManyWithoutAssetInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateWithoutParentInput = {
    id?: string;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: Prisma.AssetUncheckedCreateNestedManyWithoutParentInput;
    documents?: Prisma.DocumentAssetUncheckedCreateNestedManyWithoutAssetInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetCreateOrConnectWithoutParentInput = {
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateWithoutParentInput, Prisma.AssetUncheckedCreateWithoutParentInput>;
};
export type AssetCreateManyParentInputEnvelope = {
    data: Prisma.AssetCreateManyParentInput | Prisma.AssetCreateManyParentInput[];
    skipDuplicates?: boolean;
};
export type AssetUpsertWithoutChildrenInput = {
    update: Prisma.XOR<Prisma.AssetUpdateWithoutChildrenInput, Prisma.AssetUncheckedUpdateWithoutChildrenInput>;
    create: Prisma.XOR<Prisma.AssetCreateWithoutChildrenInput, Prisma.AssetUncheckedCreateWithoutChildrenInput>;
    where?: Prisma.AssetWhereInput;
};
export type AssetUpdateToOneWithWhereWithoutChildrenInput = {
    where?: Prisma.AssetWhereInput;
    data: Prisma.XOR<Prisma.AssetUpdateWithoutChildrenInput, Prisma.AssetUncheckedUpdateWithoutChildrenInput>;
};
export type AssetUpdateWithoutChildrenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.AssetUpdateOneWithoutChildrenNestedInput;
    documents?: Prisma.DocumentAssetUpdateManyWithoutAssetNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateWithoutChildrenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documents?: Prisma.DocumentAssetUncheckedUpdateManyWithoutAssetNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.AssetWhereUniqueInput;
    update: Prisma.XOR<Prisma.AssetUpdateWithoutParentInput, Prisma.AssetUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.AssetCreateWithoutParentInput, Prisma.AssetUncheckedCreateWithoutParentInput>;
};
export type AssetUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.AssetWhereUniqueInput;
    data: Prisma.XOR<Prisma.AssetUpdateWithoutParentInput, Prisma.AssetUncheckedUpdateWithoutParentInput>;
};
export type AssetUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.AssetScalarWhereInput;
    data: Prisma.XOR<Prisma.AssetUpdateManyMutationInput, Prisma.AssetUncheckedUpdateManyWithoutParentInput>;
};
export type AssetScalarWhereInput = {
    AND?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
    OR?: Prisma.AssetScalarWhereInput[];
    NOT?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
    id?: Prisma.StringFilter<"Asset"> | string;
    parentId?: Prisma.StringNullableFilter<"Asset"> | string | null;
    depth?: Prisma.IntFilter<"Asset"> | number;
    name?: Prisma.StringFilter<"Asset"> | string;
    nameTranslations?: Prisma.JsonNullableFilter<"Asset">;
    code?: Prisma.StringNullableFilter<"Asset"> | string | null;
    levelType?: Prisma.StringFilter<"Asset"> | string;
    pathString?: Prisma.StringFilter<"Asset"> | string;
    pathStringTranslations?: Prisma.JsonNullableFilter<"Asset">;
    status?: Prisma.EnumAssetStatusNullableFilter<"Asset"> | $Enums.AssetStatus | null;
    statusReason?: Prisma.StringNullableFilter<"Asset"> | string | null;
    criticality?: Prisma.EnumAssetCriticalityNullableFilter<"Asset"> | $Enums.AssetCriticality | null;
    attributes?: Prisma.JsonNullableFilter<"Asset">;
    commissionedAt?: Prisma.DateTimeNullableFilter<"Asset"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
};
export type AssetCreateWithoutDocumentsInput = {
    id?: string;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    parent?: Prisma.AssetCreateNestedOneWithoutChildrenInput;
    children?: Prisma.AssetCreateNestedManyWithoutParentInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateWithoutDocumentsInput = {
    id?: string;
    parentId?: string | null;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: Prisma.AssetUncheckedCreateNestedManyWithoutParentInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetCreateOrConnectWithoutDocumentsInput = {
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateWithoutDocumentsInput, Prisma.AssetUncheckedCreateWithoutDocumentsInput>;
};
export type AssetUpsertWithoutDocumentsInput = {
    update: Prisma.XOR<Prisma.AssetUpdateWithoutDocumentsInput, Prisma.AssetUncheckedUpdateWithoutDocumentsInput>;
    create: Prisma.XOR<Prisma.AssetCreateWithoutDocumentsInput, Prisma.AssetUncheckedCreateWithoutDocumentsInput>;
    where?: Prisma.AssetWhereInput;
};
export type AssetUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: Prisma.AssetWhereInput;
    data: Prisma.XOR<Prisma.AssetUpdateWithoutDocumentsInput, Prisma.AssetUncheckedUpdateWithoutDocumentsInput>;
};
export type AssetUpdateWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.AssetUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.AssetUpdateManyWithoutParentNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.AssetUncheckedUpdateManyWithoutParentNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetCreateWithoutWorkOrdersInput = {
    id?: string;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    parent?: Prisma.AssetCreateNestedOneWithoutChildrenInput;
    children?: Prisma.AssetCreateNestedManyWithoutParentInput;
    documents?: Prisma.DocumentAssetCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateWithoutWorkOrdersInput = {
    id?: string;
    parentId?: string | null;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: Prisma.AssetUncheckedCreateNestedManyWithoutParentInput;
    documents?: Prisma.DocumentAssetUncheckedCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetCreateOrConnectWithoutWorkOrdersInput = {
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateWithoutWorkOrdersInput, Prisma.AssetUncheckedCreateWithoutWorkOrdersInput>;
};
export type AssetUpsertWithoutWorkOrdersInput = {
    update: Prisma.XOR<Prisma.AssetUpdateWithoutWorkOrdersInput, Prisma.AssetUncheckedUpdateWithoutWorkOrdersInput>;
    create: Prisma.XOR<Prisma.AssetCreateWithoutWorkOrdersInput, Prisma.AssetUncheckedCreateWithoutWorkOrdersInput>;
    where?: Prisma.AssetWhereInput;
};
export type AssetUpdateToOneWithWhereWithoutWorkOrdersInput = {
    where?: Prisma.AssetWhereInput;
    data: Prisma.XOR<Prisma.AssetUpdateWithoutWorkOrdersInput, Prisma.AssetUncheckedUpdateWithoutWorkOrdersInput>;
};
export type AssetUpdateWithoutWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.AssetUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.AssetUpdateManyWithoutParentNestedInput;
    documents?: Prisma.DocumentAssetUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateWithoutWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.AssetUncheckedUpdateManyWithoutParentNestedInput;
    documents?: Prisma.DocumentAssetUncheckedUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetCreateWithoutIncidentChunksInput = {
    id?: string;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    parent?: Prisma.AssetCreateNestedOneWithoutChildrenInput;
    children?: Prisma.AssetCreateNestedManyWithoutParentInput;
    documents?: Prisma.DocumentAssetCreateNestedManyWithoutAssetInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateWithoutIncidentChunksInput = {
    id?: string;
    parentId?: string | null;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: Prisma.AssetUncheckedCreateNestedManyWithoutParentInput;
    documents?: Prisma.DocumentAssetUncheckedCreateNestedManyWithoutAssetInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssetInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetCreateOrConnectWithoutIncidentChunksInput = {
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateWithoutIncidentChunksInput, Prisma.AssetUncheckedCreateWithoutIncidentChunksInput>;
};
export type AssetUpsertWithoutIncidentChunksInput = {
    update: Prisma.XOR<Prisma.AssetUpdateWithoutIncidentChunksInput, Prisma.AssetUncheckedUpdateWithoutIncidentChunksInput>;
    create: Prisma.XOR<Prisma.AssetCreateWithoutIncidentChunksInput, Prisma.AssetUncheckedCreateWithoutIncidentChunksInput>;
    where?: Prisma.AssetWhereInput;
};
export type AssetUpdateToOneWithWhereWithoutIncidentChunksInput = {
    where?: Prisma.AssetWhereInput;
    data: Prisma.XOR<Prisma.AssetUpdateWithoutIncidentChunksInput, Prisma.AssetUncheckedUpdateWithoutIncidentChunksInput>;
};
export type AssetUpdateWithoutIncidentChunksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.AssetUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.AssetUpdateManyWithoutParentNestedInput;
    documents?: Prisma.DocumentAssetUpdateManyWithoutAssetNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateWithoutIncidentChunksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.AssetUncheckedUpdateManyWithoutParentNestedInput;
    documents?: Prisma.DocumentAssetUncheckedUpdateManyWithoutAssetNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetCreateWithoutChatConversationsInput = {
    id?: string;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    parent?: Prisma.AssetCreateNestedOneWithoutChildrenInput;
    children?: Prisma.AssetCreateNestedManyWithoutParentInput;
    documents?: Prisma.DocumentAssetCreateNestedManyWithoutAssetInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateWithoutChatConversationsInput = {
    id?: string;
    parentId?: string | null;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    children?: Prisma.AssetUncheckedCreateNestedManyWithoutParentInput;
    documents?: Prisma.DocumentAssetUncheckedCreateNestedManyWithoutAssetInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssetInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetCreateOrConnectWithoutChatConversationsInput = {
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateWithoutChatConversationsInput, Prisma.AssetUncheckedCreateWithoutChatConversationsInput>;
};
export type AssetUpsertWithoutChatConversationsInput = {
    update: Prisma.XOR<Prisma.AssetUpdateWithoutChatConversationsInput, Prisma.AssetUncheckedUpdateWithoutChatConversationsInput>;
    create: Prisma.XOR<Prisma.AssetCreateWithoutChatConversationsInput, Prisma.AssetUncheckedCreateWithoutChatConversationsInput>;
    where?: Prisma.AssetWhereInput;
};
export type AssetUpdateToOneWithWhereWithoutChatConversationsInput = {
    where?: Prisma.AssetWhereInput;
    data: Prisma.XOR<Prisma.AssetUpdateWithoutChatConversationsInput, Prisma.AssetUncheckedUpdateWithoutChatConversationsInput>;
};
export type AssetUpdateWithoutChatConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parent?: Prisma.AssetUpdateOneWithoutChildrenNestedInput;
    children?: Prisma.AssetUpdateManyWithoutParentNestedInput;
    documents?: Prisma.DocumentAssetUpdateManyWithoutAssetNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateWithoutChatConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.AssetUncheckedUpdateManyWithoutParentNestedInput;
    documents?: Prisma.DocumentAssetUncheckedUpdateManyWithoutAssetNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetCreateManyParentInput = {
    id?: string;
    depth?: number;
    name: string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: string | null;
    levelType: string;
    pathString: string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: $Enums.AssetStatus | null;
    statusReason?: string | null;
    criticality?: $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssetUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.AssetUpdateManyWithoutParentNestedInput;
    documents?: Prisma.DocumentAssetUpdateManyWithoutAssetNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    children?: Prisma.AssetUncheckedUpdateManyWithoutParentNestedInput;
    documents?: Prisma.DocumentAssetUncheckedUpdateManyWithoutAssetNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssetNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutAssetNestedInput;
    incidentChunks?: Prisma.IncidentChunkUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    depth?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    nameTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    levelType?: Prisma.StringFieldUpdateOperationsInput | string;
    pathString?: Prisma.StringFieldUpdateOperationsInput | string;
    pathStringTranslations?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    status?: Prisma.NullableEnumAssetStatusFieldUpdateOperationsInput | $Enums.AssetStatus | null;
    statusReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    criticality?: Prisma.NullableEnumAssetCriticalityFieldUpdateOperationsInput | $Enums.AssetCriticality | null;
    attributes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commissionedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type AssetCountOutputType
 */
export type AssetCountOutputType = {
    children: number;
    documents: number;
    workOrders: number;
    chatConversations: number;
    incidentChunks: number;
};
export type AssetCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    children?: boolean | AssetCountOutputTypeCountChildrenArgs;
    documents?: boolean | AssetCountOutputTypeCountDocumentsArgs;
    workOrders?: boolean | AssetCountOutputTypeCountWorkOrdersArgs;
    chatConversations?: boolean | AssetCountOutputTypeCountChatConversationsArgs;
    incidentChunks?: boolean | AssetCountOutputTypeCountIncidentChunksArgs;
};
/**
 * AssetCountOutputType without action
 */
export type AssetCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetCountOutputType
     */
    select?: Prisma.AssetCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * AssetCountOutputType without action
 */
export type AssetCountOutputTypeCountChildrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssetWhereInput;
};
/**
 * AssetCountOutputType without action
 */
export type AssetCountOutputTypeCountDocumentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentAssetWhereInput;
};
/**
 * AssetCountOutputType without action
 */
export type AssetCountOutputTypeCountWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
/**
 * AssetCountOutputType without action
 */
export type AssetCountOutputTypeCountChatConversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatConversationWhereInput;
};
/**
 * AssetCountOutputType without action
 */
export type AssetCountOutputTypeCountIncidentChunksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IncidentChunkWhereInput;
};
export type AssetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    depth?: boolean;
    name?: boolean;
    nameTranslations?: boolean;
    code?: boolean;
    levelType?: boolean;
    pathString?: boolean;
    pathStringTranslations?: boolean;
    status?: boolean;
    statusReason?: boolean;
    criticality?: boolean;
    attributes?: boolean;
    commissionedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    parent?: boolean | Prisma.Asset$parentArgs<ExtArgs>;
    children?: boolean | Prisma.Asset$childrenArgs<ExtArgs>;
    documents?: boolean | Prisma.Asset$documentsArgs<ExtArgs>;
    workOrders?: boolean | Prisma.Asset$workOrdersArgs<ExtArgs>;
    chatConversations?: boolean | Prisma.Asset$chatConversationsArgs<ExtArgs>;
    incidentChunks?: boolean | Prisma.Asset$incidentChunksArgs<ExtArgs>;
    _count?: boolean | Prisma.AssetCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["asset"]>;
export type AssetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    depth?: boolean;
    name?: boolean;
    nameTranslations?: boolean;
    code?: boolean;
    levelType?: boolean;
    pathString?: boolean;
    pathStringTranslations?: boolean;
    status?: boolean;
    statusReason?: boolean;
    criticality?: boolean;
    attributes?: boolean;
    commissionedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    parent?: boolean | Prisma.Asset$parentArgs<ExtArgs>;
}, ExtArgs["result"]["asset"]>;
export type AssetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    depth?: boolean;
    name?: boolean;
    nameTranslations?: boolean;
    code?: boolean;
    levelType?: boolean;
    pathString?: boolean;
    pathStringTranslations?: boolean;
    status?: boolean;
    statusReason?: boolean;
    criticality?: boolean;
    attributes?: boolean;
    commissionedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    parent?: boolean | Prisma.Asset$parentArgs<ExtArgs>;
}, ExtArgs["result"]["asset"]>;
export type AssetSelectScalar = {
    id?: boolean;
    parentId?: boolean;
    depth?: boolean;
    name?: boolean;
    nameTranslations?: boolean;
    code?: boolean;
    levelType?: boolean;
    pathString?: boolean;
    pathStringTranslations?: boolean;
    status?: boolean;
    statusReason?: boolean;
    criticality?: boolean;
    attributes?: boolean;
    commissionedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AssetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "parentId" | "depth" | "name" | "nameTranslations" | "code" | "levelType" | "pathString" | "pathStringTranslations" | "status" | "statusReason" | "criticality" | "attributes" | "commissionedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["asset"]>;
export type AssetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.Asset$parentArgs<ExtArgs>;
    children?: boolean | Prisma.Asset$childrenArgs<ExtArgs>;
    documents?: boolean | Prisma.Asset$documentsArgs<ExtArgs>;
    workOrders?: boolean | Prisma.Asset$workOrdersArgs<ExtArgs>;
    chatConversations?: boolean | Prisma.Asset$chatConversationsArgs<ExtArgs>;
    incidentChunks?: boolean | Prisma.Asset$incidentChunksArgs<ExtArgs>;
    _count?: boolean | Prisma.AssetCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AssetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.Asset$parentArgs<ExtArgs>;
};
export type AssetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.Asset$parentArgs<ExtArgs>;
};
export type $AssetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Asset";
    objects: {
        parent: Prisma.$AssetPayload<ExtArgs> | null;
        children: Prisma.$AssetPayload<ExtArgs>[];
        documents: Prisma.$DocumentAssetPayload<ExtArgs>[];
        workOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
        chatConversations: Prisma.$ChatConversationPayload<ExtArgs>[];
        incidentChunks: Prisma.$IncidentChunkPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        parentId: string | null;
        depth: number;
        name: string;
        nameTranslations: runtime.JsonValue | null;
        code: string | null;
        levelType: string;
        pathString: string;
        pathStringTranslations: runtime.JsonValue | null;
        status: $Enums.AssetStatus | null;
        statusReason: string | null;
        criticality: $Enums.AssetCriticality | null;
        attributes: runtime.JsonValue | null;
        commissionedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["asset"]>;
    composites: {};
};
export type AssetGetPayload<S extends boolean | null | undefined | AssetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AssetPayload, S>;
export type AssetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AssetCountAggregateInputType | true;
};
export interface AssetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Asset'];
        meta: {
            name: 'Asset';
        };
    };
    /**
     * Find zero or one Asset that matches the filter.
     * @param {AssetFindUniqueArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetFindUniqueArgs>(args: Prisma.SelectSubset<T, AssetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Asset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssetFindUniqueOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Asset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetFindFirstArgs>(args?: Prisma.SelectSubset<T, AssetFindFirstArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Asset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AssetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Assets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assets
     * const assets = await prisma.asset.findMany()
     *
     * // Get first 10 Assets
     * const assets = await prisma.asset.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const assetWithIdOnly = await prisma.asset.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AssetFindManyArgs>(args?: Prisma.SelectSubset<T, AssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Asset.
     * @param {AssetCreateArgs} args - Arguments to create a Asset.
     * @example
     * // Create one Asset
     * const Asset = await prisma.asset.create({
     *   data: {
     *     // ... data to create a Asset
     *   }
     * })
     *
     */
    create<T extends AssetCreateArgs>(args: Prisma.SelectSubset<T, AssetCreateArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Assets.
     * @param {AssetCreateManyArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AssetCreateManyArgs>(args?: Prisma.SelectSubset<T, AssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Assets and returns the data saved in the database.
     * @param {AssetCreateManyAndReturnArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Assets and only return the `id`
     * const assetWithIdOnly = await prisma.asset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AssetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Asset.
     * @param {AssetDeleteArgs} args - Arguments to delete one Asset.
     * @example
     * // Delete one Asset
     * const Asset = await prisma.asset.delete({
     *   where: {
     *     // ... filter to delete one Asset
     *   }
     * })
     *
     */
    delete<T extends AssetDeleteArgs>(args: Prisma.SelectSubset<T, AssetDeleteArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Asset.
     * @param {AssetUpdateArgs} args - Arguments to update one Asset.
     * @example
     * // Update one Asset
     * const asset = await prisma.asset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AssetUpdateArgs>(args: Prisma.SelectSubset<T, AssetUpdateArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Assets.
     * @param {AssetDeleteManyArgs} args - Arguments to filter Assets to delete.
     * @example
     * // Delete a few Assets
     * const { count } = await prisma.asset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AssetDeleteManyArgs>(args?: Prisma.SelectSubset<T, AssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assets
     * const asset = await prisma.asset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AssetUpdateManyArgs>(args: Prisma.SelectSubset<T, AssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Assets and returns the data updated in the database.
     * @param {AssetUpdateManyAndReturnArgs} args - Arguments to update many Assets.
     * @example
     * // Update many Assets
     * const asset = await prisma.asset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Assets and only return the `id`
     * const assetWithIdOnly = await prisma.asset.updateManyAndReturn({
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
    updateManyAndReturn<T extends AssetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Asset.
     * @param {AssetUpsertArgs} args - Arguments to update or create a Asset.
     * @example
     * // Update or create a Asset
     * const asset = await prisma.asset.upsert({
     *   create: {
     *     // ... data to create a Asset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asset we want to update
     *   }
     * })
     */
    upsert<T extends AssetUpsertArgs>(args: Prisma.SelectSubset<T, AssetUpsertArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCountArgs} args - Arguments to filter Assets to count.
     * @example
     * // Count the number of Assets
     * const count = await prisma.asset.count({
     *   where: {
     *     // ... the filter for the Assets we want to count
     *   }
     * })
    **/
    count<T extends AssetCountArgs>(args?: Prisma.Subset<T, AssetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AssetCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssetAggregateArgs>(args: Prisma.Subset<T, AssetAggregateArgs>): Prisma.PrismaPromise<GetAssetAggregateType<T>>;
    /**
     * Group by Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetGroupByArgs} args - Group by arguments.
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
    groupBy<T extends AssetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AssetGroupByArgs['orderBy'];
    } : {
        orderBy?: AssetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Asset model
     */
    readonly fields: AssetFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Asset.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AssetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    parent<T extends Prisma.Asset$parentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Asset$parentArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    children<T extends Prisma.Asset$childrenArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Asset$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    documents<T extends Prisma.Asset$documentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Asset$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    workOrders<T extends Prisma.Asset$workOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Asset$workOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    chatConversations<T extends Prisma.Asset$chatConversationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Asset$chatConversationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    incidentChunks<T extends Prisma.Asset$incidentChunksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Asset$incidentChunksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IncidentChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Asset model
 */
export interface AssetFieldRefs {
    readonly id: Prisma.FieldRef<"Asset", 'String'>;
    readonly parentId: Prisma.FieldRef<"Asset", 'String'>;
    readonly depth: Prisma.FieldRef<"Asset", 'Int'>;
    readonly name: Prisma.FieldRef<"Asset", 'String'>;
    readonly nameTranslations: Prisma.FieldRef<"Asset", 'Json'>;
    readonly code: Prisma.FieldRef<"Asset", 'String'>;
    readonly levelType: Prisma.FieldRef<"Asset", 'String'>;
    readonly pathString: Prisma.FieldRef<"Asset", 'String'>;
    readonly pathStringTranslations: Prisma.FieldRef<"Asset", 'Json'>;
    readonly status: Prisma.FieldRef<"Asset", 'AssetStatus'>;
    readonly statusReason: Prisma.FieldRef<"Asset", 'String'>;
    readonly criticality: Prisma.FieldRef<"Asset", 'AssetCriticality'>;
    readonly attributes: Prisma.FieldRef<"Asset", 'Json'>;
    readonly commissionedAt: Prisma.FieldRef<"Asset", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Asset", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Asset", 'DateTime'>;
}
/**
 * Asset findUnique
 */
export type AssetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Asset to fetch.
     */
    where: Prisma.AssetWhereUniqueInput;
};
/**
 * Asset findUniqueOrThrow
 */
export type AssetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Asset to fetch.
     */
    where: Prisma.AssetWhereUniqueInput;
};
/**
 * Asset findFirst
 */
export type AssetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Asset to fetch.
     */
    where?: Prisma.AssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Assets to fetch.
     */
    orderBy?: Prisma.AssetOrderByWithRelationInput | Prisma.AssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Assets.
     */
    cursor?: Prisma.AssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Assets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Assets.
     */
    distinct?: Prisma.AssetScalarFieldEnum | Prisma.AssetScalarFieldEnum[];
};
/**
 * Asset findFirstOrThrow
 */
export type AssetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Asset to fetch.
     */
    where?: Prisma.AssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Assets to fetch.
     */
    orderBy?: Prisma.AssetOrderByWithRelationInput | Prisma.AssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Assets.
     */
    cursor?: Prisma.AssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Assets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Assets.
     */
    distinct?: Prisma.AssetScalarFieldEnum | Prisma.AssetScalarFieldEnum[];
};
/**
 * Asset findMany
 */
export type AssetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Assets to fetch.
     */
    where?: Prisma.AssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Assets to fetch.
     */
    orderBy?: Prisma.AssetOrderByWithRelationInput | Prisma.AssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Assets.
     */
    cursor?: Prisma.AssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Assets.
     */
    skip?: number;
    distinct?: Prisma.AssetScalarFieldEnum | Prisma.AssetScalarFieldEnum[];
};
/**
 * Asset create
 */
export type AssetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Asset.
     */
    data: Prisma.XOR<Prisma.AssetCreateInput, Prisma.AssetUncheckedCreateInput>;
};
/**
 * Asset createMany
 */
export type AssetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assets.
     */
    data: Prisma.AssetCreateManyInput | Prisma.AssetCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Asset createManyAndReturn
 */
export type AssetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: Prisma.AssetSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Asset
     */
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    /**
     * The data used to create many Assets.
     */
    data: Prisma.AssetCreateManyInput | Prisma.AssetCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssetIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Asset update
 */
export type AssetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Asset.
     */
    data: Prisma.XOR<Prisma.AssetUpdateInput, Prisma.AssetUncheckedUpdateInput>;
    /**
     * Choose, which Asset to update.
     */
    where: Prisma.AssetWhereUniqueInput;
};
/**
 * Asset updateMany
 */
export type AssetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Assets.
     */
    data: Prisma.XOR<Prisma.AssetUpdateManyMutationInput, Prisma.AssetUncheckedUpdateManyInput>;
    /**
     * Filter which Assets to update
     */
    where?: Prisma.AssetWhereInput;
    /**
     * Limit how many Assets to update.
     */
    limit?: number;
};
/**
 * Asset updateManyAndReturn
 */
export type AssetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: Prisma.AssetSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Asset
     */
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    /**
     * The data used to update Assets.
     */
    data: Prisma.XOR<Prisma.AssetUpdateManyMutationInput, Prisma.AssetUncheckedUpdateManyInput>;
    /**
     * Filter which Assets to update
     */
    where?: Prisma.AssetWhereInput;
    /**
     * Limit how many Assets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Asset upsert
 */
export type AssetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Asset to update in case it exists.
     */
    where: Prisma.AssetWhereUniqueInput;
    /**
     * In case the Asset found by the `where` argument doesn't exist, create a new Asset with this data.
     */
    create: Prisma.XOR<Prisma.AssetCreateInput, Prisma.AssetUncheckedCreateInput>;
    /**
     * In case the Asset was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AssetUpdateInput, Prisma.AssetUncheckedUpdateInput>;
};
/**
 * Asset delete
 */
export type AssetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Asset to delete.
     */
    where: Prisma.AssetWhereUniqueInput;
};
/**
 * Asset deleteMany
 */
export type AssetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Assets to delete
     */
    where?: Prisma.AssetWhereInput;
    /**
     * Limit how many Assets to delete.
     */
    limit?: number;
};
/**
 * Asset.parent
 */
export type Asset$parentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Asset.children
 */
export type Asset$childrenArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    orderBy?: Prisma.AssetOrderByWithRelationInput | Prisma.AssetOrderByWithRelationInput[];
    cursor?: Prisma.AssetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssetScalarFieldEnum | Prisma.AssetScalarFieldEnum[];
};
/**
 * Asset.documents
 */
export type Asset$documentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAsset
     */
    select?: Prisma.DocumentAssetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentAsset
     */
    omit?: Prisma.DocumentAssetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentAssetInclude<ExtArgs> | null;
    where?: Prisma.DocumentAssetWhereInput;
    orderBy?: Prisma.DocumentAssetOrderByWithRelationInput | Prisma.DocumentAssetOrderByWithRelationInput[];
    cursor?: Prisma.DocumentAssetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocumentAssetScalarFieldEnum | Prisma.DocumentAssetScalarFieldEnum[];
};
/**
 * Asset.workOrders
 */
export type Asset$workOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * Asset.chatConversations
 */
export type Asset$chatConversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatConversation
     */
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatConversation
     */
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    where?: Prisma.ChatConversationWhereInput;
    orderBy?: Prisma.ChatConversationOrderByWithRelationInput | Prisma.ChatConversationOrderByWithRelationInput[];
    cursor?: Prisma.ChatConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatConversationScalarFieldEnum | Prisma.ChatConversationScalarFieldEnum[];
};
/**
 * Asset.incidentChunks
 */
export type Asset$incidentChunksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Asset without action
 */
export type AssetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Asset.d.ts.map