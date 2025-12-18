import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User_info
 *
 */
export type User_infoModel = runtime.Types.Result.DefaultSelection<Prisma.$User_infoPayload>;
export type AggregateUser_info = {
    _count: User_infoCountAggregateOutputType | null;
    _min: User_infoMinAggregateOutputType | null;
    _max: User_infoMaxAggregateOutputType | null;
};
export type User_infoMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type User_infoMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type User_infoCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    password: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type User_infoMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type User_infoMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type User_infoCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type User_infoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User_info to aggregate.
     */
    where?: Prisma.User_infoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of User_infos to fetch.
     */
    orderBy?: Prisma.User_infoOrderByWithRelationInput | Prisma.User_infoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.User_infoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` User_infos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` User_infos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned User_infos
    **/
    _count?: true | User_infoCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: User_infoMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: User_infoMaxAggregateInputType;
};
export type GetUser_infoAggregateType<T extends User_infoAggregateArgs> = {
    [P in keyof T & keyof AggregateUser_info]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser_info[P]> : Prisma.GetScalarType<T[P], AggregateUser_info[P]>;
};
export type User_infoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.User_infoWhereInput;
    orderBy?: Prisma.User_infoOrderByWithAggregationInput | Prisma.User_infoOrderByWithAggregationInput[];
    by: Prisma.User_infoScalarFieldEnum[] | Prisma.User_infoScalarFieldEnum;
    having?: Prisma.User_infoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: User_infoCountAggregateInputType | true;
    _min?: User_infoMinAggregateInputType;
    _max?: User_infoMaxAggregateInputType;
};
export type User_infoGroupByOutputType = {
    id: string;
    name: string | null;
    email: string;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: User_infoCountAggregateOutputType | null;
    _min: User_infoMinAggregateOutputType | null;
    _max: User_infoMaxAggregateOutputType | null;
};
type GetUser_infoGroupByPayload<T extends User_infoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<User_infoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof User_infoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], User_infoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], User_infoGroupByOutputType[P]>;
}>>;
export type User_infoWhereInput = {
    AND?: Prisma.User_infoWhereInput | Prisma.User_infoWhereInput[];
    OR?: Prisma.User_infoWhereInput[];
    NOT?: Prisma.User_infoWhereInput | Prisma.User_infoWhereInput[];
    id?: Prisma.StringFilter<"User_info"> | string;
    name?: Prisma.StringNullableFilter<"User_info"> | string | null;
    email?: Prisma.StringFilter<"User_info"> | string;
    password?: Prisma.StringNullableFilter<"User_info"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User_info"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User_info"> | Date | string;
    targets?: Prisma.TargetListRelationFilter;
    revisions?: Prisma.RevisionListRelationFilter;
    focusSessions?: Prisma.FocusSessionListRelationFilter;
    journals?: Prisma.JournalListRelationFilter;
    visionBoards?: Prisma.VisionBoardListRelationFilter;
};
export type User_infoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    targets?: Prisma.TargetOrderByRelationAggregateInput;
    revisions?: Prisma.RevisionOrderByRelationAggregateInput;
    focusSessions?: Prisma.FocusSessionOrderByRelationAggregateInput;
    journals?: Prisma.JournalOrderByRelationAggregateInput;
    visionBoards?: Prisma.VisionBoardOrderByRelationAggregateInput;
};
export type User_infoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.User_infoWhereInput | Prisma.User_infoWhereInput[];
    OR?: Prisma.User_infoWhereInput[];
    NOT?: Prisma.User_infoWhereInput | Prisma.User_infoWhereInput[];
    name?: Prisma.StringNullableFilter<"User_info"> | string | null;
    password?: Prisma.StringNullableFilter<"User_info"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User_info"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User_info"> | Date | string;
    targets?: Prisma.TargetListRelationFilter;
    revisions?: Prisma.RevisionListRelationFilter;
    focusSessions?: Prisma.FocusSessionListRelationFilter;
    journals?: Prisma.JournalListRelationFilter;
    visionBoards?: Prisma.VisionBoardListRelationFilter;
}, "id" | "email">;
export type User_infoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.User_infoCountOrderByAggregateInput;
    _max?: Prisma.User_infoMaxOrderByAggregateInput;
    _min?: Prisma.User_infoMinOrderByAggregateInput;
};
export type User_infoScalarWhereWithAggregatesInput = {
    AND?: Prisma.User_infoScalarWhereWithAggregatesInput | Prisma.User_infoScalarWhereWithAggregatesInput[];
    OR?: Prisma.User_infoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.User_infoScalarWhereWithAggregatesInput | Prisma.User_infoScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User_info"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"User_info"> | string | null;
    email?: Prisma.StringWithAggregatesFilter<"User_info"> | string;
    password?: Prisma.StringNullableWithAggregatesFilter<"User_info"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User_info"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User_info"> | Date | string;
};
export type User_infoCreateInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targets?: Prisma.TargetCreateNestedManyWithoutUserInput;
    revisions?: Prisma.RevisionCreateNestedManyWithoutUserInput;
    focusSessions?: Prisma.FocusSessionCreateNestedManyWithoutUserInput;
    journals?: Prisma.JournalCreateNestedManyWithoutUserInput;
    visionBoards?: Prisma.VisionBoardCreateNestedManyWithoutUserInput;
};
export type User_infoUncheckedCreateInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targets?: Prisma.TargetUncheckedCreateNestedManyWithoutUserInput;
    revisions?: Prisma.RevisionUncheckedCreateNestedManyWithoutUserInput;
    focusSessions?: Prisma.FocusSessionUncheckedCreateNestedManyWithoutUserInput;
    journals?: Prisma.JournalUncheckedCreateNestedManyWithoutUserInput;
    visionBoards?: Prisma.VisionBoardUncheckedCreateNestedManyWithoutUserInput;
};
export type User_infoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targets?: Prisma.TargetUpdateManyWithoutUserNestedInput;
    revisions?: Prisma.RevisionUpdateManyWithoutUserNestedInput;
    focusSessions?: Prisma.FocusSessionUpdateManyWithoutUserNestedInput;
    journals?: Prisma.JournalUpdateManyWithoutUserNestedInput;
    visionBoards?: Prisma.VisionBoardUpdateManyWithoutUserNestedInput;
};
export type User_infoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targets?: Prisma.TargetUncheckedUpdateManyWithoutUserNestedInput;
    revisions?: Prisma.RevisionUncheckedUpdateManyWithoutUserNestedInput;
    focusSessions?: Prisma.FocusSessionUncheckedUpdateManyWithoutUserNestedInput;
    journals?: Prisma.JournalUncheckedUpdateManyWithoutUserNestedInput;
    visionBoards?: Prisma.VisionBoardUncheckedUpdateManyWithoutUserNestedInput;
};
export type User_infoCreateManyInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type User_infoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type User_infoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type User_infoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type User_infoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type User_infoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type User_infoScalarRelationFilter = {
    is?: Prisma.User_infoWhereInput;
    isNot?: Prisma.User_infoWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type User_infoCreateNestedOneWithoutTargetsInput = {
    create?: Prisma.XOR<Prisma.User_infoCreateWithoutTargetsInput, Prisma.User_infoUncheckedCreateWithoutTargetsInput>;
    connectOrCreate?: Prisma.User_infoCreateOrConnectWithoutTargetsInput;
    connect?: Prisma.User_infoWhereUniqueInput;
};
export type User_infoUpdateOneRequiredWithoutTargetsNestedInput = {
    create?: Prisma.XOR<Prisma.User_infoCreateWithoutTargetsInput, Prisma.User_infoUncheckedCreateWithoutTargetsInput>;
    connectOrCreate?: Prisma.User_infoCreateOrConnectWithoutTargetsInput;
    upsert?: Prisma.User_infoUpsertWithoutTargetsInput;
    connect?: Prisma.User_infoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.User_infoUpdateToOneWithWhereWithoutTargetsInput, Prisma.User_infoUpdateWithoutTargetsInput>, Prisma.User_infoUncheckedUpdateWithoutTargetsInput>;
};
export type User_infoCreateNestedOneWithoutRevisionsInput = {
    create?: Prisma.XOR<Prisma.User_infoCreateWithoutRevisionsInput, Prisma.User_infoUncheckedCreateWithoutRevisionsInput>;
    connectOrCreate?: Prisma.User_infoCreateOrConnectWithoutRevisionsInput;
    connect?: Prisma.User_infoWhereUniqueInput;
};
export type User_infoUpdateOneRequiredWithoutRevisionsNestedInput = {
    create?: Prisma.XOR<Prisma.User_infoCreateWithoutRevisionsInput, Prisma.User_infoUncheckedCreateWithoutRevisionsInput>;
    connectOrCreate?: Prisma.User_infoCreateOrConnectWithoutRevisionsInput;
    upsert?: Prisma.User_infoUpsertWithoutRevisionsInput;
    connect?: Prisma.User_infoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.User_infoUpdateToOneWithWhereWithoutRevisionsInput, Prisma.User_infoUpdateWithoutRevisionsInput>, Prisma.User_infoUncheckedUpdateWithoutRevisionsInput>;
};
export type User_infoCreateNestedOneWithoutFocusSessionsInput = {
    create?: Prisma.XOR<Prisma.User_infoCreateWithoutFocusSessionsInput, Prisma.User_infoUncheckedCreateWithoutFocusSessionsInput>;
    connectOrCreate?: Prisma.User_infoCreateOrConnectWithoutFocusSessionsInput;
    connect?: Prisma.User_infoWhereUniqueInput;
};
export type User_infoUpdateOneRequiredWithoutFocusSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.User_infoCreateWithoutFocusSessionsInput, Prisma.User_infoUncheckedCreateWithoutFocusSessionsInput>;
    connectOrCreate?: Prisma.User_infoCreateOrConnectWithoutFocusSessionsInput;
    upsert?: Prisma.User_infoUpsertWithoutFocusSessionsInput;
    connect?: Prisma.User_infoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.User_infoUpdateToOneWithWhereWithoutFocusSessionsInput, Prisma.User_infoUpdateWithoutFocusSessionsInput>, Prisma.User_infoUncheckedUpdateWithoutFocusSessionsInput>;
};
export type User_infoCreateNestedOneWithoutJournalsInput = {
    create?: Prisma.XOR<Prisma.User_infoCreateWithoutJournalsInput, Prisma.User_infoUncheckedCreateWithoutJournalsInput>;
    connectOrCreate?: Prisma.User_infoCreateOrConnectWithoutJournalsInput;
    connect?: Prisma.User_infoWhereUniqueInput;
};
export type User_infoUpdateOneRequiredWithoutJournalsNestedInput = {
    create?: Prisma.XOR<Prisma.User_infoCreateWithoutJournalsInput, Prisma.User_infoUncheckedCreateWithoutJournalsInput>;
    connectOrCreate?: Prisma.User_infoCreateOrConnectWithoutJournalsInput;
    upsert?: Prisma.User_infoUpsertWithoutJournalsInput;
    connect?: Prisma.User_infoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.User_infoUpdateToOneWithWhereWithoutJournalsInput, Prisma.User_infoUpdateWithoutJournalsInput>, Prisma.User_infoUncheckedUpdateWithoutJournalsInput>;
};
export type User_infoCreateNestedOneWithoutVisionBoardsInput = {
    create?: Prisma.XOR<Prisma.User_infoCreateWithoutVisionBoardsInput, Prisma.User_infoUncheckedCreateWithoutVisionBoardsInput>;
    connectOrCreate?: Prisma.User_infoCreateOrConnectWithoutVisionBoardsInput;
    connect?: Prisma.User_infoWhereUniqueInput;
};
export type User_infoUpdateOneRequiredWithoutVisionBoardsNestedInput = {
    create?: Prisma.XOR<Prisma.User_infoCreateWithoutVisionBoardsInput, Prisma.User_infoUncheckedCreateWithoutVisionBoardsInput>;
    connectOrCreate?: Prisma.User_infoCreateOrConnectWithoutVisionBoardsInput;
    upsert?: Prisma.User_infoUpsertWithoutVisionBoardsInput;
    connect?: Prisma.User_infoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.User_infoUpdateToOneWithWhereWithoutVisionBoardsInput, Prisma.User_infoUpdateWithoutVisionBoardsInput>, Prisma.User_infoUncheckedUpdateWithoutVisionBoardsInput>;
};
export type User_infoCreateWithoutTargetsInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    revisions?: Prisma.RevisionCreateNestedManyWithoutUserInput;
    focusSessions?: Prisma.FocusSessionCreateNestedManyWithoutUserInput;
    journals?: Prisma.JournalCreateNestedManyWithoutUserInput;
    visionBoards?: Prisma.VisionBoardCreateNestedManyWithoutUserInput;
};
export type User_infoUncheckedCreateWithoutTargetsInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    revisions?: Prisma.RevisionUncheckedCreateNestedManyWithoutUserInput;
    focusSessions?: Prisma.FocusSessionUncheckedCreateNestedManyWithoutUserInput;
    journals?: Prisma.JournalUncheckedCreateNestedManyWithoutUserInput;
    visionBoards?: Prisma.VisionBoardUncheckedCreateNestedManyWithoutUserInput;
};
export type User_infoCreateOrConnectWithoutTargetsInput = {
    where: Prisma.User_infoWhereUniqueInput;
    create: Prisma.XOR<Prisma.User_infoCreateWithoutTargetsInput, Prisma.User_infoUncheckedCreateWithoutTargetsInput>;
};
export type User_infoUpsertWithoutTargetsInput = {
    update: Prisma.XOR<Prisma.User_infoUpdateWithoutTargetsInput, Prisma.User_infoUncheckedUpdateWithoutTargetsInput>;
    create: Prisma.XOR<Prisma.User_infoCreateWithoutTargetsInput, Prisma.User_infoUncheckedCreateWithoutTargetsInput>;
    where?: Prisma.User_infoWhereInput;
};
export type User_infoUpdateToOneWithWhereWithoutTargetsInput = {
    where?: Prisma.User_infoWhereInput;
    data: Prisma.XOR<Prisma.User_infoUpdateWithoutTargetsInput, Prisma.User_infoUncheckedUpdateWithoutTargetsInput>;
};
export type User_infoUpdateWithoutTargetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revisions?: Prisma.RevisionUpdateManyWithoutUserNestedInput;
    focusSessions?: Prisma.FocusSessionUpdateManyWithoutUserNestedInput;
    journals?: Prisma.JournalUpdateManyWithoutUserNestedInput;
    visionBoards?: Prisma.VisionBoardUpdateManyWithoutUserNestedInput;
};
export type User_infoUncheckedUpdateWithoutTargetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revisions?: Prisma.RevisionUncheckedUpdateManyWithoutUserNestedInput;
    focusSessions?: Prisma.FocusSessionUncheckedUpdateManyWithoutUserNestedInput;
    journals?: Prisma.JournalUncheckedUpdateManyWithoutUserNestedInput;
    visionBoards?: Prisma.VisionBoardUncheckedUpdateManyWithoutUserNestedInput;
};
export type User_infoCreateWithoutRevisionsInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targets?: Prisma.TargetCreateNestedManyWithoutUserInput;
    focusSessions?: Prisma.FocusSessionCreateNestedManyWithoutUserInput;
    journals?: Prisma.JournalCreateNestedManyWithoutUserInput;
    visionBoards?: Prisma.VisionBoardCreateNestedManyWithoutUserInput;
};
export type User_infoUncheckedCreateWithoutRevisionsInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targets?: Prisma.TargetUncheckedCreateNestedManyWithoutUserInput;
    focusSessions?: Prisma.FocusSessionUncheckedCreateNestedManyWithoutUserInput;
    journals?: Prisma.JournalUncheckedCreateNestedManyWithoutUserInput;
    visionBoards?: Prisma.VisionBoardUncheckedCreateNestedManyWithoutUserInput;
};
export type User_infoCreateOrConnectWithoutRevisionsInput = {
    where: Prisma.User_infoWhereUniqueInput;
    create: Prisma.XOR<Prisma.User_infoCreateWithoutRevisionsInput, Prisma.User_infoUncheckedCreateWithoutRevisionsInput>;
};
export type User_infoUpsertWithoutRevisionsInput = {
    update: Prisma.XOR<Prisma.User_infoUpdateWithoutRevisionsInput, Prisma.User_infoUncheckedUpdateWithoutRevisionsInput>;
    create: Prisma.XOR<Prisma.User_infoCreateWithoutRevisionsInput, Prisma.User_infoUncheckedCreateWithoutRevisionsInput>;
    where?: Prisma.User_infoWhereInput;
};
export type User_infoUpdateToOneWithWhereWithoutRevisionsInput = {
    where?: Prisma.User_infoWhereInput;
    data: Prisma.XOR<Prisma.User_infoUpdateWithoutRevisionsInput, Prisma.User_infoUncheckedUpdateWithoutRevisionsInput>;
};
export type User_infoUpdateWithoutRevisionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targets?: Prisma.TargetUpdateManyWithoutUserNestedInput;
    focusSessions?: Prisma.FocusSessionUpdateManyWithoutUserNestedInput;
    journals?: Prisma.JournalUpdateManyWithoutUserNestedInput;
    visionBoards?: Prisma.VisionBoardUpdateManyWithoutUserNestedInput;
};
export type User_infoUncheckedUpdateWithoutRevisionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targets?: Prisma.TargetUncheckedUpdateManyWithoutUserNestedInput;
    focusSessions?: Prisma.FocusSessionUncheckedUpdateManyWithoutUserNestedInput;
    journals?: Prisma.JournalUncheckedUpdateManyWithoutUserNestedInput;
    visionBoards?: Prisma.VisionBoardUncheckedUpdateManyWithoutUserNestedInput;
};
export type User_infoCreateWithoutFocusSessionsInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targets?: Prisma.TargetCreateNestedManyWithoutUserInput;
    revisions?: Prisma.RevisionCreateNestedManyWithoutUserInput;
    journals?: Prisma.JournalCreateNestedManyWithoutUserInput;
    visionBoards?: Prisma.VisionBoardCreateNestedManyWithoutUserInput;
};
export type User_infoUncheckedCreateWithoutFocusSessionsInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targets?: Prisma.TargetUncheckedCreateNestedManyWithoutUserInput;
    revisions?: Prisma.RevisionUncheckedCreateNestedManyWithoutUserInput;
    journals?: Prisma.JournalUncheckedCreateNestedManyWithoutUserInput;
    visionBoards?: Prisma.VisionBoardUncheckedCreateNestedManyWithoutUserInput;
};
export type User_infoCreateOrConnectWithoutFocusSessionsInput = {
    where: Prisma.User_infoWhereUniqueInput;
    create: Prisma.XOR<Prisma.User_infoCreateWithoutFocusSessionsInput, Prisma.User_infoUncheckedCreateWithoutFocusSessionsInput>;
};
export type User_infoUpsertWithoutFocusSessionsInput = {
    update: Prisma.XOR<Prisma.User_infoUpdateWithoutFocusSessionsInput, Prisma.User_infoUncheckedUpdateWithoutFocusSessionsInput>;
    create: Prisma.XOR<Prisma.User_infoCreateWithoutFocusSessionsInput, Prisma.User_infoUncheckedCreateWithoutFocusSessionsInput>;
    where?: Prisma.User_infoWhereInput;
};
export type User_infoUpdateToOneWithWhereWithoutFocusSessionsInput = {
    where?: Prisma.User_infoWhereInput;
    data: Prisma.XOR<Prisma.User_infoUpdateWithoutFocusSessionsInput, Prisma.User_infoUncheckedUpdateWithoutFocusSessionsInput>;
};
export type User_infoUpdateWithoutFocusSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targets?: Prisma.TargetUpdateManyWithoutUserNestedInput;
    revisions?: Prisma.RevisionUpdateManyWithoutUserNestedInput;
    journals?: Prisma.JournalUpdateManyWithoutUserNestedInput;
    visionBoards?: Prisma.VisionBoardUpdateManyWithoutUserNestedInput;
};
export type User_infoUncheckedUpdateWithoutFocusSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targets?: Prisma.TargetUncheckedUpdateManyWithoutUserNestedInput;
    revisions?: Prisma.RevisionUncheckedUpdateManyWithoutUserNestedInput;
    journals?: Prisma.JournalUncheckedUpdateManyWithoutUserNestedInput;
    visionBoards?: Prisma.VisionBoardUncheckedUpdateManyWithoutUserNestedInput;
};
export type User_infoCreateWithoutJournalsInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targets?: Prisma.TargetCreateNestedManyWithoutUserInput;
    revisions?: Prisma.RevisionCreateNestedManyWithoutUserInput;
    focusSessions?: Prisma.FocusSessionCreateNestedManyWithoutUserInput;
    visionBoards?: Prisma.VisionBoardCreateNestedManyWithoutUserInput;
};
export type User_infoUncheckedCreateWithoutJournalsInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targets?: Prisma.TargetUncheckedCreateNestedManyWithoutUserInput;
    revisions?: Prisma.RevisionUncheckedCreateNestedManyWithoutUserInput;
    focusSessions?: Prisma.FocusSessionUncheckedCreateNestedManyWithoutUserInput;
    visionBoards?: Prisma.VisionBoardUncheckedCreateNestedManyWithoutUserInput;
};
export type User_infoCreateOrConnectWithoutJournalsInput = {
    where: Prisma.User_infoWhereUniqueInput;
    create: Prisma.XOR<Prisma.User_infoCreateWithoutJournalsInput, Prisma.User_infoUncheckedCreateWithoutJournalsInput>;
};
export type User_infoUpsertWithoutJournalsInput = {
    update: Prisma.XOR<Prisma.User_infoUpdateWithoutJournalsInput, Prisma.User_infoUncheckedUpdateWithoutJournalsInput>;
    create: Prisma.XOR<Prisma.User_infoCreateWithoutJournalsInput, Prisma.User_infoUncheckedCreateWithoutJournalsInput>;
    where?: Prisma.User_infoWhereInput;
};
export type User_infoUpdateToOneWithWhereWithoutJournalsInput = {
    where?: Prisma.User_infoWhereInput;
    data: Prisma.XOR<Prisma.User_infoUpdateWithoutJournalsInput, Prisma.User_infoUncheckedUpdateWithoutJournalsInput>;
};
export type User_infoUpdateWithoutJournalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targets?: Prisma.TargetUpdateManyWithoutUserNestedInput;
    revisions?: Prisma.RevisionUpdateManyWithoutUserNestedInput;
    focusSessions?: Prisma.FocusSessionUpdateManyWithoutUserNestedInput;
    visionBoards?: Prisma.VisionBoardUpdateManyWithoutUserNestedInput;
};
export type User_infoUncheckedUpdateWithoutJournalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targets?: Prisma.TargetUncheckedUpdateManyWithoutUserNestedInput;
    revisions?: Prisma.RevisionUncheckedUpdateManyWithoutUserNestedInput;
    focusSessions?: Prisma.FocusSessionUncheckedUpdateManyWithoutUserNestedInput;
    visionBoards?: Prisma.VisionBoardUncheckedUpdateManyWithoutUserNestedInput;
};
export type User_infoCreateWithoutVisionBoardsInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targets?: Prisma.TargetCreateNestedManyWithoutUserInput;
    revisions?: Prisma.RevisionCreateNestedManyWithoutUserInput;
    focusSessions?: Prisma.FocusSessionCreateNestedManyWithoutUserInput;
    journals?: Prisma.JournalCreateNestedManyWithoutUserInput;
};
export type User_infoUncheckedCreateWithoutVisionBoardsInput = {
    id?: string;
    name?: string | null;
    email: string;
    password?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    targets?: Prisma.TargetUncheckedCreateNestedManyWithoutUserInput;
    revisions?: Prisma.RevisionUncheckedCreateNestedManyWithoutUserInput;
    focusSessions?: Prisma.FocusSessionUncheckedCreateNestedManyWithoutUserInput;
    journals?: Prisma.JournalUncheckedCreateNestedManyWithoutUserInput;
};
export type User_infoCreateOrConnectWithoutVisionBoardsInput = {
    where: Prisma.User_infoWhereUniqueInput;
    create: Prisma.XOR<Prisma.User_infoCreateWithoutVisionBoardsInput, Prisma.User_infoUncheckedCreateWithoutVisionBoardsInput>;
};
export type User_infoUpsertWithoutVisionBoardsInput = {
    update: Prisma.XOR<Prisma.User_infoUpdateWithoutVisionBoardsInput, Prisma.User_infoUncheckedUpdateWithoutVisionBoardsInput>;
    create: Prisma.XOR<Prisma.User_infoCreateWithoutVisionBoardsInput, Prisma.User_infoUncheckedCreateWithoutVisionBoardsInput>;
    where?: Prisma.User_infoWhereInput;
};
export type User_infoUpdateToOneWithWhereWithoutVisionBoardsInput = {
    where?: Prisma.User_infoWhereInput;
    data: Prisma.XOR<Prisma.User_infoUpdateWithoutVisionBoardsInput, Prisma.User_infoUncheckedUpdateWithoutVisionBoardsInput>;
};
export type User_infoUpdateWithoutVisionBoardsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targets?: Prisma.TargetUpdateManyWithoutUserNestedInput;
    revisions?: Prisma.RevisionUpdateManyWithoutUserNestedInput;
    focusSessions?: Prisma.FocusSessionUpdateManyWithoutUserNestedInput;
    journals?: Prisma.JournalUpdateManyWithoutUserNestedInput;
};
export type User_infoUncheckedUpdateWithoutVisionBoardsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targets?: Prisma.TargetUncheckedUpdateManyWithoutUserNestedInput;
    revisions?: Prisma.RevisionUncheckedUpdateManyWithoutUserNestedInput;
    focusSessions?: Prisma.FocusSessionUncheckedUpdateManyWithoutUserNestedInput;
    journals?: Prisma.JournalUncheckedUpdateManyWithoutUserNestedInput;
};
/**
 * Count Type User_infoCountOutputType
 */
