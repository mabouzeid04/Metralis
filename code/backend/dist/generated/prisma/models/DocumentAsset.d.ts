import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DocumentAsset
 *
 */
export type DocumentAssetModel = runtime.Types.Result.DefaultSelection<Prisma.$DocumentAssetPayload>;
export type AggregateDocumentAsset = {
    _count: DocumentAssetCountAggregateOutputType | null;
    _min: DocumentAssetMinAggregateOutputType | null;
    _max: DocumentAssetMaxAggregateOutputType | null;
};
export type DocumentAssetMinAggregateOutputType = {
    id: string | null;
    documentId: string | null;
    assetId: string | null;
    isPrimary: boolean | null;
    createdAt: Date | null;
};
export type DocumentAssetMaxAggregateOutputType = {
    id: string | null;
    documentId: string | null;
    assetId: string | null;
    isPrimary: boolean | null;
    createdAt: Date | null;
};
export type DocumentAssetCountAggregateOutputType = {
    id: number;
    documentId: number;
    assetId: number;
    isPrimary: number;
    createdAt: number;
    _all: number;
};
export type DocumentAssetMinAggregateInputType = {
    id?: true;
    documentId?: true;
    assetId?: true;
    isPrimary?: true;
    createdAt?: true;
};
export type DocumentAssetMaxAggregateInputType = {
    id?: true;
    documentId?: true;
    assetId?: true;
    isPrimary?: true;
    createdAt?: true;
};
export type DocumentAssetCountAggregateInputType = {
    id?: true;
    documentId?: true;
    assetId?: true;
    isPrimary?: true;
    createdAt?: true;
    _all?: true;
};
export type DocumentAssetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentAsset to aggregate.
     */
    where?: Prisma.DocumentAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DocumentAssets to fetch.
     */
    orderBy?: Prisma.DocumentAssetOrderByWithRelationInput | Prisma.DocumentAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DocumentAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DocumentAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DocumentAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DocumentAssets
    **/
    _count?: true | DocumentAssetCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DocumentAssetMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DocumentAssetMaxAggregateInputType;
};
export type GetDocumentAssetAggregateType<T extends DocumentAssetAggregateArgs> = {
    [P in keyof T & keyof AggregateDocumentAsset]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDocumentAsset[P]> : Prisma.GetScalarType<T[P], AggregateDocumentAsset[P]>;
};
export type DocumentAssetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentAssetWhereInput;
    orderBy?: Prisma.DocumentAssetOrderByWithAggregationInput | Prisma.DocumentAssetOrderByWithAggregationInput[];
    by: Prisma.DocumentAssetScalarFieldEnum[] | Prisma.DocumentAssetScalarFieldEnum;
    having?: Prisma.DocumentAssetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DocumentAssetCountAggregateInputType | true;
    _min?: DocumentAssetMinAggregateInputType;
    _max?: DocumentAssetMaxAggregateInputType;
};
export type DocumentAssetGroupByOutputType = {
    id: string;
    documentId: string;
    assetId: string;
    isPrimary: boolean;
    createdAt: Date;
    _count: DocumentAssetCountAggregateOutputType | null;
    _min: DocumentAssetMinAggregateOutputType | null;
    _max: DocumentAssetMaxAggregateOutputType | null;
};
type GetDocumentAssetGroupByPayload<T extends DocumentAssetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DocumentAssetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DocumentAssetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DocumentAssetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DocumentAssetGroupByOutputType[P]>;
}>>;
export type DocumentAssetWhereInput = {
    AND?: Prisma.DocumentAssetWhereInput | Prisma.DocumentAssetWhereInput[];
    OR?: Prisma.DocumentAssetWhereInput[];
    NOT?: Prisma.DocumentAssetWhereInput | Prisma.DocumentAssetWhereInput[];
    id?: Prisma.StringFilter<"DocumentAsset"> | string;
    documentId?: Prisma.StringFilter<"DocumentAsset"> | string;
    assetId?: Prisma.StringFilter<"DocumentAsset"> | string;
    isPrimary?: Prisma.BoolFilter<"DocumentAsset"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"DocumentAsset"> | Date | string;
    document?: Prisma.XOR<Prisma.DocumentScalarRelationFilter, Prisma.DocumentWhereInput>;
    asset?: Prisma.XOR<Prisma.AssetScalarRelationFilter, Prisma.AssetWhereInput>;
};
export type DocumentAssetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    isPrimary?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    document?: Prisma.DocumentOrderByWithRelationInput;
    asset?: Prisma.AssetOrderByWithRelationInput;
};
export type DocumentAssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    documentId_assetId?: Prisma.DocumentAssetDocumentIdAssetIdCompoundUniqueInput;
    AND?: Prisma.DocumentAssetWhereInput | Prisma.DocumentAssetWhereInput[];
    OR?: Prisma.DocumentAssetWhereInput[];
    NOT?: Prisma.DocumentAssetWhereInput | Prisma.DocumentAssetWhereInput[];
    documentId?: Prisma.StringFilter<"DocumentAsset"> | string;
    assetId?: Prisma.StringFilter<"DocumentAsset"> | string;
    isPrimary?: Prisma.BoolFilter<"DocumentAsset"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"DocumentAsset"> | Date | string;
    document?: Prisma.XOR<Prisma.DocumentScalarRelationFilter, Prisma.DocumentWhereInput>;
    asset?: Prisma.XOR<Prisma.AssetScalarRelationFilter, Prisma.AssetWhereInput>;
}, "id" | "documentId_assetId">;
export type DocumentAssetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    isPrimary?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DocumentAssetCountOrderByAggregateInput;
    _max?: Prisma.DocumentAssetMaxOrderByAggregateInput;
    _min?: Prisma.DocumentAssetMinOrderByAggregateInput;
};
export type DocumentAssetScalarWhereWithAggregatesInput = {
    AND?: Prisma.DocumentAssetScalarWhereWithAggregatesInput | Prisma.DocumentAssetScalarWhereWithAggregatesInput[];
    OR?: Prisma.DocumentAssetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DocumentAssetScalarWhereWithAggregatesInput | Prisma.DocumentAssetScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DocumentAsset"> | string;
    documentId?: Prisma.StringWithAggregatesFilter<"DocumentAsset"> | string;
    assetId?: Prisma.StringWithAggregatesFilter<"DocumentAsset"> | string;
    isPrimary?: Prisma.BoolWithAggregatesFilter<"DocumentAsset"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DocumentAsset"> | Date | string;
};
export type DocumentAssetCreateInput = {
    id?: string;
    isPrimary?: boolean;
    createdAt?: Date | string;
    document: Prisma.DocumentCreateNestedOneWithoutAssetsInput;
    asset: Prisma.AssetCreateNestedOneWithoutDocumentsInput;
};
export type DocumentAssetUncheckedCreateInput = {
    id?: string;
    documentId: string;
    assetId: string;
    isPrimary?: boolean;
    createdAt?: Date | string;
};
export type DocumentAssetUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    document?: Prisma.DocumentUpdateOneRequiredWithoutAssetsNestedInput;
    asset?: Prisma.AssetUpdateOneRequiredWithoutDocumentsNestedInput;
};
export type DocumentAssetUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    documentId?: Prisma.StringFieldUpdateOperationsInput | string;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentAssetCreateManyInput = {
    id?: string;
    documentId: string;
    assetId: string;
    isPrimary?: boolean;
    createdAt?: Date | string;
};
export type DocumentAssetUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentAssetUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    documentId?: Prisma.StringFieldUpdateOperationsInput | string;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentAssetListRelationFilter = {
    every?: Prisma.DocumentAssetWhereInput;
    some?: Prisma.DocumentAssetWhereInput;
    none?: Prisma.DocumentAssetWhereInput;
};
export type DocumentAssetOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DocumentAssetDocumentIdAssetIdCompoundUniqueInput = {
    documentId: string;
    assetId: string;
};
export type DocumentAssetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    isPrimary?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DocumentAssetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    isPrimary?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DocumentAssetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    assetId?: Prisma.SortOrder;
    isPrimary?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DocumentAssetCreateNestedManyWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.DocumentAssetCreateWithoutAssetInput, Prisma.DocumentAssetUncheckedCreateWithoutAssetInput> | Prisma.DocumentAssetCreateWithoutAssetInput[] | Prisma.DocumentAssetUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.DocumentAssetCreateOrConnectWithoutAssetInput | Prisma.DocumentAssetCreateOrConnectWithoutAssetInput[];
    createMany?: Prisma.DocumentAssetCreateManyAssetInputEnvelope;
    connect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
};
export type DocumentAssetUncheckedCreateNestedManyWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.DocumentAssetCreateWithoutAssetInput, Prisma.DocumentAssetUncheckedCreateWithoutAssetInput> | Prisma.DocumentAssetCreateWithoutAssetInput[] | Prisma.DocumentAssetUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.DocumentAssetCreateOrConnectWithoutAssetInput | Prisma.DocumentAssetCreateOrConnectWithoutAssetInput[];
    createMany?: Prisma.DocumentAssetCreateManyAssetInputEnvelope;
    connect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
};
export type DocumentAssetUpdateManyWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.DocumentAssetCreateWithoutAssetInput, Prisma.DocumentAssetUncheckedCreateWithoutAssetInput> | Prisma.DocumentAssetCreateWithoutAssetInput[] | Prisma.DocumentAssetUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.DocumentAssetCreateOrConnectWithoutAssetInput | Prisma.DocumentAssetCreateOrConnectWithoutAssetInput[];
    upsert?: Prisma.DocumentAssetUpsertWithWhereUniqueWithoutAssetInput | Prisma.DocumentAssetUpsertWithWhereUniqueWithoutAssetInput[];
    createMany?: Prisma.DocumentAssetCreateManyAssetInputEnvelope;
    set?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    disconnect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    delete?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    connect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    update?: Prisma.DocumentAssetUpdateWithWhereUniqueWithoutAssetInput | Prisma.DocumentAssetUpdateWithWhereUniqueWithoutAssetInput[];
    updateMany?: Prisma.DocumentAssetUpdateManyWithWhereWithoutAssetInput | Prisma.DocumentAssetUpdateManyWithWhereWithoutAssetInput[];
    deleteMany?: Prisma.DocumentAssetScalarWhereInput | Prisma.DocumentAssetScalarWhereInput[];
};
export type DocumentAssetUncheckedUpdateManyWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.DocumentAssetCreateWithoutAssetInput, Prisma.DocumentAssetUncheckedCreateWithoutAssetInput> | Prisma.DocumentAssetCreateWithoutAssetInput[] | Prisma.DocumentAssetUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.DocumentAssetCreateOrConnectWithoutAssetInput | Prisma.DocumentAssetCreateOrConnectWithoutAssetInput[];
    upsert?: Prisma.DocumentAssetUpsertWithWhereUniqueWithoutAssetInput | Prisma.DocumentAssetUpsertWithWhereUniqueWithoutAssetInput[];
    createMany?: Prisma.DocumentAssetCreateManyAssetInputEnvelope;
    set?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    disconnect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    delete?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    connect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    update?: Prisma.DocumentAssetUpdateWithWhereUniqueWithoutAssetInput | Prisma.DocumentAssetUpdateWithWhereUniqueWithoutAssetInput[];
    updateMany?: Prisma.DocumentAssetUpdateManyWithWhereWithoutAssetInput | Prisma.DocumentAssetUpdateManyWithWhereWithoutAssetInput[];
    deleteMany?: Prisma.DocumentAssetScalarWhereInput | Prisma.DocumentAssetScalarWhereInput[];
};
export type DocumentAssetCreateNestedManyWithoutDocumentInput = {
    create?: Prisma.XOR<Prisma.DocumentAssetCreateWithoutDocumentInput, Prisma.DocumentAssetUncheckedCreateWithoutDocumentInput> | Prisma.DocumentAssetCreateWithoutDocumentInput[] | Prisma.DocumentAssetUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentAssetCreateOrConnectWithoutDocumentInput | Prisma.DocumentAssetCreateOrConnectWithoutDocumentInput[];
    createMany?: Prisma.DocumentAssetCreateManyDocumentInputEnvelope;
    connect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
};
export type DocumentAssetUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: Prisma.XOR<Prisma.DocumentAssetCreateWithoutDocumentInput, Prisma.DocumentAssetUncheckedCreateWithoutDocumentInput> | Prisma.DocumentAssetCreateWithoutDocumentInput[] | Prisma.DocumentAssetUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentAssetCreateOrConnectWithoutDocumentInput | Prisma.DocumentAssetCreateOrConnectWithoutDocumentInput[];
    createMany?: Prisma.DocumentAssetCreateManyDocumentInputEnvelope;
    connect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
};
export type DocumentAssetUpdateManyWithoutDocumentNestedInput = {
    create?: Prisma.XOR<Prisma.DocumentAssetCreateWithoutDocumentInput, Prisma.DocumentAssetUncheckedCreateWithoutDocumentInput> | Prisma.DocumentAssetCreateWithoutDocumentInput[] | Prisma.DocumentAssetUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentAssetCreateOrConnectWithoutDocumentInput | Prisma.DocumentAssetCreateOrConnectWithoutDocumentInput[];
    upsert?: Prisma.DocumentAssetUpsertWithWhereUniqueWithoutDocumentInput | Prisma.DocumentAssetUpsertWithWhereUniqueWithoutDocumentInput[];
    createMany?: Prisma.DocumentAssetCreateManyDocumentInputEnvelope;
    set?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    disconnect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    delete?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    connect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    update?: Prisma.DocumentAssetUpdateWithWhereUniqueWithoutDocumentInput | Prisma.DocumentAssetUpdateWithWhereUniqueWithoutDocumentInput[];
    updateMany?: Prisma.DocumentAssetUpdateManyWithWhereWithoutDocumentInput | Prisma.DocumentAssetUpdateManyWithWhereWithoutDocumentInput[];
    deleteMany?: Prisma.DocumentAssetScalarWhereInput | Prisma.DocumentAssetScalarWhereInput[];
};
export type DocumentAssetUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: Prisma.XOR<Prisma.DocumentAssetCreateWithoutDocumentInput, Prisma.DocumentAssetUncheckedCreateWithoutDocumentInput> | Prisma.DocumentAssetCreateWithoutDocumentInput[] | Prisma.DocumentAssetUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentAssetCreateOrConnectWithoutDocumentInput | Prisma.DocumentAssetCreateOrConnectWithoutDocumentInput[];
    upsert?: Prisma.DocumentAssetUpsertWithWhereUniqueWithoutDocumentInput | Prisma.DocumentAssetUpsertWithWhereUniqueWithoutDocumentInput[];
    createMany?: Prisma.DocumentAssetCreateManyDocumentInputEnvelope;
    set?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    disconnect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    delete?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    connect?: Prisma.DocumentAssetWhereUniqueInput | Prisma.DocumentAssetWhereUniqueInput[];
    update?: Prisma.DocumentAssetUpdateWithWhereUniqueWithoutDocumentInput | Prisma.DocumentAssetUpdateWithWhereUniqueWithoutDocumentInput[];
    updateMany?: Prisma.DocumentAssetUpdateManyWithWhereWithoutDocumentInput | Prisma.DocumentAssetUpdateManyWithWhereWithoutDocumentInput[];
    deleteMany?: Prisma.DocumentAssetScalarWhereInput | Prisma.DocumentAssetScalarWhereInput[];
};
export type DocumentAssetCreateWithoutAssetInput = {
    id?: string;
    isPrimary?: boolean;
    createdAt?: Date | string;
    document: Prisma.DocumentCreateNestedOneWithoutAssetsInput;
};
export type DocumentAssetUncheckedCreateWithoutAssetInput = {
    id?: string;
    documentId: string;
    isPrimary?: boolean;
    createdAt?: Date | string;
};
export type DocumentAssetCreateOrConnectWithoutAssetInput = {
    where: Prisma.DocumentAssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.DocumentAssetCreateWithoutAssetInput, Prisma.DocumentAssetUncheckedCreateWithoutAssetInput>;
};
export type DocumentAssetCreateManyAssetInputEnvelope = {
    data: Prisma.DocumentAssetCreateManyAssetInput | Prisma.DocumentAssetCreateManyAssetInput[];
    skipDuplicates?: boolean;
};
export type DocumentAssetUpsertWithWhereUniqueWithoutAssetInput = {
    where: Prisma.DocumentAssetWhereUniqueInput;
    update: Prisma.XOR<Prisma.DocumentAssetUpdateWithoutAssetInput, Prisma.DocumentAssetUncheckedUpdateWithoutAssetInput>;
    create: Prisma.XOR<Prisma.DocumentAssetCreateWithoutAssetInput, Prisma.DocumentAssetUncheckedCreateWithoutAssetInput>;
};
export type DocumentAssetUpdateWithWhereUniqueWithoutAssetInput = {
    where: Prisma.DocumentAssetWhereUniqueInput;
    data: Prisma.XOR<Prisma.DocumentAssetUpdateWithoutAssetInput, Prisma.DocumentAssetUncheckedUpdateWithoutAssetInput>;
};
export type DocumentAssetUpdateManyWithWhereWithoutAssetInput = {
    where: Prisma.DocumentAssetScalarWhereInput;
    data: Prisma.XOR<Prisma.DocumentAssetUpdateManyMutationInput, Prisma.DocumentAssetUncheckedUpdateManyWithoutAssetInput>;
};
export type DocumentAssetScalarWhereInput = {
    AND?: Prisma.DocumentAssetScalarWhereInput | Prisma.DocumentAssetScalarWhereInput[];
    OR?: Prisma.DocumentAssetScalarWhereInput[];
    NOT?: Prisma.DocumentAssetScalarWhereInput | Prisma.DocumentAssetScalarWhereInput[];
    id?: Prisma.StringFilter<"DocumentAsset"> | string;
    documentId?: Prisma.StringFilter<"DocumentAsset"> | string;
    assetId?: Prisma.StringFilter<"DocumentAsset"> | string;
    isPrimary?: Prisma.BoolFilter<"DocumentAsset"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"DocumentAsset"> | Date | string;
};
export type DocumentAssetCreateWithoutDocumentInput = {
    id?: string;
    isPrimary?: boolean;
    createdAt?: Date | string;
    asset: Prisma.AssetCreateNestedOneWithoutDocumentsInput;
};
export type DocumentAssetUncheckedCreateWithoutDocumentInput = {
    id?: string;
    assetId: string;
    isPrimary?: boolean;
    createdAt?: Date | string;
};
export type DocumentAssetCreateOrConnectWithoutDocumentInput = {
    where: Prisma.DocumentAssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.DocumentAssetCreateWithoutDocumentInput, Prisma.DocumentAssetUncheckedCreateWithoutDocumentInput>;
};
export type DocumentAssetCreateManyDocumentInputEnvelope = {
    data: Prisma.DocumentAssetCreateManyDocumentInput | Prisma.DocumentAssetCreateManyDocumentInput[];
    skipDuplicates?: boolean;
};
export type DocumentAssetUpsertWithWhereUniqueWithoutDocumentInput = {
    where: Prisma.DocumentAssetWhereUniqueInput;
    update: Prisma.XOR<Prisma.DocumentAssetUpdateWithoutDocumentInput, Prisma.DocumentAssetUncheckedUpdateWithoutDocumentInput>;
    create: Prisma.XOR<Prisma.DocumentAssetCreateWithoutDocumentInput, Prisma.DocumentAssetUncheckedCreateWithoutDocumentInput>;
};
export type DocumentAssetUpdateWithWhereUniqueWithoutDocumentInput = {
    where: Prisma.DocumentAssetWhereUniqueInput;
    data: Prisma.XOR<Prisma.DocumentAssetUpdateWithoutDocumentInput, Prisma.DocumentAssetUncheckedUpdateWithoutDocumentInput>;
};
export type DocumentAssetUpdateManyWithWhereWithoutDocumentInput = {
    where: Prisma.DocumentAssetScalarWhereInput;
    data: Prisma.XOR<Prisma.DocumentAssetUpdateManyMutationInput, Prisma.DocumentAssetUncheckedUpdateManyWithoutDocumentInput>;
};
export type DocumentAssetCreateManyAssetInput = {
    id?: string;
    documentId: string;
    isPrimary?: boolean;
    createdAt?: Date | string;
};
export type DocumentAssetUpdateWithoutAssetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    document?: Prisma.DocumentUpdateOneRequiredWithoutAssetsNestedInput;
};
export type DocumentAssetUncheckedUpdateWithoutAssetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    documentId?: Prisma.StringFieldUpdateOperationsInput | string;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentAssetUncheckedUpdateManyWithoutAssetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    documentId?: Prisma.StringFieldUpdateOperationsInput | string;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentAssetCreateManyDocumentInput = {
    id?: string;
    assetId: string;
    isPrimary?: boolean;
    createdAt?: Date | string;
};
export type DocumentAssetUpdateWithoutDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asset?: Prisma.AssetUpdateOneRequiredWithoutDocumentsNestedInput;
};
export type DocumentAssetUncheckedUpdateWithoutDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentAssetUncheckedUpdateManyWithoutDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assetId?: Prisma.StringFieldUpdateOperationsInput | string;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentAssetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    documentId?: boolean;
    assetId?: boolean;
    isPrimary?: boolean;
    createdAt?: boolean;
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["documentAsset"]>;
export type DocumentAssetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    documentId?: boolean;
    assetId?: boolean;
    isPrimary?: boolean;
    createdAt?: boolean;
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["documentAsset"]>;
export type DocumentAssetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    documentId?: boolean;
    assetId?: boolean;
    isPrimary?: boolean;
    createdAt?: boolean;
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["documentAsset"]>;
export type DocumentAssetSelectScalar = {
    id?: boolean;
    documentId?: boolean;
    assetId?: boolean;
    isPrimary?: boolean;
    createdAt?: boolean;
};
export type DocumentAssetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "documentId" | "assetId" | "isPrimary" | "createdAt", ExtArgs["result"]["documentAsset"]>;
export type DocumentAssetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type DocumentAssetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type DocumentAssetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
    asset?: boolean | Prisma.AssetDefaultArgs<ExtArgs>;
};
export type $DocumentAssetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DocumentAsset";
    objects: {
        document: Prisma.$DocumentPayload<ExtArgs>;
        asset: Prisma.$AssetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        documentId: string;
        assetId: string;
        isPrimary: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["documentAsset"]>;
    composites: {};
};
export type DocumentAssetGetPayload<S extends boolean | null | undefined | DocumentAssetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload, S>;
export type DocumentAssetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DocumentAssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DocumentAssetCountAggregateInputType | true;
};
export interface DocumentAssetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DocumentAsset'];
        meta: {
            name: 'DocumentAsset';
        };
    };
    /**
     * Find zero or one DocumentAsset that matches the filter.
     * @param {DocumentAssetFindUniqueArgs} args - Arguments to find a DocumentAsset
     * @example
     * // Get one DocumentAsset
     * const documentAsset = await prisma.documentAsset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentAssetFindUniqueArgs>(args: Prisma.SelectSubset<T, DocumentAssetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DocumentAssetClient<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DocumentAsset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentAssetFindUniqueOrThrowArgs} args - Arguments to find a DocumentAsset
     * @example
     * // Get one DocumentAsset
     * const documentAsset = await prisma.documentAsset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentAssetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DocumentAssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DocumentAssetClient<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DocumentAsset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAssetFindFirstArgs} args - Arguments to find a DocumentAsset
     * @example
     * // Get one DocumentAsset
     * const documentAsset = await prisma.documentAsset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentAssetFindFirstArgs>(args?: Prisma.SelectSubset<T, DocumentAssetFindFirstArgs<ExtArgs>>): Prisma.Prisma__DocumentAssetClient<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DocumentAsset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAssetFindFirstOrThrowArgs} args - Arguments to find a DocumentAsset
     * @example
     * // Get one DocumentAsset
     * const documentAsset = await prisma.documentAsset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentAssetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DocumentAssetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DocumentAssetClient<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DocumentAssets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentAssets
     * const documentAssets = await prisma.documentAsset.findMany()
     *
     * // Get first 10 DocumentAssets
     * const documentAssets = await prisma.documentAsset.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const documentAssetWithIdOnly = await prisma.documentAsset.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DocumentAssetFindManyArgs>(args?: Prisma.SelectSubset<T, DocumentAssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DocumentAsset.
     * @param {DocumentAssetCreateArgs} args - Arguments to create a DocumentAsset.
     * @example
     * // Create one DocumentAsset
     * const DocumentAsset = await prisma.documentAsset.create({
     *   data: {
     *     // ... data to create a DocumentAsset
     *   }
     * })
     *
     */
    create<T extends DocumentAssetCreateArgs>(args: Prisma.SelectSubset<T, DocumentAssetCreateArgs<ExtArgs>>): Prisma.Prisma__DocumentAssetClient<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DocumentAssets.
     * @param {DocumentAssetCreateManyArgs} args - Arguments to create many DocumentAssets.
     * @example
     * // Create many DocumentAssets
     * const documentAsset = await prisma.documentAsset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DocumentAssetCreateManyArgs>(args?: Prisma.SelectSubset<T, DocumentAssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DocumentAssets and returns the data saved in the database.
     * @param {DocumentAssetCreateManyAndReturnArgs} args - Arguments to create many DocumentAssets.
     * @example
     * // Create many DocumentAssets
     * const documentAsset = await prisma.documentAsset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DocumentAssets and only return the `id`
     * const documentAssetWithIdOnly = await prisma.documentAsset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DocumentAssetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DocumentAssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DocumentAsset.
     * @param {DocumentAssetDeleteArgs} args - Arguments to delete one DocumentAsset.
     * @example
     * // Delete one DocumentAsset
     * const DocumentAsset = await prisma.documentAsset.delete({
     *   where: {
     *     // ... filter to delete one DocumentAsset
     *   }
     * })
     *
     */
    delete<T extends DocumentAssetDeleteArgs>(args: Prisma.SelectSubset<T, DocumentAssetDeleteArgs<ExtArgs>>): Prisma.Prisma__DocumentAssetClient<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DocumentAsset.
     * @param {DocumentAssetUpdateArgs} args - Arguments to update one DocumentAsset.
     * @example
     * // Update one DocumentAsset
     * const documentAsset = await prisma.documentAsset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DocumentAssetUpdateArgs>(args: Prisma.SelectSubset<T, DocumentAssetUpdateArgs<ExtArgs>>): Prisma.Prisma__DocumentAssetClient<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DocumentAssets.
     * @param {DocumentAssetDeleteManyArgs} args - Arguments to filter DocumentAssets to delete.
     * @example
     * // Delete a few DocumentAssets
     * const { count } = await prisma.documentAsset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DocumentAssetDeleteManyArgs>(args?: Prisma.SelectSubset<T, DocumentAssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DocumentAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentAssets
     * const documentAsset = await prisma.documentAsset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DocumentAssetUpdateManyArgs>(args: Prisma.SelectSubset<T, DocumentAssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DocumentAssets and returns the data updated in the database.
     * @param {DocumentAssetUpdateManyAndReturnArgs} args - Arguments to update many DocumentAssets.
     * @example
     * // Update many DocumentAssets
     * const documentAsset = await prisma.documentAsset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DocumentAssets and only return the `id`
     * const documentAssetWithIdOnly = await prisma.documentAsset.updateManyAndReturn({
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
    updateManyAndReturn<T extends DocumentAssetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DocumentAssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DocumentAsset.
     * @param {DocumentAssetUpsertArgs} args - Arguments to update or create a DocumentAsset.
     * @example
     * // Update or create a DocumentAsset
     * const documentAsset = await prisma.documentAsset.upsert({
     *   create: {
     *     // ... data to create a DocumentAsset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentAsset we want to update
     *   }
     * })
     */
    upsert<T extends DocumentAssetUpsertArgs>(args: Prisma.SelectSubset<T, DocumentAssetUpsertArgs<ExtArgs>>): Prisma.Prisma__DocumentAssetClient<runtime.Types.Result.GetResult<Prisma.$DocumentAssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DocumentAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAssetCountArgs} args - Arguments to filter DocumentAssets to count.
     * @example
     * // Count the number of DocumentAssets
     * const count = await prisma.documentAsset.count({
     *   where: {
     *     // ... the filter for the DocumentAssets we want to count
     *   }
     * })
    **/
    count<T extends DocumentAssetCountArgs>(args?: Prisma.Subset<T, DocumentAssetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DocumentAssetCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DocumentAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentAssetAggregateArgs>(args: Prisma.Subset<T, DocumentAssetAggregateArgs>): Prisma.PrismaPromise<GetDocumentAssetAggregateType<T>>;
    /**
     * Group by DocumentAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAssetGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DocumentAssetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DocumentAssetGroupByArgs['orderBy'];
    } : {
        orderBy?: DocumentAssetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DocumentAssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DocumentAsset model
     */
    readonly fields: DocumentAssetFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DocumentAsset.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DocumentAssetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    document<T extends Prisma.DocumentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DocumentDefaultArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    asset<T extends Prisma.AssetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AssetDefaultArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the DocumentAsset model
 */
export interface DocumentAssetFieldRefs {
    readonly id: Prisma.FieldRef<"DocumentAsset", 'String'>;
    readonly documentId: Prisma.FieldRef<"DocumentAsset", 'String'>;
    readonly assetId: Prisma.FieldRef<"DocumentAsset", 'String'>;
    readonly isPrimary: Prisma.FieldRef<"DocumentAsset", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"DocumentAsset", 'DateTime'>;
}
/**
 * DocumentAsset findUnique
 */
export type DocumentAssetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DocumentAsset to fetch.
     */
    where: Prisma.DocumentAssetWhereUniqueInput;
};
/**
 * DocumentAsset findUniqueOrThrow
 */
export type DocumentAssetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DocumentAsset to fetch.
     */
    where: Prisma.DocumentAssetWhereUniqueInput;
};
/**
 * DocumentAsset findFirst
 */
export type DocumentAssetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DocumentAsset to fetch.
     */
    where?: Prisma.DocumentAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DocumentAssets to fetch.
     */
    orderBy?: Prisma.DocumentAssetOrderByWithRelationInput | Prisma.DocumentAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DocumentAssets.
     */
    cursor?: Prisma.DocumentAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DocumentAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DocumentAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DocumentAssets.
     */
    distinct?: Prisma.DocumentAssetScalarFieldEnum | Prisma.DocumentAssetScalarFieldEnum[];
};
/**
 * DocumentAsset findFirstOrThrow
 */
export type DocumentAssetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DocumentAsset to fetch.
     */
    where?: Prisma.DocumentAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DocumentAssets to fetch.
     */
    orderBy?: Prisma.DocumentAssetOrderByWithRelationInput | Prisma.DocumentAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DocumentAssets.
     */
    cursor?: Prisma.DocumentAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DocumentAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DocumentAssets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DocumentAssets.
     */
    distinct?: Prisma.DocumentAssetScalarFieldEnum | Prisma.DocumentAssetScalarFieldEnum[];
};
/**
 * DocumentAsset findMany
 */
export type DocumentAssetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which DocumentAssets to fetch.
     */
    where?: Prisma.DocumentAssetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DocumentAssets to fetch.
     */
    orderBy?: Prisma.DocumentAssetOrderByWithRelationInput | Prisma.DocumentAssetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DocumentAssets.
     */
    cursor?: Prisma.DocumentAssetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DocumentAssets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DocumentAssets.
     */
    skip?: number;
    distinct?: Prisma.DocumentAssetScalarFieldEnum | Prisma.DocumentAssetScalarFieldEnum[];
};
/**
 * DocumentAsset create
 */
