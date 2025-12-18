import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model VisionBoard
 *
 */
export type VisionBoardModel = runtime.Types.Result.DefaultSelection<Prisma.$VisionBoardPayload>;
export type AggregateVisionBoard = {
    _count: VisionBoardCountAggregateOutputType | null;
    _avg: VisionBoardAvgAggregateOutputType | null;
    _sum: VisionBoardSumAggregateOutputType | null;
    _min: VisionBoardMinAggregateOutputType | null;
    _max: VisionBoardMaxAggregateOutputType | null;
};
export type VisionBoardAvgAggregateOutputType = {
    columns: number | null;
    rows: number | null;
    gap: number | null;
};
export type VisionBoardSumAggregateOutputType = {
    columns: number | null;
    rows: number | null;
    gap: number | null;
};
export type VisionBoardMinAggregateOutputType = {
    id: string | null;
    columns: number | null;
    rows: number | null;
    gap: number | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VisionBoardMaxAggregateOutputType = {
    id: string | null;
    columns: number | null;
    rows: number | null;
    gap: number | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VisionBoardCountAggregateOutputType = {
    id: number;
    columns: number;
    rows: number;
    gap: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type VisionBoardAvgAggregateInputType = {
    columns?: true;
    rows?: true;
    gap?: true;
};
export type VisionBoardSumAggregateInputType = {
    columns?: true;
    rows?: true;
    gap?: true;
};
export type VisionBoardMinAggregateInputType = {
    id?: true;
    columns?: true;
    rows?: true;
    gap?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VisionBoardMaxAggregateInputType = {
    id?: true;
    columns?: true;
    rows?: true;
    gap?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VisionBoardCountAggregateInputType = {
    id?: true;
    columns?: true;
    rows?: true;
    gap?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type VisionBoardAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VisionBoard to aggregate.
     */
    where?: Prisma.VisionBoardWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VisionBoards to fetch.
     */
    orderBy?: Prisma.VisionBoardOrderByWithRelationInput | Prisma.VisionBoardOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.VisionBoardWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VisionBoards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VisionBoards.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned VisionBoards
    **/
    _count?: true | VisionBoardCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: VisionBoardAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: VisionBoardSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: VisionBoardMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: VisionBoardMaxAggregateInputType;
};
export type GetVisionBoardAggregateType<T extends VisionBoardAggregateArgs> = {
    [P in keyof T & keyof AggregateVisionBoard]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVisionBoard[P]> : Prisma.GetScalarType<T[P], AggregateVisionBoard[P]>;
};
export type VisionBoardGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VisionBoardWhereInput;
    orderBy?: Prisma.VisionBoardOrderByWithAggregationInput | Prisma.VisionBoardOrderByWithAggregationInput[];
    by: Prisma.VisionBoardScalarFieldEnum[] | Prisma.VisionBoardScalarFieldEnum;
    having?: Prisma.VisionBoardScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VisionBoardCountAggregateInputType | true;
    _avg?: VisionBoardAvgAggregateInputType;
    _sum?: VisionBoardSumAggregateInputType;
    _min?: VisionBoardMinAggregateInputType;
    _max?: VisionBoardMaxAggregateInputType;
};
export type VisionBoardGroupByOutputType = {
    id: string;
    columns: number;
    rows: number;
    gap: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: VisionBoardCountAggregateOutputType | null;
    _avg: VisionBoardAvgAggregateOutputType | null;
    _sum: VisionBoardSumAggregateOutputType | null;
    _min: VisionBoardMinAggregateOutputType | null;
    _max: VisionBoardMaxAggregateOutputType | null;
};
type GetVisionBoardGroupByPayload<T extends VisionBoardGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VisionBoardGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VisionBoardGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VisionBoardGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VisionBoardGroupByOutputType[P]>;
}>>;
export type VisionBoardWhereInput = {
    AND?: Prisma.VisionBoardWhereInput | Prisma.VisionBoardWhereInput[];
    OR?: Prisma.VisionBoardWhereInput[];
    NOT?: Prisma.VisionBoardWhereInput | Prisma.VisionBoardWhereInput[];
    id?: Prisma.StringFilter<"VisionBoard"> | string;
    columns?: Prisma.IntFilter<"VisionBoard"> | number;
    rows?: Prisma.IntFilter<"VisionBoard"> | number;
    gap?: Prisma.IntFilter<"VisionBoard"> | number;
    userId?: Prisma.StringFilter<"VisionBoard"> | string;
    createdAt?: Prisma.DateTimeFilter<"VisionBoard"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VisionBoard"> | Date | string;
    user?: Prisma.XOR<Prisma.User_infoScalarRelationFilter, Prisma.User_infoWhereInput>;
    items?: Prisma.VisionBoardItemListRelationFilter;
};
export type VisionBoardOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    gap?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.User_infoOrderByWithRelationInput;
    items?: Prisma.VisionBoardItemOrderByRelationAggregateInput;
};
export type VisionBoardWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VisionBoardWhereInput | Prisma.VisionBoardWhereInput[];
    OR?: Prisma.VisionBoardWhereInput[];
    NOT?: Prisma.VisionBoardWhereInput | Prisma.VisionBoardWhereInput[];
    columns?: Prisma.IntFilter<"VisionBoard"> | number;
    rows?: Prisma.IntFilter<"VisionBoard"> | number;
    gap?: Prisma.IntFilter<"VisionBoard"> | number;
    userId?: Prisma.StringFilter<"VisionBoard"> | string;
    createdAt?: Prisma.DateTimeFilter<"VisionBoard"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VisionBoard"> | Date | string;
    user?: Prisma.XOR<Prisma.User_infoScalarRelationFilter, Prisma.User_infoWhereInput>;
    items?: Prisma.VisionBoardItemListRelationFilter;
}, "id">;
export type VisionBoardOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    gap?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.VisionBoardCountOrderByAggregateInput;
    _avg?: Prisma.VisionBoardAvgOrderByAggregateInput;
    _max?: Prisma.VisionBoardMaxOrderByAggregateInput;
    _min?: Prisma.VisionBoardMinOrderByAggregateInput;
    _sum?: Prisma.VisionBoardSumOrderByAggregateInput;
};
export type VisionBoardScalarWhereWithAggregatesInput = {
    AND?: Prisma.VisionBoardScalarWhereWithAggregatesInput | Prisma.VisionBoardScalarWhereWithAggregatesInput[];
    OR?: Prisma.VisionBoardScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VisionBoardScalarWhereWithAggregatesInput | Prisma.VisionBoardScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"VisionBoard"> | string;
    columns?: Prisma.IntWithAggregatesFilter<"VisionBoard"> | number;
    rows?: Prisma.IntWithAggregatesFilter<"VisionBoard"> | number;
    gap?: Prisma.IntWithAggregatesFilter<"VisionBoard"> | number;
    userId?: Prisma.StringWithAggregatesFilter<"VisionBoard"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"VisionBoard"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"VisionBoard"> | Date | string;
};
export type VisionBoardCreateInput = {
    id?: string;
    columns: number;
    rows: number;
    gap: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.User_infoCreateNestedOneWithoutVisionBoardsInput;
    items?: Prisma.VisionBoardItemCreateNestedManyWithoutBoardInput;
};
export type VisionBoardUncheckedCreateInput = {
    id?: string;
    columns: number;
    rows: number;
    gap: number;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.VisionBoardItemUncheckedCreateNestedManyWithoutBoardInput;
};
export type VisionBoardUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    gap?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.User_infoUpdateOneRequiredWithoutVisionBoardsNestedInput;
    items?: Prisma.VisionBoardItemUpdateManyWithoutBoardNestedInput;
};
export type VisionBoardUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    gap?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.VisionBoardItemUncheckedUpdateManyWithoutBoardNestedInput;
};
export type VisionBoardCreateManyInput = {
    id?: string;
    columns: number;
    rows: number;
    gap: number;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VisionBoardUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    gap?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VisionBoardUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    gap?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VisionBoardListRelationFilter = {
    every?: Prisma.VisionBoardWhereInput;
    some?: Prisma.VisionBoardWhereInput;
    none?: Prisma.VisionBoardWhereInput;
};
export type VisionBoardOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VisionBoardCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    gap?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VisionBoardAvgOrderByAggregateInput = {
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    gap?: Prisma.SortOrder;
};
export type VisionBoardMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    gap?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VisionBoardMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    gap?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VisionBoardSumOrderByAggregateInput = {
    columns?: Prisma.SortOrder;
    rows?: Prisma.SortOrder;
    gap?: Prisma.SortOrder;
};
export type VisionBoardScalarRelationFilter = {
    is?: Prisma.VisionBoardWhereInput;
    isNot?: Prisma.VisionBoardWhereInput;
};
export type VisionBoardCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VisionBoardCreateWithoutUserInput, Prisma.VisionBoardUncheckedCreateWithoutUserInput> | Prisma.VisionBoardCreateWithoutUserInput[] | Prisma.VisionBoardUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VisionBoardCreateOrConnectWithoutUserInput | Prisma.VisionBoardCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VisionBoardCreateManyUserInputEnvelope;
    connect?: Prisma.VisionBoardWhereUniqueInput | Prisma.VisionBoardWhereUniqueInput[];
};
export type VisionBoardUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VisionBoardCreateWithoutUserInput, Prisma.VisionBoardUncheckedCreateWithoutUserInput> | Prisma.VisionBoardCreateWithoutUserInput[] | Prisma.VisionBoardUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VisionBoardCreateOrConnectWithoutUserInput | Prisma.VisionBoardCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VisionBoardCreateManyUserInputEnvelope;
    connect?: Prisma.VisionBoardWhereUniqueInput | Prisma.VisionBoardWhereUniqueInput[];
};
export type VisionBoardUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VisionBoardCreateWithoutUserInput, Prisma.VisionBoardUncheckedCreateWithoutUserInput> | Prisma.VisionBoardCreateWithoutUserInput[] | Prisma.VisionBoardUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VisionBoardCreateOrConnectWithoutUserInput | Prisma.VisionBoardCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VisionBoardUpsertWithWhereUniqueWithoutUserInput | Prisma.VisionBoardUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VisionBoardCreateManyUserInputEnvelope;
    set?: Prisma.VisionBoardWhereUniqueInput | Prisma.VisionBoardWhereUniqueInput[];
    disconnect?: Prisma.VisionBoardWhereUniqueInput | Prisma.VisionBoardWhereUniqueInput[];
    delete?: Prisma.VisionBoardWhereUniqueInput | Prisma.VisionBoardWhereUniqueInput[];
    connect?: Prisma.VisionBoardWhereUniqueInput | Prisma.VisionBoardWhereUniqueInput[];
    update?: Prisma.VisionBoardUpdateWithWhereUniqueWithoutUserInput | Prisma.VisionBoardUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VisionBoardUpdateManyWithWhereWithoutUserInput | Prisma.VisionBoardUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VisionBoardScalarWhereInput | Prisma.VisionBoardScalarWhereInput[];
};
export type VisionBoardUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VisionBoardCreateWithoutUserInput, Prisma.VisionBoardUncheckedCreateWithoutUserInput> | Prisma.VisionBoardCreateWithoutUserInput[] | Prisma.VisionBoardUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VisionBoardCreateOrConnectWithoutUserInput | Prisma.VisionBoardCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VisionBoardUpsertWithWhereUniqueWithoutUserInput | Prisma.VisionBoardUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VisionBoardCreateManyUserInputEnvelope;
    set?: Prisma.VisionBoardWhereUniqueInput | Prisma.VisionBoardWhereUniqueInput[];
    disconnect?: Prisma.VisionBoardWhereUniqueInput | Prisma.VisionBoardWhereUniqueInput[];
    delete?: Prisma.VisionBoardWhereUniqueInput | Prisma.VisionBoardWhereUniqueInput[];
    connect?: Prisma.VisionBoardWhereUniqueInput | Prisma.VisionBoardWhereUniqueInput[];
    update?: Prisma.VisionBoardUpdateWithWhereUniqueWithoutUserInput | Prisma.VisionBoardUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VisionBoardUpdateManyWithWhereWithoutUserInput | Prisma.VisionBoardUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VisionBoardScalarWhereInput | Prisma.VisionBoardScalarWhereInput[];
};
export type VisionBoardCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.VisionBoardCreateWithoutItemsInput, Prisma.VisionBoardUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.VisionBoardCreateOrConnectWithoutItemsInput;
    connect?: Prisma.VisionBoardWhereUniqueInput;
};
export type VisionBoardUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.VisionBoardCreateWithoutItemsInput, Prisma.VisionBoardUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.VisionBoardCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.VisionBoardUpsertWithoutItemsInput;
    connect?: Prisma.VisionBoardWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VisionBoardUpdateToOneWithWhereWithoutItemsInput, Prisma.VisionBoardUpdateWithoutItemsInput>, Prisma.VisionBoardUncheckedUpdateWithoutItemsInput>;
};
export type VisionBoardCreateWithoutUserInput = {
    id?: string;
    columns: number;
    rows: number;
    gap: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.VisionBoardItemCreateNestedManyWithoutBoardInput;
};
export type VisionBoardUncheckedCreateWithoutUserInput = {
    id?: string;
    columns: number;
    rows: number;
    gap: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.VisionBoardItemUncheckedCreateNestedManyWithoutBoardInput;
};
export type VisionBoardCreateOrConnectWithoutUserInput = {
    where: Prisma.VisionBoardWhereUniqueInput;
    create: Prisma.XOR<Prisma.VisionBoardCreateWithoutUserInput, Prisma.VisionBoardUncheckedCreateWithoutUserInput>;
};
export type VisionBoardCreateManyUserInputEnvelope = {
    data: Prisma.VisionBoardCreateManyUserInput | Prisma.VisionBoardCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type VisionBoardUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.VisionBoardWhereUniqueInput;
    update: Prisma.XOR<Prisma.VisionBoardUpdateWithoutUserInput, Prisma.VisionBoardUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.VisionBoardCreateWithoutUserInput, Prisma.VisionBoardUncheckedCreateWithoutUserInput>;
};
export type VisionBoardUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.VisionBoardWhereUniqueInput;
    data: Prisma.XOR<Prisma.VisionBoardUpdateWithoutUserInput, Prisma.VisionBoardUncheckedUpdateWithoutUserInput>;
};
export type VisionBoardUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.VisionBoardScalarWhereInput;
    data: Prisma.XOR<Prisma.VisionBoardUpdateManyMutationInput, Prisma.VisionBoardUncheckedUpdateManyWithoutUserInput>;
};
export type VisionBoardScalarWhereInput = {
    AND?: Prisma.VisionBoardScalarWhereInput | Prisma.VisionBoardScalarWhereInput[];
    OR?: Prisma.VisionBoardScalarWhereInput[];
    NOT?: Prisma.VisionBoardScalarWhereInput | Prisma.VisionBoardScalarWhereInput[];
    id?: Prisma.StringFilter<"VisionBoard"> | string;
    columns?: Prisma.IntFilter<"VisionBoard"> | number;
    rows?: Prisma.IntFilter<"VisionBoard"> | number;
    gap?: Prisma.IntFilter<"VisionBoard"> | number;
    userId?: Prisma.StringFilter<"VisionBoard"> | string;
    createdAt?: Prisma.DateTimeFilter<"VisionBoard"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VisionBoard"> | Date | string;
};
export type VisionBoardCreateWithoutItemsInput = {
    id?: string;
    columns: number;
    rows: number;
    gap: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.User_infoCreateNestedOneWithoutVisionBoardsInput;
};
export type VisionBoardUncheckedCreateWithoutItemsInput = {
    id?: string;
    columns: number;
    rows: number;
    gap: number;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VisionBoardCreateOrConnectWithoutItemsInput = {
    where: Prisma.VisionBoardWhereUniqueInput;
    create: Prisma.XOR<Prisma.VisionBoardCreateWithoutItemsInput, Prisma.VisionBoardUncheckedCreateWithoutItemsInput>;
};
export type VisionBoardUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.VisionBoardUpdateWithoutItemsInput, Prisma.VisionBoardUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.VisionBoardCreateWithoutItemsInput, Prisma.VisionBoardUncheckedCreateWithoutItemsInput>;
    where?: Prisma.VisionBoardWhereInput;
};
export type VisionBoardUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.VisionBoardWhereInput;
    data: Prisma.XOR<Prisma.VisionBoardUpdateWithoutItemsInput, Prisma.VisionBoardUncheckedUpdateWithoutItemsInput>;
};
export type VisionBoardUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    gap?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.User_infoUpdateOneRequiredWithoutVisionBoardsNestedInput;
};
export type VisionBoardUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    gap?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VisionBoardCreateManyUserInput = {
    id?: string;
    columns: number;
    rows: number;
    gap: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VisionBoardUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    gap?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.VisionBoardItemUpdateManyWithoutBoardNestedInput;
};
export type VisionBoardUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    gap?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.VisionBoardItemUncheckedUpdateManyWithoutBoardNestedInput;
};
export type VisionBoardUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    columns?: Prisma.IntFieldUpdateOperationsInput | number;
    rows?: Prisma.IntFieldUpdateOperationsInput | number;
    gap?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type VisionBoardCountOutputType
 */