export type User_infoCountOutputType = {
    targets: number;
    revisions: number;
    focusSessions: number;
    journals: number;
    visionBoards: number;
};
export type User_infoCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    targets?: boolean | User_infoCountOutputTypeCountTargetsArgs;
    revisions?: boolean | User_infoCountOutputTypeCountRevisionsArgs;
    focusSessions?: boolean | User_infoCountOutputTypeCountFocusSessionsArgs;
    journals?: boolean | User_infoCountOutputTypeCountJournalsArgs;
    visionBoards?: boolean | User_infoCountOutputTypeCountVisionBoardsArgs;
};
/**
 * User_infoCountOutputType without action
 */
export type User_infoCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_infoCountOutputType
     */
    select?: Prisma.User_infoCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * User_infoCountOutputType without action
 */
export type User_infoCountOutputTypeCountTargetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TargetWhereInput;
};
/**
 * User_infoCountOutputType without action
 */
export type User_infoCountOutputTypeCountRevisionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RevisionWhereInput;
};
/**
 * User_infoCountOutputType without action
 */
export type User_infoCountOutputTypeCountFocusSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FocusSessionWhereInput;
};
/**
 * User_infoCountOutputType without action
 */
export type User_infoCountOutputTypeCountJournalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JournalWhereInput;
};
/**
 * User_infoCountOutputType without action
 */
