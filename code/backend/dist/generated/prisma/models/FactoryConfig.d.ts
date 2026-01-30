import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model FactoryConfig
 *
 */
export type FactoryConfigModel = runtime.Types.Result.DefaultSelection<Prisma.$FactoryConfigPayload>;
export type AggregateFactoryConfig = {
    _count: FactoryConfigCountAggregateOutputType | null;
    _avg: FactoryConfigAvgAggregateOutputType | null;
    _sum: FactoryConfigSumAggregateOutputType | null;
    _min: FactoryConfigMinAggregateOutputType | null;
    _max: FactoryConfigMaxAggregateOutputType | null;
};
export type FactoryConfigAvgAggregateOutputType = {
    defaultMaxDepth: number | null;
};
export type FactoryConfigSumAggregateOutputType = {
    defaultMaxDepth: number | null;
};
export type FactoryConfigMinAggregateOutputType = {
    id: string | null;
    primaryLanguage: string | null;
    defaultMaxDepth: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FactoryConfigMaxAggregateOutputType = {
    id: string | null;
    primaryLanguage: string | null;
    defaultMaxDepth: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FactoryConfigCountAggregateOutputType = {
    id: number;
    primaryLanguage: number;
    supportedLanguages: number;
    hierarchyLevels: number;
    defaultMaxDepth: number;
    statusReasonOptions: number;
    maintenanceDisciplines: number;
    maintenanceTypes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FactoryConfigAvgAggregateInputType = {
    defaultMaxDepth?: true;
};
export type FactoryConfigSumAggregateInputType = {
    defaultMaxDepth?: true;
};
export type FactoryConfigMinAggregateInputType = {
    id?: true;
    primaryLanguage?: true;
    defaultMaxDepth?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FactoryConfigMaxAggregateInputType = {
    id?: true;
    primaryLanguage?: true;
    defaultMaxDepth?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FactoryConfigCountAggregateInputType = {
    id?: true;
    primaryLanguage?: true;
    supportedLanguages?: true;
    hierarchyLevels?: true;
    defaultMaxDepth?: true;
    statusReasonOptions?: true;
    maintenanceDisciplines?: true;
    maintenanceTypes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FactoryConfigAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FactoryConfig to aggregate.
     */
    where?: Prisma.FactoryConfigWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FactoryConfigs to fetch.
     */
    orderBy?: Prisma.FactoryConfigOrderByWithRelationInput | Prisma.FactoryConfigOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FactoryConfigWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FactoryConfigs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FactoryConfigs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FactoryConfigs
    **/
    _count?: true | FactoryConfigCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: FactoryConfigAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: FactoryConfigSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FactoryConfigMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FactoryConfigMaxAggregateInputType;
};
export type GetFactoryConfigAggregateType<T extends FactoryConfigAggregateArgs> = {
    [P in keyof T & keyof AggregateFactoryConfig]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFactoryConfig[P]> : Prisma.GetScalarType<T[P], AggregateFactoryConfig[P]>;
};
export type FactoryConfigGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FactoryConfigWhereInput;
    orderBy?: Prisma.FactoryConfigOrderByWithAggregationInput | Prisma.FactoryConfigOrderByWithAggregationInput[];
    by: Prisma.FactoryConfigScalarFieldEnum[] | Prisma.FactoryConfigScalarFieldEnum;
    having?: Prisma.FactoryConfigScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FactoryConfigCountAggregateInputType | true;
    _avg?: FactoryConfigAvgAggregateInputType;
    _sum?: FactoryConfigSumAggregateInputType;
    _min?: FactoryConfigMinAggregateInputType;
    _max?: FactoryConfigMaxAggregateInputType;
};
export type FactoryConfigGroupByOutputType = {
    id: string;
    primaryLanguage: string;
    supportedLanguages: string[];
    hierarchyLevels: runtime.JsonValue;
    defaultMaxDepth: number;
    statusReasonOptions: runtime.JsonValue;
    maintenanceDisciplines: runtime.JsonValue;
    maintenanceTypes: runtime.JsonValue;
    createdAt: Date;
    updatedAt: Date;
    _count: FactoryConfigCountAggregateOutputType | null;
    _avg: FactoryConfigAvgAggregateOutputType | null;
    _sum: FactoryConfigSumAggregateOutputType | null;
    _min: FactoryConfigMinAggregateOutputType | null;
    _max: FactoryConfigMaxAggregateOutputType | null;
};
type GetFactoryConfigGroupByPayload<T extends FactoryConfigGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FactoryConfigGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FactoryConfigGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FactoryConfigGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FactoryConfigGroupByOutputType[P]>;
}>>;
export type FactoryConfigWhereInput = {
    AND?: Prisma.FactoryConfigWhereInput | Prisma.FactoryConfigWhereInput[];
    OR?: Prisma.FactoryConfigWhereInput[];
    NOT?: Prisma.FactoryConfigWhereInput | Prisma.FactoryConfigWhereInput[];
    id?: Prisma.StringFilter<"FactoryConfig"> | string;
    primaryLanguage?: Prisma.StringFilter<"FactoryConfig"> | string;
    supportedLanguages?: Prisma.StringNullableListFilter<"FactoryConfig">;
    hierarchyLevels?: Prisma.JsonFilter<"FactoryConfig">;
    defaultMaxDepth?: Prisma.IntFilter<"FactoryConfig"> | number;
    statusReasonOptions?: Prisma.JsonFilter<"FactoryConfig">;
    maintenanceDisciplines?: Prisma.JsonFilter<"FactoryConfig">;
    maintenanceTypes?: Prisma.JsonFilter<"FactoryConfig">;
    createdAt?: Prisma.DateTimeFilter<"FactoryConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FactoryConfig"> | Date | string;
};
export type FactoryConfigOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    primaryLanguage?: Prisma.SortOrder;
    supportedLanguages?: Prisma.SortOrder;
    hierarchyLevels?: Prisma.SortOrder;
    defaultMaxDepth?: Prisma.SortOrder;
    statusReasonOptions?: Prisma.SortOrder;
    maintenanceDisciplines?: Prisma.SortOrder;
    maintenanceTypes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FactoryConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FactoryConfigWhereInput | Prisma.FactoryConfigWhereInput[];
    OR?: Prisma.FactoryConfigWhereInput[];
    NOT?: Prisma.FactoryConfigWhereInput | Prisma.FactoryConfigWhereInput[];
    primaryLanguage?: Prisma.StringFilter<"FactoryConfig"> | string;
    supportedLanguages?: Prisma.StringNullableListFilter<"FactoryConfig">;
    hierarchyLevels?: Prisma.JsonFilter<"FactoryConfig">;
    defaultMaxDepth?: Prisma.IntFilter<"FactoryConfig"> | number;
    statusReasonOptions?: Prisma.JsonFilter<"FactoryConfig">;
    maintenanceDisciplines?: Prisma.JsonFilter<"FactoryConfig">;
    maintenanceTypes?: Prisma.JsonFilter<"FactoryConfig">;
    createdAt?: Prisma.DateTimeFilter<"FactoryConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FactoryConfig"> | Date | string;
}, "id">;
export type FactoryConfigOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    primaryLanguage?: Prisma.SortOrder;
    supportedLanguages?: Prisma.SortOrder;
    hierarchyLevels?: Prisma.SortOrder;
    defaultMaxDepth?: Prisma.SortOrder;
    statusReasonOptions?: Prisma.SortOrder;
    maintenanceDisciplines?: Prisma.SortOrder;
    maintenanceTypes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FactoryConfigCountOrderByAggregateInput;
    _avg?: Prisma.FactoryConfigAvgOrderByAggregateInput;
    _max?: Prisma.FactoryConfigMaxOrderByAggregateInput;
    _min?: Prisma.FactoryConfigMinOrderByAggregateInput;
    _sum?: Prisma.FactoryConfigSumOrderByAggregateInput;
};
export type FactoryConfigScalarWhereWithAggregatesInput = {
    AND?: Prisma.FactoryConfigScalarWhereWithAggregatesInput | Prisma.FactoryConfigScalarWhereWithAggregatesInput[];
    OR?: Prisma.FactoryConfigScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FactoryConfigScalarWhereWithAggregatesInput | Prisma.FactoryConfigScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FactoryConfig"> | string;
    primaryLanguage?: Prisma.StringWithAggregatesFilter<"FactoryConfig"> | string;
    supportedLanguages?: Prisma.StringNullableListFilter<"FactoryConfig">;
    hierarchyLevels?: Prisma.JsonWithAggregatesFilter<"FactoryConfig">;
    defaultMaxDepth?: Prisma.IntWithAggregatesFilter<"FactoryConfig"> | number;
    statusReasonOptions?: Prisma.JsonWithAggregatesFilter<"FactoryConfig">;
    maintenanceDisciplines?: Prisma.JsonWithAggregatesFilter<"FactoryConfig">;
    maintenanceTypes?: Prisma.JsonWithAggregatesFilter<"FactoryConfig">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FactoryConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FactoryConfig"> | Date | string;
};
export type FactoryConfigCreateInput = {
    id?: string;
    primaryLanguage?: string;
    supportedLanguages?: Prisma.FactoryConfigCreatesupportedLanguagesInput | string[];
    hierarchyLevels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    defaultMaxDepth?: number;
    statusReasonOptions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceDisciplines: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceTypes: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FactoryConfigUncheckedCreateInput = {
    id?: string;
    primaryLanguage?: string;
    supportedLanguages?: Prisma.FactoryConfigCreatesupportedLanguagesInput | string[];
    hierarchyLevels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    defaultMaxDepth?: number;
    statusReasonOptions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceDisciplines: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceTypes: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FactoryConfigUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    primaryLanguage?: Prisma.StringFieldUpdateOperationsInput | string;
    supportedLanguages?: Prisma.FactoryConfigUpdatesupportedLanguagesInput | string[];
    hierarchyLevels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    defaultMaxDepth?: Prisma.IntFieldUpdateOperationsInput | number;
    statusReasonOptions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceDisciplines?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceTypes?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FactoryConfigUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    primaryLanguage?: Prisma.StringFieldUpdateOperationsInput | string;
    supportedLanguages?: Prisma.FactoryConfigUpdatesupportedLanguagesInput | string[];
    hierarchyLevels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    defaultMaxDepth?: Prisma.IntFieldUpdateOperationsInput | number;
    statusReasonOptions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceDisciplines?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceTypes?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FactoryConfigCreateManyInput = {
    id?: string;
    primaryLanguage?: string;
    supportedLanguages?: Prisma.FactoryConfigCreatesupportedLanguagesInput | string[];
    hierarchyLevels: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    defaultMaxDepth?: number;
    statusReasonOptions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceDisciplines: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceTypes: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FactoryConfigUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    primaryLanguage?: Prisma.StringFieldUpdateOperationsInput | string;
    supportedLanguages?: Prisma.FactoryConfigUpdatesupportedLanguagesInput | string[];
    hierarchyLevels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    defaultMaxDepth?: Prisma.IntFieldUpdateOperationsInput | number;
    statusReasonOptions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceDisciplines?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceTypes?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FactoryConfigUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    primaryLanguage?: Prisma.StringFieldUpdateOperationsInput | string;
    supportedLanguages?: Prisma.FactoryConfigUpdatesupportedLanguagesInput | string[];
    hierarchyLevels?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    defaultMaxDepth?: Prisma.IntFieldUpdateOperationsInput | number;
    statusReasonOptions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceDisciplines?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    maintenanceTypes?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type FactoryConfigCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    primaryLanguage?: Prisma.SortOrder;
    supportedLanguages?: Prisma.SortOrder;
    hierarchyLevels?: Prisma.SortOrder;
    defaultMaxDepth?: Prisma.SortOrder;
    statusReasonOptions?: Prisma.SortOrder;
    maintenanceDisciplines?: Prisma.SortOrder;
    maintenanceTypes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FactoryConfigAvgOrderByAggregateInput = {
    defaultMaxDepth?: Prisma.SortOrder;
};
export type FactoryConfigMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    primaryLanguage?: Prisma.SortOrder;
    defaultMaxDepth?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FactoryConfigMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    primaryLanguage?: Prisma.SortOrder;
    defaultMaxDepth?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FactoryConfigSumOrderByAggregateInput = {
    defaultMaxDepth?: Prisma.SortOrder;
};
export type FactoryConfigCreatesupportedLanguagesInput = {
    set: string[];
};
export type FactoryConfigUpdatesupportedLanguagesInput = {
    set?: string[];
    push?: string | string[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FactoryConfigSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    primaryLanguage?: boolean;
    supportedLanguages?: boolean;
    hierarchyLevels?: boolean;
    defaultMaxDepth?: boolean;
    statusReasonOptions?: boolean;
    maintenanceDisciplines?: boolean;
    maintenanceTypes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["factoryConfig"]>;
export type FactoryConfigSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    primaryLanguage?: boolean;
    supportedLanguages?: boolean;
    hierarchyLevels?: boolean;
    defaultMaxDepth?: boolean;
    statusReasonOptions?: boolean;
    maintenanceDisciplines?: boolean;
    maintenanceTypes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["factoryConfig"]>;
export type FactoryConfigSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    primaryLanguage?: boolean;
    supportedLanguages?: boolean;
    hierarchyLevels?: boolean;
    defaultMaxDepth?: boolean;
    statusReasonOptions?: boolean;
    maintenanceDisciplines?: boolean;
    maintenanceTypes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["factoryConfig"]>;
export type FactoryConfigSelectScalar = {
    id?: boolean;
    primaryLanguage?: boolean;
    supportedLanguages?: boolean;
    hierarchyLevels?: boolean;
    defaultMaxDepth?: boolean;
    statusReasonOptions?: boolean;
    maintenanceDisciplines?: boolean;
    maintenanceTypes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FactoryConfigOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "primaryLanguage" | "supportedLanguages" | "hierarchyLevels" | "defaultMaxDepth" | "statusReasonOptions" | "maintenanceDisciplines" | "maintenanceTypes" | "createdAt" | "updatedAt", ExtArgs["result"]["factoryConfig"]>;
export type $FactoryConfigPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FactoryConfig";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        primaryLanguage: string;
        supportedLanguages: string[];
        hierarchyLevels: runtime.JsonValue;
        defaultMaxDepth: number;
        statusReasonOptions: runtime.JsonValue;
        maintenanceDisciplines: runtime.JsonValue;
        maintenanceTypes: runtime.JsonValue;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["factoryConfig"]>;
    composites: {};
};
export type FactoryConfigGetPayload<S extends boolean | null | undefined | FactoryConfigDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload, S>;
export type FactoryConfigCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FactoryConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FactoryConfigCountAggregateInputType | true;
};
export interface FactoryConfigDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FactoryConfig'];
        meta: {
            name: 'FactoryConfig';
        };
    };
    /**
     * Find zero or one FactoryConfig that matches the filter.
     * @param {FactoryConfigFindUniqueArgs} args - Arguments to find a FactoryConfig
     * @example
     * // Get one FactoryConfig
     * const factoryConfig = await prisma.factoryConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FactoryConfigFindUniqueArgs>(args: Prisma.SelectSubset<T, FactoryConfigFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FactoryConfigClient<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FactoryConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FactoryConfigFindUniqueOrThrowArgs} args - Arguments to find a FactoryConfig
     * @example
     * // Get one FactoryConfig
     * const factoryConfig = await prisma.factoryConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FactoryConfigFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FactoryConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FactoryConfigClient<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FactoryConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryConfigFindFirstArgs} args - Arguments to find a FactoryConfig
     * @example
     * // Get one FactoryConfig
     * const factoryConfig = await prisma.factoryConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FactoryConfigFindFirstArgs>(args?: Prisma.SelectSubset<T, FactoryConfigFindFirstArgs<ExtArgs>>): Prisma.Prisma__FactoryConfigClient<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FactoryConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryConfigFindFirstOrThrowArgs} args - Arguments to find a FactoryConfig
     * @example
     * // Get one FactoryConfig
     * const factoryConfig = await prisma.factoryConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FactoryConfigFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FactoryConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FactoryConfigClient<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FactoryConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FactoryConfigs
     * const factoryConfigs = await prisma.factoryConfig.findMany()
     *
     * // Get first 10 FactoryConfigs
     * const factoryConfigs = await prisma.factoryConfig.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const factoryConfigWithIdOnly = await prisma.factoryConfig.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FactoryConfigFindManyArgs>(args?: Prisma.SelectSubset<T, FactoryConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FactoryConfig.
     * @param {FactoryConfigCreateArgs} args - Arguments to create a FactoryConfig.
     * @example
     * // Create one FactoryConfig
     * const FactoryConfig = await prisma.factoryConfig.create({
     *   data: {
     *     // ... data to create a FactoryConfig
     *   }
     * })
     *
     */
    create<T extends FactoryConfigCreateArgs>(args: Prisma.SelectSubset<T, FactoryConfigCreateArgs<ExtArgs>>): Prisma.Prisma__FactoryConfigClient<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FactoryConfigs.
     * @param {FactoryConfigCreateManyArgs} args - Arguments to create many FactoryConfigs.
     * @example
     * // Create many FactoryConfigs
     * const factoryConfig = await prisma.factoryConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FactoryConfigCreateManyArgs>(args?: Prisma.SelectSubset<T, FactoryConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FactoryConfigs and returns the data saved in the database.
     * @param {FactoryConfigCreateManyAndReturnArgs} args - Arguments to create many FactoryConfigs.
     * @example
     * // Create many FactoryConfigs
     * const factoryConfig = await prisma.factoryConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FactoryConfigs and only return the `id`
     * const factoryConfigWithIdOnly = await prisma.factoryConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FactoryConfigCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FactoryConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FactoryConfig.
     * @param {FactoryConfigDeleteArgs} args - Arguments to delete one FactoryConfig.
     * @example
     * // Delete one FactoryConfig
     * const FactoryConfig = await prisma.factoryConfig.delete({
     *   where: {
     *     // ... filter to delete one FactoryConfig
     *   }
     * })
     *
     */
    delete<T extends FactoryConfigDeleteArgs>(args: Prisma.SelectSubset<T, FactoryConfigDeleteArgs<ExtArgs>>): Prisma.Prisma__FactoryConfigClient<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FactoryConfig.
     * @param {FactoryConfigUpdateArgs} args - Arguments to update one FactoryConfig.
     * @example
     * // Update one FactoryConfig
     * const factoryConfig = await prisma.factoryConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FactoryConfigUpdateArgs>(args: Prisma.SelectSubset<T, FactoryConfigUpdateArgs<ExtArgs>>): Prisma.Prisma__FactoryConfigClient<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FactoryConfigs.
     * @param {FactoryConfigDeleteManyArgs} args - Arguments to filter FactoryConfigs to delete.
     * @example
     * // Delete a few FactoryConfigs
     * const { count } = await prisma.factoryConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FactoryConfigDeleteManyArgs>(args?: Prisma.SelectSubset<T, FactoryConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FactoryConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FactoryConfigs
     * const factoryConfig = await prisma.factoryConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FactoryConfigUpdateManyArgs>(args: Prisma.SelectSubset<T, FactoryConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FactoryConfigs and returns the data updated in the database.
     * @param {FactoryConfigUpdateManyAndReturnArgs} args - Arguments to update many FactoryConfigs.
     * @example
     * // Update many FactoryConfigs
     * const factoryConfig = await prisma.factoryConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FactoryConfigs and only return the `id`
     * const factoryConfigWithIdOnly = await prisma.factoryConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends FactoryConfigUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FactoryConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FactoryConfig.
     * @param {FactoryConfigUpsertArgs} args - Arguments to update or create a FactoryConfig.
     * @example
     * // Update or create a FactoryConfig
     * const factoryConfig = await prisma.factoryConfig.upsert({
     *   create: {
     *     // ... data to create a FactoryConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FactoryConfig we want to update
     *   }
     * })
     */
    upsert<T extends FactoryConfigUpsertArgs>(args: Prisma.SelectSubset<T, FactoryConfigUpsertArgs<ExtArgs>>): Prisma.Prisma__FactoryConfigClient<runtime.Types.Result.GetResult<Prisma.$FactoryConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FactoryConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryConfigCountArgs} args - Arguments to filter FactoryConfigs to count.
     * @example
     * // Count the number of FactoryConfigs
     * const count = await prisma.factoryConfig.count({
     *   where: {
     *     // ... the filter for the FactoryConfigs we want to count
     *   }
     * })
    **/
    count<T extends FactoryConfigCountArgs>(args?: Prisma.Subset<T, FactoryConfigCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FactoryConfigCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FactoryConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FactoryConfigAggregateArgs>(args: Prisma.Subset<T, FactoryConfigAggregateArgs>): Prisma.PrismaPromise<GetFactoryConfigAggregateType<T>>;
    /**
     * Group by FactoryConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryConfigGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FactoryConfigGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FactoryConfigGroupByArgs['orderBy'];
    } : {
        orderBy?: FactoryConfigGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FactoryConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFactoryConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FactoryConfig model
     */
    readonly fields: FactoryConfigFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FactoryConfig.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FactoryConfigClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the FactoryConfig model
 */
export interface FactoryConfigFieldRefs {
    readonly id: Prisma.FieldRef<"FactoryConfig", 'String'>;
    readonly primaryLanguage: Prisma.FieldRef<"FactoryConfig", 'String'>;
    readonly supportedLanguages: Prisma.FieldRef<"FactoryConfig", 'String[]'>;
    readonly hierarchyLevels: Prisma.FieldRef<"FactoryConfig", 'Json'>;
    readonly defaultMaxDepth: Prisma.FieldRef<"FactoryConfig", 'Int'>;
    readonly statusReasonOptions: Prisma.FieldRef<"FactoryConfig", 'Json'>;
    readonly maintenanceDisciplines: Prisma.FieldRef<"FactoryConfig", 'Json'>;
    readonly maintenanceTypes: Prisma.FieldRef<"FactoryConfig", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"FactoryConfig", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FactoryConfig", 'DateTime'>;
}
/**
 * FactoryConfig findUnique
 */
export type FactoryConfigFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * Filter, which FactoryConfig to fetch.
     */
    where: Prisma.FactoryConfigWhereUniqueInput;
};
/**
 * FactoryConfig findUniqueOrThrow
 */
export type FactoryConfigFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * Filter, which FactoryConfig to fetch.
     */
    where: Prisma.FactoryConfigWhereUniqueInput;
};
/**
 * FactoryConfig findFirst
 */
export type FactoryConfigFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * Filter, which FactoryConfig to fetch.
     */
    where?: Prisma.FactoryConfigWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FactoryConfigs to fetch.
     */
    orderBy?: Prisma.FactoryConfigOrderByWithRelationInput | Prisma.FactoryConfigOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FactoryConfigs.
     */
    cursor?: Prisma.FactoryConfigWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FactoryConfigs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FactoryConfigs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FactoryConfigs.
     */
    distinct?: Prisma.FactoryConfigScalarFieldEnum | Prisma.FactoryConfigScalarFieldEnum[];
};
/**
 * FactoryConfig findFirstOrThrow
 */
export type FactoryConfigFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * Filter, which FactoryConfig to fetch.
     */
    where?: Prisma.FactoryConfigWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FactoryConfigs to fetch.
     */
    orderBy?: Prisma.FactoryConfigOrderByWithRelationInput | Prisma.FactoryConfigOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FactoryConfigs.
     */
    cursor?: Prisma.FactoryConfigWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FactoryConfigs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FactoryConfigs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FactoryConfigs.
     */
    distinct?: Prisma.FactoryConfigScalarFieldEnum | Prisma.FactoryConfigScalarFieldEnum[];
};
/**
 * FactoryConfig findMany
 */
export type FactoryConfigFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * Filter, which FactoryConfigs to fetch.
     */
    where?: Prisma.FactoryConfigWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FactoryConfigs to fetch.
     */
    orderBy?: Prisma.FactoryConfigOrderByWithRelationInput | Prisma.FactoryConfigOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FactoryConfigs.
     */
    cursor?: Prisma.FactoryConfigWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FactoryConfigs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FactoryConfigs.
     */
    skip?: number;
    distinct?: Prisma.FactoryConfigScalarFieldEnum | Prisma.FactoryConfigScalarFieldEnum[];
};
/**
 * FactoryConfig create
 */
export type FactoryConfigCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * The data needed to create a FactoryConfig.
     */
    data: Prisma.XOR<Prisma.FactoryConfigCreateInput, Prisma.FactoryConfigUncheckedCreateInput>;
};
/**
 * FactoryConfig createMany
 */
export type FactoryConfigCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FactoryConfigs.
     */
    data: Prisma.FactoryConfigCreateManyInput | Prisma.FactoryConfigCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FactoryConfig createManyAndReturn
 */
export type FactoryConfigCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * The data used to create many FactoryConfigs.
     */
    data: Prisma.FactoryConfigCreateManyInput | Prisma.FactoryConfigCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FactoryConfig update
 */
export type FactoryConfigUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * The data needed to update a FactoryConfig.
     */
    data: Prisma.XOR<Prisma.FactoryConfigUpdateInput, Prisma.FactoryConfigUncheckedUpdateInput>;
    /**
     * Choose, which FactoryConfig to update.
     */
    where: Prisma.FactoryConfigWhereUniqueInput;
};
/**
 * FactoryConfig updateMany
 */
