import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model SystemInsight
 *
 */
export type SystemInsightModel = runtime.Types.Result.DefaultSelection<Prisma.$SystemInsightPayload>;
export type AggregateSystemInsight = {
    _count: SystemInsightCountAggregateOutputType | null;
    _min: SystemInsightMinAggregateOutputType | null;
    _max: SystemInsightMaxAggregateOutputType | null;
};
export type SystemInsightMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    content: string | null;
    category: $Enums.InsightCategory | null;
    priority: $Enums.InsightPriority | null;
    status: $Enums.InsightStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SystemInsightMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    content: string | null;
    category: $Enums.InsightCategory | null;
    priority: $Enums.InsightPriority | null;
    status: $Enums.InsightStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SystemInsightCountAggregateOutputType = {
    id: number;
    title: number;
    content: number;
    category: number;
    priority: number;
    status: number;
    metadata: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SystemInsightMinAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    category?: true;
    priority?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SystemInsightMaxAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    category?: true;
    priority?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SystemInsightCountAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    category?: true;
    priority?: true;
    status?: true;
    metadata?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SystemInsightAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SystemInsight to aggregate.
     */
    where?: Prisma.SystemInsightWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SystemInsights to fetch.
     */
    orderBy?: Prisma.SystemInsightOrderByWithRelationInput | Prisma.SystemInsightOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SystemInsightWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SystemInsights from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SystemInsights.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SystemInsights
    **/
    _count?: true | SystemInsightCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SystemInsightMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SystemInsightMaxAggregateInputType;
};
export type GetSystemInsightAggregateType<T extends SystemInsightAggregateArgs> = {
    [P in keyof T & keyof AggregateSystemInsight]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSystemInsight[P]> : Prisma.GetScalarType<T[P], AggregateSystemInsight[P]>;
};
export type SystemInsightGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemInsightWhereInput;
    orderBy?: Prisma.SystemInsightOrderByWithAggregationInput | Prisma.SystemInsightOrderByWithAggregationInput[];
    by: Prisma.SystemInsightScalarFieldEnum[] | Prisma.SystemInsightScalarFieldEnum;
    having?: Prisma.SystemInsightScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SystemInsightCountAggregateInputType | true;
    _min?: SystemInsightMinAggregateInputType;
    _max?: SystemInsightMaxAggregateInputType;
};
export type SystemInsightGroupByOutputType = {
    id: string;
    title: string;
    content: string;
    category: $Enums.InsightCategory;
    priority: $Enums.InsightPriority;
    status: $Enums.InsightStatus;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: SystemInsightCountAggregateOutputType | null;
    _min: SystemInsightMinAggregateOutputType | null;
    _max: SystemInsightMaxAggregateOutputType | null;
};
type GetSystemInsightGroupByPayload<T extends SystemInsightGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SystemInsightGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SystemInsightGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SystemInsightGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SystemInsightGroupByOutputType[P]>;
}>>;
export type SystemInsightWhereInput = {
    AND?: Prisma.SystemInsightWhereInput | Prisma.SystemInsightWhereInput[];
    OR?: Prisma.SystemInsightWhereInput[];
    NOT?: Prisma.SystemInsightWhereInput | Prisma.SystemInsightWhereInput[];
    id?: Prisma.StringFilter<"SystemInsight"> | string;
    title?: Prisma.StringFilter<"SystemInsight"> | string;
    content?: Prisma.StringFilter<"SystemInsight"> | string;
    category?: Prisma.EnumInsightCategoryFilter<"SystemInsight"> | $Enums.InsightCategory;
    priority?: Prisma.EnumInsightPriorityFilter<"SystemInsight"> | $Enums.InsightPriority;
    status?: Prisma.EnumInsightStatusFilter<"SystemInsight"> | $Enums.InsightStatus;
    metadata?: Prisma.JsonNullableFilter<"SystemInsight">;
    createdAt?: Prisma.DateTimeFilter<"SystemInsight"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SystemInsight"> | Date | string;
};
export type SystemInsightOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SystemInsightWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SystemInsightWhereInput | Prisma.SystemInsightWhereInput[];
    OR?: Prisma.SystemInsightWhereInput[];
    NOT?: Prisma.SystemInsightWhereInput | Prisma.SystemInsightWhereInput[];
    title?: Prisma.StringFilter<"SystemInsight"> | string;
    content?: Prisma.StringFilter<"SystemInsight"> | string;
    category?: Prisma.EnumInsightCategoryFilter<"SystemInsight"> | $Enums.InsightCategory;
    priority?: Prisma.EnumInsightPriorityFilter<"SystemInsight"> | $Enums.InsightPriority;
    status?: Prisma.EnumInsightStatusFilter<"SystemInsight"> | $Enums.InsightStatus;
    metadata?: Prisma.JsonNullableFilter<"SystemInsight">;
    createdAt?: Prisma.DateTimeFilter<"SystemInsight"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SystemInsight"> | Date | string;
}, "id">;
export type SystemInsightOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SystemInsightCountOrderByAggregateInput;
    _max?: Prisma.SystemInsightMaxOrderByAggregateInput;
    _min?: Prisma.SystemInsightMinOrderByAggregateInput;
};
export type SystemInsightScalarWhereWithAggregatesInput = {
    AND?: Prisma.SystemInsightScalarWhereWithAggregatesInput | Prisma.SystemInsightScalarWhereWithAggregatesInput[];
    OR?: Prisma.SystemInsightScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SystemInsightScalarWhereWithAggregatesInput | Prisma.SystemInsightScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SystemInsight"> | string;
    title?: Prisma.StringWithAggregatesFilter<"SystemInsight"> | string;
    content?: Prisma.StringWithAggregatesFilter<"SystemInsight"> | string;
    category?: Prisma.EnumInsightCategoryWithAggregatesFilter<"SystemInsight"> | $Enums.InsightCategory;
    priority?: Prisma.EnumInsightPriorityWithAggregatesFilter<"SystemInsight"> | $Enums.InsightPriority;
    status?: Prisma.EnumInsightStatusWithAggregatesFilter<"SystemInsight"> | $Enums.InsightStatus;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"SystemInsight">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SystemInsight"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SystemInsight"> | Date | string;
};
export type SystemInsightCreateInput = {
    id?: string;
    title: string;
    content: string;
    category: $Enums.InsightCategory;
    priority: $Enums.InsightPriority;
    status?: $Enums.InsightStatus;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemInsightUncheckedCreateInput = {
    id?: string;
    title: string;
    content: string;
    category: $Enums.InsightCategory;
    priority: $Enums.InsightPriority;
    status?: $Enums.InsightStatus;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemInsightUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumInsightCategoryFieldUpdateOperationsInput | $Enums.InsightCategory;
    priority?: Prisma.EnumInsightPriorityFieldUpdateOperationsInput | $Enums.InsightPriority;
    status?: Prisma.EnumInsightStatusFieldUpdateOperationsInput | $Enums.InsightStatus;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemInsightUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumInsightCategoryFieldUpdateOperationsInput | $Enums.InsightCategory;
    priority?: Prisma.EnumInsightPriorityFieldUpdateOperationsInput | $Enums.InsightPriority;
    status?: Prisma.EnumInsightStatusFieldUpdateOperationsInput | $Enums.InsightStatus;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemInsightCreateManyInput = {
    id?: string;
    title: string;
    content: string;
    category: $Enums.InsightCategory;
    priority: $Enums.InsightPriority;
    status?: $Enums.InsightStatus;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemInsightUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumInsightCategoryFieldUpdateOperationsInput | $Enums.InsightCategory;
    priority?: Prisma.EnumInsightPriorityFieldUpdateOperationsInput | $Enums.InsightPriority;
    status?: Prisma.EnumInsightStatusFieldUpdateOperationsInput | $Enums.InsightStatus;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemInsightUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumInsightCategoryFieldUpdateOperationsInput | $Enums.InsightCategory;
    priority?: Prisma.EnumInsightPriorityFieldUpdateOperationsInput | $Enums.InsightPriority;
    status?: Prisma.EnumInsightStatusFieldUpdateOperationsInput | $Enums.InsightStatus;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemInsightCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SystemInsightMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SystemInsightMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EnumInsightCategoryFieldUpdateOperationsInput = {
    set?: $Enums.InsightCategory;
};
export type EnumInsightPriorityFieldUpdateOperationsInput = {
    set?: $Enums.InsightPriority;
};
export type EnumInsightStatusFieldUpdateOperationsInput = {
    set?: $Enums.InsightStatus;
};
export type SystemInsightSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    category?: boolean;
    priority?: boolean;
    status?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["systemInsight"]>;
export type SystemInsightSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    category?: boolean;
    priority?: boolean;
    status?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["systemInsight"]>;
export type SystemInsightSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    category?: boolean;
    priority?: boolean;
    status?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["systemInsight"]>;
export type SystemInsightSelectScalar = {
    id?: boolean;
    title?: boolean;
    content?: boolean;
    category?: boolean;
    priority?: boolean;
    status?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SystemInsightOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "content" | "category" | "priority" | "status" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["systemInsight"]>;
export type $SystemInsightPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SystemInsight";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        content: string;
        category: $Enums.InsightCategory;
        priority: $Enums.InsightPriority;
        status: $Enums.InsightStatus;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["systemInsight"]>;
    composites: {};
};
export type SystemInsightGetPayload<S extends boolean | null | undefined | SystemInsightDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload, S>;
export type SystemInsightCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SystemInsightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SystemInsightCountAggregateInputType | true;
};
export interface SystemInsightDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SystemInsight'];
        meta: {
            name: 'SystemInsight';
        };
    };
    /**
     * Find zero or one SystemInsight that matches the filter.
     * @param {SystemInsightFindUniqueArgs} args - Arguments to find a SystemInsight
     * @example
     * // Get one SystemInsight
     * const systemInsight = await prisma.systemInsight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemInsightFindUniqueArgs>(args: Prisma.SelectSubset<T, SystemInsightFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SystemInsightClient<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SystemInsight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemInsightFindUniqueOrThrowArgs} args - Arguments to find a SystemInsight
     * @example
     * // Get one SystemInsight
     * const systemInsight = await prisma.systemInsight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemInsightFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SystemInsightFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SystemInsightClient<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SystemInsight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemInsightFindFirstArgs} args - Arguments to find a SystemInsight
     * @example
     * // Get one SystemInsight
     * const systemInsight = await prisma.systemInsight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemInsightFindFirstArgs>(args?: Prisma.SelectSubset<T, SystemInsightFindFirstArgs<ExtArgs>>): Prisma.Prisma__SystemInsightClient<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SystemInsight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemInsightFindFirstOrThrowArgs} args - Arguments to find a SystemInsight
     * @example
     * // Get one SystemInsight
     * const systemInsight = await prisma.systemInsight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemInsightFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SystemInsightFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SystemInsightClient<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SystemInsights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemInsightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemInsights
     * const systemInsights = await prisma.systemInsight.findMany()
     *
     * // Get first 10 SystemInsights
     * const systemInsights = await prisma.systemInsight.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const systemInsightWithIdOnly = await prisma.systemInsight.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SystemInsightFindManyArgs>(args?: Prisma.SelectSubset<T, SystemInsightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SystemInsight.
     * @param {SystemInsightCreateArgs} args - Arguments to create a SystemInsight.
     * @example
     * // Create one SystemInsight
     * const SystemInsight = await prisma.systemInsight.create({
     *   data: {
     *     // ... data to create a SystemInsight
     *   }
     * })
     *
     */
    create<T extends SystemInsightCreateArgs>(args: Prisma.SelectSubset<T, SystemInsightCreateArgs<ExtArgs>>): Prisma.Prisma__SystemInsightClient<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SystemInsights.
     * @param {SystemInsightCreateManyArgs} args - Arguments to create many SystemInsights.
     * @example
     * // Create many SystemInsights
     * const systemInsight = await prisma.systemInsight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SystemInsightCreateManyArgs>(args?: Prisma.SelectSubset<T, SystemInsightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SystemInsights and returns the data saved in the database.
     * @param {SystemInsightCreateManyAndReturnArgs} args - Arguments to create many SystemInsights.
     * @example
     * // Create many SystemInsights
     * const systemInsight = await prisma.systemInsight.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SystemInsights and only return the `id`
     * const systemInsightWithIdOnly = await prisma.systemInsight.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SystemInsightCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SystemInsightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SystemInsight.
     * @param {SystemInsightDeleteArgs} args - Arguments to delete one SystemInsight.
     * @example
     * // Delete one SystemInsight
     * const SystemInsight = await prisma.systemInsight.delete({
     *   where: {
     *     // ... filter to delete one SystemInsight
     *   }
     * })
     *
     */
    delete<T extends SystemInsightDeleteArgs>(args: Prisma.SelectSubset<T, SystemInsightDeleteArgs<ExtArgs>>): Prisma.Prisma__SystemInsightClient<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SystemInsight.
     * @param {SystemInsightUpdateArgs} args - Arguments to update one SystemInsight.
     * @example
     * // Update one SystemInsight
     * const systemInsight = await prisma.systemInsight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SystemInsightUpdateArgs>(args: Prisma.SelectSubset<T, SystemInsightUpdateArgs<ExtArgs>>): Prisma.Prisma__SystemInsightClient<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SystemInsights.
     * @param {SystemInsightDeleteManyArgs} args - Arguments to filter SystemInsights to delete.
     * @example
     * // Delete a few SystemInsights
     * const { count } = await prisma.systemInsight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SystemInsightDeleteManyArgs>(args?: Prisma.SelectSubset<T, SystemInsightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SystemInsights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemInsightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemInsights
     * const systemInsight = await prisma.systemInsight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SystemInsightUpdateManyArgs>(args: Prisma.SelectSubset<T, SystemInsightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SystemInsights and returns the data updated in the database.
     * @param {SystemInsightUpdateManyAndReturnArgs} args - Arguments to update many SystemInsights.
     * @example
     * // Update many SystemInsights
     * const systemInsight = await prisma.systemInsight.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SystemInsights and only return the `id`
     * const systemInsightWithIdOnly = await prisma.systemInsight.updateManyAndReturn({
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
    updateManyAndReturn<T extends SystemInsightUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SystemInsightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SystemInsight.
     * @param {SystemInsightUpsertArgs} args - Arguments to update or create a SystemInsight.
     * @example
     * // Update or create a SystemInsight
     * const systemInsight = await prisma.systemInsight.upsert({
     *   create: {
     *     // ... data to create a SystemInsight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemInsight we want to update
     *   }
     * })
     */
    upsert<T extends SystemInsightUpsertArgs>(args: Prisma.SelectSubset<T, SystemInsightUpsertArgs<ExtArgs>>): Prisma.Prisma__SystemInsightClient<runtime.Types.Result.GetResult<Prisma.$SystemInsightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SystemInsights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemInsightCountArgs} args - Arguments to filter SystemInsights to count.
     * @example
     * // Count the number of SystemInsights
     * const count = await prisma.systemInsight.count({
     *   where: {
     *     // ... the filter for the SystemInsights we want to count
     *   }
     * })
    **/
    count<T extends SystemInsightCountArgs>(args?: Prisma.Subset<T, SystemInsightCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SystemInsightCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SystemInsight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemInsightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SystemInsightAggregateArgs>(args: Prisma.Subset<T, SystemInsightAggregateArgs>): Prisma.PrismaPromise<GetSystemInsightAggregateType<T>>;
    /**
     * Group by SystemInsight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemInsightGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SystemInsightGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SystemInsightGroupByArgs['orderBy'];
    } : {
        orderBy?: SystemInsightGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SystemInsightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemInsightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SystemInsight model
     */
    readonly fields: SystemInsightFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SystemInsight.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SystemInsightClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the SystemInsight model
 */
export interface SystemInsightFieldRefs {
    readonly id: Prisma.FieldRef<"SystemInsight", 'String'>;
    readonly title: Prisma.FieldRef<"SystemInsight", 'String'>;
    readonly content: Prisma.FieldRef<"SystemInsight", 'String'>;
    readonly category: Prisma.FieldRef<"SystemInsight", 'InsightCategory'>;
    readonly priority: Prisma.FieldRef<"SystemInsight", 'InsightPriority'>;
    readonly status: Prisma.FieldRef<"SystemInsight", 'InsightStatus'>;
    readonly metadata: Prisma.FieldRef<"SystemInsight", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"SystemInsight", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SystemInsight", 'DateTime'>;
}
/**
 * SystemInsight findUnique
 */
export type SystemInsightFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * Filter, which SystemInsight to fetch.
     */
    where: Prisma.SystemInsightWhereUniqueInput;
};
/**
 * SystemInsight findUniqueOrThrow
 */
export type SystemInsightFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * Filter, which SystemInsight to fetch.
     */
    where: Prisma.SystemInsightWhereUniqueInput;
};
/**
 * SystemInsight findFirst
 */
export type SystemInsightFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * Filter, which SystemInsight to fetch.
     */
    where?: Prisma.SystemInsightWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SystemInsights to fetch.
     */
    orderBy?: Prisma.SystemInsightOrderByWithRelationInput | Prisma.SystemInsightOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SystemInsights.
     */
    cursor?: Prisma.SystemInsightWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SystemInsights from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SystemInsights.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SystemInsights.
     */
    distinct?: Prisma.SystemInsightScalarFieldEnum | Prisma.SystemInsightScalarFieldEnum[];
};
/**
 * SystemInsight findFirstOrThrow
 */
export type SystemInsightFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * Filter, which SystemInsight to fetch.
     */
    where?: Prisma.SystemInsightWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SystemInsights to fetch.
     */
    orderBy?: Prisma.SystemInsightOrderByWithRelationInput | Prisma.SystemInsightOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SystemInsights.
     */
    cursor?: Prisma.SystemInsightWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SystemInsights from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SystemInsights.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SystemInsights.
     */
    distinct?: Prisma.SystemInsightScalarFieldEnum | Prisma.SystemInsightScalarFieldEnum[];
};
/**
 * SystemInsight findMany
 */
export type SystemInsightFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * Filter, which SystemInsights to fetch.
     */
    where?: Prisma.SystemInsightWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SystemInsights to fetch.
     */
    orderBy?: Prisma.SystemInsightOrderByWithRelationInput | Prisma.SystemInsightOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SystemInsights.
     */
    cursor?: Prisma.SystemInsightWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SystemInsights from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SystemInsights.
     */
    skip?: number;
    distinct?: Prisma.SystemInsightScalarFieldEnum | Prisma.SystemInsightScalarFieldEnum[];
};
/**
 * SystemInsight create
 */
export type SystemInsightCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * The data needed to create a SystemInsight.
     */
    data: Prisma.XOR<Prisma.SystemInsightCreateInput, Prisma.SystemInsightUncheckedCreateInput>;
};
/**
 * SystemInsight createMany
 */