export type User_infoCountOutputTypeCountVisionBoardsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VisionBoardWhereInput;
};
export type User_infoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    targets?: boolean | Prisma.User_info$targetsArgs<ExtArgs>;
    revisions?: boolean | Prisma.User_info$revisionsArgs<ExtArgs>;
    focusSessions?: boolean | Prisma.User_info$focusSessionsArgs<ExtArgs>;
    journals?: boolean | Prisma.User_info$journalsArgs<ExtArgs>;
    visionBoards?: boolean | Prisma.User_info$visionBoardsArgs<ExtArgs>;
    _count?: boolean | Prisma.User_infoCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user_info"]>;
export type User_infoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user_info"]>;
export type User_infoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user_info"]>;
export type User_infoSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type User_infoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user_info"]>;
export type User_infoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    targets?: boolean | Prisma.User_info$targetsArgs<ExtArgs>;
    revisions?: boolean | Prisma.User_info$revisionsArgs<ExtArgs>;
    focusSessions?: boolean | Prisma.User_info$focusSessionsArgs<ExtArgs>;
    journals?: boolean | Prisma.User_info$journalsArgs<ExtArgs>;
    visionBoards?: boolean | Prisma.User_info$visionBoardsArgs<ExtArgs>;
    _count?: boolean | Prisma.User_infoCountOutputTypeDefaultArgs<ExtArgs>;
};
export type User_infoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type User_infoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $User_infoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User_info";
    objects: {
        targets: Prisma.$TargetPayload<ExtArgs>[];
        revisions: Prisma.$RevisionPayload<ExtArgs>[];
        focusSessions: Prisma.$FocusSessionPayload<ExtArgs>[];
        journals: Prisma.$JournalPayload<ExtArgs>[];
        visionBoards: Prisma.$VisionBoardPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user_info"]>;
    composites: {};
};
export type User_infoGetPayload<S extends boolean | null | undefined | User_infoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$User_infoPayload, S>;
export type User_infoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<User_infoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: User_infoCountAggregateInputType | true;
};
export interface User_infoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User_info'];
        meta: {
            name: 'User_info';
        };
    };
    /**
     * Find zero or one User_info that matches the filter.
     * @param {User_infoFindUniqueArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends User_infoFindUniqueArgs>(args: Prisma.SelectSubset<T, User_infoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__User_infoClient<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User_info that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {User_infoFindUniqueOrThrowArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends User_infoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, User_infoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__User_infoClient<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User_info that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_infoFindFirstArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends User_infoFindFirstArgs>(args?: Prisma.SelectSubset<T, User_infoFindFirstArgs<ExtArgs>>): Prisma.Prisma__User_infoClient<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User_info that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_infoFindFirstOrThrowArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends User_infoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, User_infoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__User_infoClient<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more User_infos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_infoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_infos
     * const user_infos = await prisma.user_info.findMany()
     *
     * // Get first 10 User_infos
     * const user_infos = await prisma.user_info.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const user_infoWithIdOnly = await prisma.user_info.findMany({ select: { id: true } })
     *
     */
    findMany<T extends User_infoFindManyArgs>(args?: Prisma.SelectSubset<T, User_infoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User_info.
     * @param {User_infoCreateArgs} args - Arguments to create a User_info.
     * @example
     * // Create one User_info
     * const User_info = await prisma.user_info.create({
     *   data: {
     *     // ... data to create a User_info
     *   }
     * })
     *
     */
    create<T extends User_infoCreateArgs>(args: Prisma.SelectSubset<T, User_infoCreateArgs<ExtArgs>>): Prisma.Prisma__User_infoClient<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many User_infos.
     * @param {User_infoCreateManyArgs} args - Arguments to create many User_infos.
     * @example
     * // Create many User_infos
     * const user_info = await prisma.user_info.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends User_infoCreateManyArgs>(args?: Prisma.SelectSubset<T, User_infoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many User_infos and returns the data saved in the database.
     * @param {User_infoCreateManyAndReturnArgs} args - Arguments to create many User_infos.
     * @example
     * // Create many User_infos
     * const user_info = await prisma.user_info.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many User_infos and only return the `id`
     * const user_infoWithIdOnly = await prisma.user_info.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends User_infoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, User_infoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User_info.
     * @param {User_infoDeleteArgs} args - Arguments to delete one User_info.
     * @example
     * // Delete one User_info
     * const User_info = await prisma.user_info.delete({
     *   where: {
     *     // ... filter to delete one User_info
     *   }
     * })
     *
     */
    delete<T extends User_infoDeleteArgs>(args: Prisma.SelectSubset<T, User_infoDeleteArgs<ExtArgs>>): Prisma.Prisma__User_infoClient<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User_info.
     * @param {User_infoUpdateArgs} args - Arguments to update one User_info.
     * @example
     * // Update one User_info
     * const user_info = await prisma.user_info.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends User_infoUpdateArgs>(args: Prisma.SelectSubset<T, User_infoUpdateArgs<ExtArgs>>): Prisma.Prisma__User_infoClient<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more User_infos.
     * @param {User_infoDeleteManyArgs} args - Arguments to filter User_infos to delete.
     * @example
     * // Delete a few User_infos
     * const { count } = await prisma.user_info.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends User_infoDeleteManyArgs>(args?: Prisma.SelectSubset<T, User_infoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more User_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_infoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_infos
     * const user_info = await prisma.user_info.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends User_infoUpdateManyArgs>(args: Prisma.SelectSubset<T, User_infoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more User_infos and returns the data updated in the database.
     * @param {User_infoUpdateManyAndReturnArgs} args - Arguments to update many User_infos.
     * @example
     * // Update many User_infos
     * const user_info = await prisma.user_info.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more User_infos and only return the `id`
     * const user_infoWithIdOnly = await prisma.user_info.updateManyAndReturn({
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
    updateManyAndReturn<T extends User_infoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, User_infoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User_info.
     * @param {User_infoUpsertArgs} args - Arguments to update or create a User_info.
     * @example
     * // Update or create a User_info
     * const user_info = await prisma.user_info.upsert({
     *   create: {
     *     // ... data to create a User_info
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_info we want to update
     *   }
     * })
     */
    upsert<T extends User_infoUpsertArgs>(args: Prisma.SelectSubset<T, User_infoUpsertArgs<ExtArgs>>): Prisma.Prisma__User_infoClient<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of User_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_infoCountArgs} args - Arguments to filter User_infos to count.
     * @example
     * // Count the number of User_infos
     * const count = await prisma.user_info.count({
     *   where: {
     *     // ... the filter for the User_infos we want to count
     *   }
     * })
    **/
    count<T extends User_infoCountArgs>(args?: Prisma.Subset<T, User_infoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], User_infoCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_infoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends User_infoAggregateArgs>(args: Prisma.Subset<T, User_infoAggregateArgs>): Prisma.PrismaPromise<GetUser_infoAggregateType<T>>;
    /**
     * Group by User_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_infoGroupByArgs} args - Group by arguments.
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
    groupBy<T extends User_infoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: User_infoGroupByArgs['orderBy'];
    } : {
        orderBy?: User_infoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, User_infoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_infoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User_info model
     */
    readonly fields: User_infoFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User_info.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__User_infoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    targets<T extends Prisma.User_info$targetsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User_info$targetsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    revisions<T extends Prisma.User_info$revisionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User_info$revisionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    focusSessions<T extends Prisma.User_info$focusSessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User_info$focusSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FocusSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    journals<T extends Prisma.User_info$journalsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User_info$journalsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    visionBoards<T extends Prisma.User_info$visionBoardsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User_info$visionBoardsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VisionBoardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the User_info model
 */
export interface User_infoFieldRefs {
    readonly id: Prisma.FieldRef<"User_info", 'String'>;
    readonly name: Prisma.FieldRef<"User_info", 'String'>;
    readonly email: Prisma.FieldRef<"User_info", 'String'>;
    readonly password: Prisma.FieldRef<"User_info", 'String'>;
    readonly createdAt: Prisma.FieldRef<"User_info", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User_info", 'DateTime'>;
}
/**
 * User_info findUnique
 */
export type User_infoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.User_infoInclude<ExtArgs> | null;
    /**
     * Filter, which User_info to fetch.
     */
    where: Prisma.User_infoWhereUniqueInput;
};
/**
 * User_info findUniqueOrThrow
 */
export type User_infoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.User_infoInclude<ExtArgs> | null;
    /**
     * Filter, which User_info to fetch.
     */
    where: Prisma.User_infoWhereUniqueInput;
};
/**
 * User_info findFirst
 */
export type User_infoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.User_infoInclude<ExtArgs> | null;
    /**
     * Filter, which User_info to fetch.
     */
    where?: Prisma.User_infoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of User_infos to fetch.
     */
    orderBy?: Prisma.User_infoOrderByWithRelationInput | Prisma.User_infoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for User_infos.
     */
    cursor?: Prisma.User_infoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` User_infos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` User_infos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of User_infos.
     */
    distinct?: Prisma.User_infoScalarFieldEnum | Prisma.User_infoScalarFieldEnum[];
};
/**
 * User_info findFirstOrThrow
 */
export type User_infoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.User_infoInclude<ExtArgs> | null;
    /**
     * Filter, which User_info to fetch.
     */
    where?: Prisma.User_infoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of User_infos to fetch.
     */
    orderBy?: Prisma.User_infoOrderByWithRelationInput | Prisma.User_infoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for User_infos.
     */
    cursor?: Prisma.User_infoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` User_infos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` User_infos.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of User_infos.
     */
    distinct?: Prisma.User_infoScalarFieldEnum | Prisma.User_infoScalarFieldEnum[];
};
/**
 * User_info findMany
 */
export type User_infoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.User_infoInclude<ExtArgs> | null;
    /**
     * Filter, which User_infos to fetch.
     */
    where?: Prisma.User_infoWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of User_infos to fetch.
     */
    orderBy?: Prisma.User_infoOrderByWithRelationInput | Prisma.User_infoOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing User_infos.
     */
    cursor?: Prisma.User_infoWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` User_infos from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` User_infos.
     */
    skip?: number;
    distinct?: Prisma.User_infoScalarFieldEnum | Prisma.User_infoScalarFieldEnum[];
};
/**
 * User_info create
 */