export type DocumentAssetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a DocumentAsset.
     */
    data: Prisma.XOR<Prisma.DocumentAssetCreateInput, Prisma.DocumentAssetUncheckedCreateInput>;
};
/**
 * DocumentAsset createMany
 */
export type DocumentAssetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentAssets.
     */
    data: Prisma.DocumentAssetCreateManyInput | Prisma.DocumentAssetCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DocumentAsset createManyAndReturn
 */
export type DocumentAssetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAsset
     */
    select?: Prisma.DocumentAssetSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentAsset
     */
    omit?: Prisma.DocumentAssetOmit<ExtArgs> | null;
    /**
     * The data used to create many DocumentAssets.
     */
    data: Prisma.DocumentAssetCreateManyInput | Prisma.DocumentAssetCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentAssetIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DocumentAsset update
 */
export type DocumentAssetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a DocumentAsset.
     */
    data: Prisma.XOR<Prisma.DocumentAssetUpdateInput, Prisma.DocumentAssetUncheckedUpdateInput>;
    /**
     * Choose, which DocumentAsset to update.
     */
    where: Prisma.DocumentAssetWhereUniqueInput;
};
/**
 * DocumentAsset updateMany
 */
export type DocumentAssetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentAssets.
     */
    data: Prisma.XOR<Prisma.DocumentAssetUpdateManyMutationInput, Prisma.DocumentAssetUncheckedUpdateManyInput>;
    /**
     * Filter which DocumentAssets to update
     */
    where?: Prisma.DocumentAssetWhereInput;
    /**
     * Limit how many DocumentAssets to update.
     */
    limit?: number;
};
/**
 * DocumentAsset updateManyAndReturn
 */