export type SystemInsightCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemInsights.
     */
    data: Prisma.SystemInsightCreateManyInput | Prisma.SystemInsightCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SystemInsight createManyAndReturn
 */
export type SystemInsightCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * The data used to create many SystemInsights.
     */
    data: Prisma.SystemInsightCreateManyInput | Prisma.SystemInsightCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SystemInsight update
 */
export type SystemInsightUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * The data needed to update a SystemInsight.
     */
    data: Prisma.XOR<Prisma.SystemInsightUpdateInput, Prisma.SystemInsightUncheckedUpdateInput>;
    /**
     * Choose, which SystemInsight to update.
     */
    where: Prisma.SystemInsightWhereUniqueInput;
};
/**
 * SystemInsight updateMany
 */
export type SystemInsightUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemInsights.
     */
    data: Prisma.XOR<Prisma.SystemInsightUpdateManyMutationInput, Prisma.SystemInsightUncheckedUpdateManyInput>;
    /**
     * Filter which SystemInsights to update
     */
    where?: Prisma.SystemInsightWhereInput;
    /**
     * Limit how many SystemInsights to update.
     */
    limit?: number;
};
/**
 * SystemInsight updateManyAndReturn
 */
export type SystemInsightUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * The data used to update SystemInsights.
     */
    data: Prisma.XOR<Prisma.SystemInsightUpdateManyMutationInput, Prisma.SystemInsightUncheckedUpdateManyInput>;
    /**
     * Filter which SystemInsights to update
     */
    where?: Prisma.SystemInsightWhereInput;
    /**
     * Limit how many SystemInsights to update.
     */
    limit?: number;
};
/**
 * SystemInsight upsert
 */
export type SystemInsightUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * The filter to search for the SystemInsight to update in case it exists.
     */
    where: Prisma.SystemInsightWhereUniqueInput;
    /**
     * In case the SystemInsight found by the `where` argument doesn't exist, create a new SystemInsight with this data.
     */
    create: Prisma.XOR<Prisma.SystemInsightCreateInput, Prisma.SystemInsightUncheckedCreateInput>;
    /**
     * In case the SystemInsight was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SystemInsightUpdateInput, Prisma.SystemInsightUncheckedUpdateInput>;
};
/**
 * SystemInsight delete
 */
export type SystemInsightDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
    /**
     * Filter which SystemInsight to delete.
     */
    where: Prisma.SystemInsightWhereUniqueInput;
};
/**
 * SystemInsight deleteMany
 */
export type SystemInsightDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SystemInsights to delete
     */
    where?: Prisma.SystemInsightWhereInput;
    /**
     * Limit how many SystemInsights to delete.
     */
    limit?: number;
};
/**
 * SystemInsight without action
 */
export type SystemInsightDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemInsight
     */
    select?: Prisma.SystemInsightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemInsight
     */
    omit?: Prisma.SystemInsightOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=SystemInsight.d.ts.map