export type User_infoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.User_infoInclude<ExtArgs> | null;
    /**
     * The data needed to create a User_info.
     */
    data: Prisma.XOR<Prisma.User_infoCreateInput, Prisma.User_infoUncheckedCreateInput>;
};
/**
 * User_info createMany
 */
export type User_infoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many User_infos.
     */
    data: Prisma.User_infoCreateManyInput | Prisma.User_infoCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User_info createManyAndReturn
 */
export type User_infoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * The data used to create many User_infos.
     */
    data: Prisma.User_infoCreateManyInput | Prisma.User_infoCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User_info update
 */
export type User_infoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.User_infoInclude<ExtArgs> | null;
    /**
     * The data needed to update a User_info.
     */
    data: Prisma.XOR<Prisma.User_infoUpdateInput, Prisma.User_infoUncheckedUpdateInput>;
    /**
     * Choose, which User_info to update.
     */
    where: Prisma.User_infoWhereUniqueInput;
};
/**
 * User_info updateMany
 */
export type User_infoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update User_infos.
     */
    data: Prisma.XOR<Prisma.User_infoUpdateManyMutationInput, Prisma.User_infoUncheckedUpdateManyInput>;
    /**
     * Filter which User_infos to update
     */
    where?: Prisma.User_infoWhereInput;
    /**
     * Limit how many User_infos to update.
     */
    limit?: number;
};
/**
 * User_info updateManyAndReturn
 */