export type VisionBoardCountOutputType = {
    items: number;
};
export type VisionBoardCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | VisionBoardCountOutputTypeCountItemsArgs;
};
/**
 * VisionBoardCountOutputType without action
 */
export type VisionBoardCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoardCountOutputType
     */
    select?: Prisma.VisionBoardCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * VisionBoardCountOutputType without action
 */
export type VisionBoardCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VisionBoardItemWhereInput;
};
export type VisionBoardSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    columns?: boolean;
    rows?: boolean;
    gap?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.VisionBoard$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.VisionBoardCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["visionBoard"]>;
export type VisionBoardSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    columns?: boolean;
    rows?: boolean;
    gap?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["visionBoard"]>;
export type VisionBoardSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    columns?: boolean;
    rows?: boolean;
    gap?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["visionBoard"]>;
export type VisionBoardSelectScalar = {
    id?: boolean;
    columns?: boolean;
    rows?: boolean;
    gap?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type VisionBoardOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "columns" | "rows" | "gap" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["visionBoard"]>;
export type VisionBoardInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.VisionBoard$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.VisionBoardCountOutputTypeDefaultArgs<ExtArgs>;
};
export type VisionBoardIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
};
export type VisionBoardIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
};
export type $VisionBoardPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VisionBoard";
    objects: {
        user: Prisma.$User_infoPayload<ExtArgs>;
        items: Prisma.$VisionBoardItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        columns: number;
        rows: number;
        gap: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["visionBoard"]>;
    composites: {};
};
export type VisionBoardGetPayload<S extends boolean | null | undefined | VisionBoardDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload, S>;
export type VisionBoardCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VisionBoardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VisionBoardCountAggregateInputType | true;
};
export interface VisionBoardDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VisionBoard'];
        meta: {
            name: 'VisionBoard';
        };
    };
    /**
     * Find zero or one VisionBoard that matches the filter.
     * @param {VisionBoardFindUniqueArgs} args - Arguments to find a VisionBoard
     * @example
     * // Get one VisionBoard
     * const visionBoard = await prisma.visionBoard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VisionBoardFindUniqueArgs>(args: Prisma.SelectSubset<T, VisionBoardFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VisionBoardClient<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one VisionBoard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VisionBoardFindUniqueOrThrowArgs} args - Arguments to find a VisionBoard
     * @example
     * // Get one VisionBoard
     * const visionBoard = await prisma.visionBoard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VisionBoardFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VisionBoardFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VisionBoardClient<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VisionBoard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisionBoardFindFirstArgs} args - Arguments to find a VisionBoard
     * @example
     * // Get one VisionBoard
     * const visionBoard = await prisma.visionBoard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VisionBoardFindFirstArgs>(args?: Prisma.SelectSubset<T, VisionBoardFindFirstArgs<ExtArgs>>): Prisma.Prisma__VisionBoardClient<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VisionBoard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisionBoardFindFirstOrThrowArgs} args - Arguments to find a VisionBoard
     * @example
     * // Get one VisionBoard
     * const visionBoard = await prisma.visionBoard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VisionBoardFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VisionBoardFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VisionBoardClient<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more VisionBoards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisionBoardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VisionBoards
     * const visionBoards = await prisma.visionBoard.findMany()
     *
     * // Get first 10 VisionBoards
     * const visionBoards = await prisma.visionBoard.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const visionBoardWithIdOnly = await prisma.visionBoard.findMany({ select: { id: true } })
     *
     */
    findMany<T extends VisionBoardFindManyArgs>(args?: Prisma.SelectSubset<T, VisionBoardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a VisionBoard.
     * @param {VisionBoardCreateArgs} args - Arguments to create a VisionBoard.
     * @example
     * // Create one VisionBoard
     * const VisionBoard = await prisma.visionBoard.create({
     *   data: {
     *     // ... data to create a VisionBoard
     *   }
     * })
     *
     */
    create<T extends VisionBoardCreateArgs>(args: Prisma.SelectSubset<T, VisionBoardCreateArgs<ExtArgs>>): Prisma.Prisma__VisionBoardClient<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many VisionBoards.
     * @param {VisionBoardCreateManyArgs} args - Arguments to create many VisionBoards.
     * @example
     * // Create many VisionBoards
     * const visionBoard = await prisma.visionBoard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VisionBoardCreateManyArgs>(args?: Prisma.SelectSubset<T, VisionBoardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many VisionBoards and returns the data saved in the database.
     * @param {VisionBoardCreateManyAndReturnArgs} args - Arguments to create many VisionBoards.
     * @example
     * // Create many VisionBoards
     * const visionBoard = await prisma.visionBoard.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many VisionBoards and only return the `id`
     * const visionBoardWithIdOnly = await prisma.visionBoard.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VisionBoardCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VisionBoardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a VisionBoard.
     * @param {VisionBoardDeleteArgs} args - Arguments to delete one VisionBoard.
     * @example
     * // Delete one VisionBoard
     * const VisionBoard = await prisma.visionBoard.delete({
     *   where: {
     *     // ... filter to delete one VisionBoard
     *   }
     * })
     *
     */
    delete<T extends VisionBoardDeleteArgs>(args: Prisma.SelectSubset<T, VisionBoardDeleteArgs<ExtArgs>>): Prisma.Prisma__VisionBoardClient<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one VisionBoard.
     * @param {VisionBoardUpdateArgs} args - Arguments to update one VisionBoard.
     * @example
     * // Update one VisionBoard
     * const visionBoard = await prisma.visionBoard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VisionBoardUpdateArgs>(args: Prisma.SelectSubset<T, VisionBoardUpdateArgs<ExtArgs>>): Prisma.Prisma__VisionBoardClient<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more VisionBoards.
     * @param {VisionBoardDeleteManyArgs} args - Arguments to filter VisionBoards to delete.
     * @example
     * // Delete a few VisionBoards
     * const { count } = await prisma.visionBoard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VisionBoardDeleteManyArgs>(args?: Prisma.SelectSubset<T, VisionBoardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VisionBoards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisionBoardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VisionBoards
     * const visionBoard = await prisma.visionBoard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VisionBoardUpdateManyArgs>(args: Prisma.SelectSubset<T, VisionBoardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VisionBoards and returns the data updated in the database.
     * @param {VisionBoardUpdateManyAndReturnArgs} args - Arguments to update many VisionBoards.
     * @example
     * // Update many VisionBoards
     * const visionBoard = await prisma.visionBoard.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more VisionBoards and only return the `id`
     * const visionBoardWithIdOnly = await prisma.visionBoard.updateManyAndReturn({
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
    updateManyAndReturn<T extends VisionBoardUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VisionBoardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one VisionBoard.
     * @param {VisionBoardUpsertArgs} args - Arguments to update or create a VisionBoard.
     * @example
     * // Update or create a VisionBoard
     * const visionBoard = await prisma.visionBoard.upsert({
     *   create: {
     *     // ... data to create a VisionBoard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VisionBoard we want to update
     *   }
     * })
     */
    upsert<T extends VisionBoardUpsertArgs>(args: Prisma.SelectSubset<T, VisionBoardUpsertArgs<ExtArgs>>): Prisma.Prisma__VisionBoardClient<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of VisionBoards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisionBoardCountArgs} args - Arguments to filter VisionBoards to count.
     * @example
     * // Count the number of VisionBoards
     * const count = await prisma.visionBoard.count({
     *   where: {
     *     // ... the filter for the VisionBoards we want to count
     *   }
     * })
    **/
    count<T extends VisionBoardCountArgs>(args?: Prisma.Subset<T, VisionBoardCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VisionBoardCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a VisionBoard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisionBoardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VisionBoardAggregateArgs>(args: Prisma.Subset<T, VisionBoardAggregateArgs>): Prisma.PrismaPromise<GetVisionBoardAggregateType<T>>;
    /**
     * Group by VisionBoard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisionBoardGroupByArgs} args - Group by arguments.
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
    groupBy<T extends VisionBoardGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VisionBoardGroupByArgs['orderBy'];
    } : {
        orderBy?: VisionBoardGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VisionBoardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisionBoardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the VisionBoard model
     */
    readonly fields: VisionBoardFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for VisionBoard.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__VisionBoardClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.User_infoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User_infoDefaultArgs<ExtArgs>>): Prisma.Prisma__User_infoClient<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.VisionBoard$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VisionBoard$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VisionBoardItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the VisionBoard model
 */
export interface VisionBoardFieldRefs {
    readonly id: Prisma.FieldRef<"VisionBoard", 'String'>;
    readonly columns: Prisma.FieldRef<"VisionBoard", 'Int'>;
    readonly rows: Prisma.FieldRef<"VisionBoard", 'Int'>;
    readonly gap: Prisma.FieldRef<"VisionBoard", 'Int'>;
    readonly userId: Prisma.FieldRef<"VisionBoard", 'String'>;
    readonly createdAt: Prisma.FieldRef<"VisionBoard", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"VisionBoard", 'DateTime'>;
}
/**
 * VisionBoard findUnique
 */
export type VisionBoardFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardInclude<ExtArgs> | null;
    /**
     * Filter, which VisionBoard to fetch.
     */
    where: Prisma.VisionBoardWhereUniqueInput;
};
/**
 * VisionBoard findUniqueOrThrow
 */
export type VisionBoardFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardInclude<ExtArgs> | null;
    /**
     * Filter, which VisionBoard to fetch.
     */
    where: Prisma.VisionBoardWhereUniqueInput;
};
/**
 * VisionBoard findFirst
 */
export type VisionBoardFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardInclude<ExtArgs> | null;
    /**
     * Filter, which VisionBoard to fetch.
     */
    where?: Prisma.VisionBoardWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VisionBoards to fetch.
     */
    orderBy?: Prisma.VisionBoardOrderByWithRelationInput | Prisma.VisionBoardOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VisionBoards.
     */
    cursor?: Prisma.VisionBoardWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VisionBoards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VisionBoards.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VisionBoards.
     */
    distinct?: Prisma.VisionBoardScalarFieldEnum | Prisma.VisionBoardScalarFieldEnum[];
};
/**
 * VisionBoard findFirstOrThrow
 */
export type VisionBoardFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardInclude<ExtArgs> | null;
    /**
     * Filter, which VisionBoard to fetch.
     */
    where?: Prisma.VisionBoardWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VisionBoards to fetch.
     */
    orderBy?: Prisma.VisionBoardOrderByWithRelationInput | Prisma.VisionBoardOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VisionBoards.
     */
    cursor?: Prisma.VisionBoardWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VisionBoards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VisionBoards.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VisionBoards.
     */
    distinct?: Prisma.VisionBoardScalarFieldEnum | Prisma.VisionBoardScalarFieldEnum[];
};
/**
 * VisionBoard findMany
 */
export type VisionBoardFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardInclude<ExtArgs> | null;
    /**
     * Filter, which VisionBoards to fetch.
     */
    where?: Prisma.VisionBoardWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VisionBoards to fetch.
     */
    orderBy?: Prisma.VisionBoardOrderByWithRelationInput | Prisma.VisionBoardOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing VisionBoards.
     */
    cursor?: Prisma.VisionBoardWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VisionBoards from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VisionBoards.
     */
    skip?: number;
    distinct?: Prisma.VisionBoardScalarFieldEnum | Prisma.VisionBoardScalarFieldEnum[];
};
/**
 * VisionBoard create
 */