export type FactoryConfigUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FactoryConfigs.
     */
    data: Prisma.XOR<Prisma.FactoryConfigUpdateManyMutationInput, Prisma.FactoryConfigUncheckedUpdateManyInput>;
    /**
     * Filter which FactoryConfigs to update
     */
    where?: Prisma.FactoryConfigWhereInput;
    /**
     * Limit how many FactoryConfigs to update.
     */
    limit?: number;
};
/**
 * FactoryConfig updateManyAndReturn
 */
export type FactoryConfigUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * The data used to update FactoryConfigs.
     */
    data: Prisma.XOR<Prisma.FactoryConfigUpdateManyMutationInput, Prisma.FactoryConfigUncheckedUpdateManyInput>;
    /**
     * Filter which FactoryConfigs to update
     */
    where?: Prisma.FactoryConfigWhereInput;
    /**
     * Limit how many FactoryConfigs to update.
     */
    limit?: number;
};
/**
 * FactoryConfig upsert
 */
export type FactoryConfigUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * The filter to search for the FactoryConfig to update in case it exists.
     */
    where: Prisma.FactoryConfigWhereUniqueInput;
    /**
     * In case the FactoryConfig found by the `where` argument doesn't exist, create a new FactoryConfig with this data.
     */
    create: Prisma.XOR<Prisma.FactoryConfigCreateInput, Prisma.FactoryConfigUncheckedCreateInput>;
    /**
     * In case the FactoryConfig was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FactoryConfigUpdateInput, Prisma.FactoryConfigUncheckedUpdateInput>;
};
/**
 * FactoryConfig delete
 */
export type FactoryConfigDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
    /**
     * Filter which FactoryConfig to delete.
     */
    where: Prisma.FactoryConfigWhereUniqueInput;
};
/**
 * FactoryConfig deleteMany
 */
export type FactoryConfigDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FactoryConfigs to delete
     */
    where?: Prisma.FactoryConfigWhereInput;
    /**
     * Limit how many FactoryConfigs to delete.
     */
    limit?: number;
};
/**
 * FactoryConfig without action
 */
export type FactoryConfigDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryConfig
     */
    select?: Prisma.FactoryConfigSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FactoryConfig
     */
    omit?: Prisma.FactoryConfigOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=FactoryConfig.d.ts.map