export type User_infoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * The data used to update User_infos.
     */
    data: Prisma.XOR<Prisma.User_infoUpdateManyMutationInput, Prisma.User_infoUncheckedUpdateManyInput>;
    /**
     * Filter which User_infos to update
     */
    where?: Prisma.User_infoWhereInput;
    /**
     * Limit how many User_infos to update.
     */
    limit?: number;
};
/**
 * User_info upsert
 */
export type User_infoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.User_infoInclude<ExtArgs> | null;
    /**
     * The filter to search for the User_info to update in case it exists.
     */
    where: Prisma.User_infoWhereUniqueInput;
    /**
     * In case the User_info found by the `where` argument doesn't exist, create a new User_info with this data.
     */
    create: Prisma.XOR<Prisma.User_infoCreateInput, Prisma.User_infoUncheckedCreateInput>;
    /**
     * In case the User_info was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.User_infoUpdateInput, Prisma.User_infoUncheckedUpdateInput>;
};
/**
 * User_info delete
 */
export type User_infoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.User_infoInclude<ExtArgs> | null;
    /**
     * Filter which User_info to delete.
     */
    where: Prisma.User_infoWhereUniqueInput;
};
/**
 * User_info deleteMany
 */
export type User_infoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User_infos to delete
     */
    where?: Prisma.User_infoWhereInput;
    /**
     * Limit how many User_infos to delete.
     */
    limit?: number;
};
/**
 * User_info.targets
 */