export type VisionBoardCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardInclude<ExtArgs> | null;
    /**
     * The data needed to create a VisionBoard.
     */
    data: Prisma.XOR<Prisma.VisionBoardCreateInput, Prisma.VisionBoardUncheckedCreateInput>;
};
/**
 * VisionBoard createMany
 */
export type VisionBoardCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many VisionBoards.
     */
    data: Prisma.VisionBoardCreateManyInput | Prisma.VisionBoardCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * VisionBoard createManyAndReturn
 */
export type VisionBoardCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * The data used to create many VisionBoards.
     */
    data: Prisma.VisionBoardCreateManyInput | Prisma.VisionBoardCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * VisionBoard update
 */
export type VisionBoardUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardInclude<ExtArgs> | null;
    /**
     * The data needed to update a VisionBoard.
     */
    data: Prisma.XOR<Prisma.VisionBoardUpdateInput, Prisma.VisionBoardUncheckedUpdateInput>;
    /**
     * Choose, which VisionBoard to update.
     */
    where: Prisma.VisionBoardWhereUniqueInput;
};
/**
 * VisionBoard updateMany
 */
export type VisionBoardUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update VisionBoards.
     */
    data: Prisma.XOR<Prisma.VisionBoardUpdateManyMutationInput, Prisma.VisionBoardUncheckedUpdateManyInput>;
    /**
     * Filter which VisionBoards to update
     */
    where?: Prisma.VisionBoardWhereInput;
    /**
     * Limit how many VisionBoards to update.
     */
    limit?: number;
};
/**
 * VisionBoard updateManyAndReturn
 */