export type DocumentAssetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentAsset
     */
    select?: Prisma.DocumentAssetSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentAsset
     */
    omit?: Prisma.DocumentAssetOmit<ExtArgs> | null;
    /**
     * The data used to update DocumentAssets.
     */
    data: Prisma.XOR<Prisma.DocumentAssetUpdateManyMutationInput, Prisma.DocumentAssetUncheckedUpdateManyInput>;
    /**
     * Filter which DocumentAssets to update
     */
    where?: Prisma.DocumentAssetWhereInput;
    /**
     * Limit how many DocumentAssets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentAssetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DocumentAsset upsert
 */
export type DocumentAssetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the DocumentAsset to update in case it exists.
     */
    where: Prisma.DocumentAssetWhereUniqueInput;
    /**
     * In case the DocumentAsset found by the `where` argument doesn't exist, create a new DocumentAsset with this data.
     */
    create: Prisma.XOR<Prisma.DocumentAssetCreateInput, Prisma.DocumentAssetUncheckedCreateInput>;
    /**
     * In case the DocumentAsset was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DocumentAssetUpdateInput, Prisma.DocumentAssetUncheckedUpdateInput>;
};
/**
 * DocumentAsset delete
 */
export type DocumentAssetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which DocumentAsset to delete.
     */
    where: Prisma.DocumentAssetWhereUniqueInput;
};
/**
 * DocumentAsset deleteMany
 */
export type DocumentAssetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentAssets to delete
     */
    where?: Prisma.DocumentAssetWhereInput;
    /**
     * Limit how many DocumentAssets to delete.
     */
    limit?: number;
};
/**
 * DocumentAsset without action
 */
export type DocumentAssetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=DocumentAsset.d.ts.map