export type User_info$targetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: Prisma.TargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Target
     */
    omit?: Prisma.TargetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TargetInclude<ExtArgs> | null;
    where?: Prisma.TargetWhereInput;
    orderBy?: Prisma.TargetOrderByWithRelationInput | Prisma.TargetOrderByWithRelationInput[];
    cursor?: Prisma.TargetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TargetScalarFieldEnum | Prisma.TargetScalarFieldEnum[];
};
/**
 * User_info.revisions
 */
export type User_info$revisionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revision
     */
    select?: Prisma.RevisionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Revision
     */
    omit?: Prisma.RevisionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RevisionInclude<ExtArgs> | null;
    where?: Prisma.RevisionWhereInput;
    orderBy?: Prisma.RevisionOrderByWithRelationInput | Prisma.RevisionOrderByWithRelationInput[];
    cursor?: Prisma.RevisionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RevisionScalarFieldEnum | Prisma.RevisionScalarFieldEnum[];
};
/**
 * User_info.focusSessions
 */
export type User_info$focusSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FocusSession
     */
    select?: Prisma.FocusSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FocusSession
     */
    omit?: Prisma.FocusSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FocusSessionInclude<ExtArgs> | null;
    where?: Prisma.FocusSessionWhereInput;
    orderBy?: Prisma.FocusSessionOrderByWithRelationInput | Prisma.FocusSessionOrderByWithRelationInput[];
    cursor?: Prisma.FocusSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FocusSessionScalarFieldEnum | Prisma.FocusSessionScalarFieldEnum[];
};
/**
 * User_info.journals
 */
export type User_info$journalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: Prisma.JournalSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Journal
     */
    omit?: Prisma.JournalOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.JournalInclude<ExtArgs> | null;
    where?: Prisma.JournalWhereInput;
    orderBy?: Prisma.JournalOrderByWithRelationInput | Prisma.JournalOrderByWithRelationInput[];
    cursor?: Prisma.JournalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JournalScalarFieldEnum | Prisma.JournalScalarFieldEnum[];
};
/**
 * User_info.visionBoards
 */
export type User_info$visionBoardsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.VisionBoardWhereInput;
    orderBy?: Prisma.VisionBoardOrderByWithRelationInput | Prisma.VisionBoardOrderByWithRelationInput[];
    cursor?: Prisma.VisionBoardWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VisionBoardScalarFieldEnum | Prisma.VisionBoardScalarFieldEnum[];
};
/**
 * User_info without action
 */
export type User_infoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_info
     */
    select?: Prisma.User_infoSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User_info
     */
    omit?: Prisma.User_infoOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.User_infoInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=User_info.d.ts.map