export type VisionBoardUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * The data used to update VisionBoards.
     */
    data: Prisma.XOR<Prisma.VisionBoardUpdateManyMutationInput, Prisma.VisionBoardUncheckedUpdateManyInput>;
    /**
     * Filter which VisionBoards to update
     */
    where?: Prisma.VisionBoardWhereInput;
    /**
     * Limit how many VisionBoards to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * VisionBoard upsert
 */
export type VisionBoardUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardInclude<ExtArgs> | null;
    /**
     * The filter to search for the VisionBoard to update in case it exists.
     */
    where: Prisma.VisionBoardWhereUniqueInput;
    /**
     * In case the VisionBoard found by the `where` argument doesn't exist, create a new VisionBoard with this data.
     */
    create: Prisma.XOR<Prisma.VisionBoardCreateInput, Prisma.VisionBoardUncheckedCreateInput>;
    /**
     * In case the VisionBoard was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.VisionBoardUpdateInput, Prisma.VisionBoardUncheckedUpdateInput>;
};
/**
 * VisionBoard delete
 */
export type VisionBoardDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardInclude<ExtArgs> | null;
    /**
     * Filter which VisionBoard to delete.
     */
    where: Prisma.VisionBoardWhereUniqueInput;
};
/**
 * VisionBoard deleteMany
 */
export type VisionBoardDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VisionBoards to delete
     */
    where?: Prisma.VisionBoardWhereInput;
    /**
     * Limit how many VisionBoards to delete.
     */
    limit?: number;
};
/**
 * VisionBoard.items
 */
export type VisionBoard$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoardItem
     */
    select?: Prisma.VisionBoardItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoardItem
     */
    omit?: Prisma.VisionBoardItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardItemInclude<ExtArgs> | null;
    where?: Prisma.VisionBoardItemWhereInput;
    orderBy?: Prisma.VisionBoardItemOrderByWithRelationInput | Prisma.VisionBoardItemOrderByWithRelationInput[];
    cursor?: Prisma.VisionBoardItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VisionBoardItemScalarFieldEnum | Prisma.VisionBoardItemScalarFieldEnum[];
};
/**
 * VisionBoard without action
 */
export type VisionBoardDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisionBoard
     */
    select?: Prisma.VisionBoardSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VisionBoard
     */
    omit?: Prisma.VisionBoardOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VisionBoardInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=VisionBoard.d.ts.map