import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Target
 *
 */
export type TargetModel = runtime.Types.Result.DefaultSelection<Prisma.$TargetPayload>;
export type AggregateTarget = {
    _count: TargetCountAggregateOutputType | null;
    _avg: TargetAvgAggregateOutputType | null;
    _sum: TargetSumAggregateOutputType | null;
    _min: TargetMinAggregateOutputType | null;
    _max: TargetMaxAggregateOutputType | null;
};
export type TargetAvgAggregateOutputType = {
    plannedHours: number | null;
    actualHours: number | null;
    questions: number | null;
};
export type TargetSumAggregateOutputType = {
    plannedHours: number | null;
    actualHours: number | null;
    questions: number | null;
};
export type TargetMinAggregateOutputType = {
    id: string | null;
    field: string | null;
    subject: string | null;
    title: string | null;
    type: $Enums.TargetType | null;
    plannedHours: number | null;
    actualHours: number | null;
    questions: number | null;
    startTime: Date | null;
    endTime: Date | null;
    carryForward: boolean | null;
    status: $Enums.TargetStatus | null;
    dailyQuestion1: string | null;
    dailyAnswer1: string | null;
    dailyQuestion2: string | null;
    dailyAnswer2: string | null;
    responseDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
};
export type TargetMaxAggregateOutputType = {
    id: string | null;
    field: string | null;
    subject: string | null;
    title: string | null;
    type: $Enums.TargetType | null;
    plannedHours: number | null;
    actualHours: number | null;
    questions: number | null;
    startTime: Date | null;
    endTime: Date | null;
    carryForward: boolean | null;
    status: $Enums.TargetStatus | null;
    dailyQuestion1: string | null;
    dailyAnswer1: string | null;
    dailyQuestion2: string | null;
    dailyAnswer2: string | null;
    responseDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
};
export type TargetCountAggregateOutputType = {
    id: number;
    field: number;
    subject: number;
    title: number;
    type: number;
    plannedHours: number;
    actualHours: number;
    questions: number;
    startTime: number;
    endTime: number;
    carryForward: number;
    status: number;
    dailyQuestion1: number;
    dailyAnswer1: number;
    dailyQuestion2: number;
    dailyAnswer2: number;
    responseDate: number;
    createdAt: number;
    updatedAt: number;
    userId: number;
    _all: number;
};
export type TargetAvgAggregateInputType = {
    plannedHours?: true;
    actualHours?: true;
    questions?: true;
};
export type TargetSumAggregateInputType = {
    plannedHours?: true;
    actualHours?: true;
    questions?: true;
};
export type TargetMinAggregateInputType = {
    id?: true;
    field?: true;
    subject?: true;
    title?: true;
    type?: true;
    plannedHours?: true;
    actualHours?: true;
    questions?: true;
    startTime?: true;
    endTime?: true;
    carryForward?: true;
    status?: true;
    dailyQuestion1?: true;
    dailyAnswer1?: true;
    dailyQuestion2?: true;
    dailyAnswer2?: true;
    responseDate?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
};
export type TargetMaxAggregateInputType = {
    id?: true;
    field?: true;
    subject?: true;
    title?: true;
    type?: true;
    plannedHours?: true;
    actualHours?: true;
    questions?: true;
    startTime?: true;
    endTime?: true;
    carryForward?: true;
    status?: true;
    dailyQuestion1?: true;
    dailyAnswer1?: true;
    dailyQuestion2?: true;
    dailyAnswer2?: true;
    responseDate?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
};
export type TargetCountAggregateInputType = {
    id?: true;
    field?: true;
    subject?: true;
    title?: true;
    type?: true;
    plannedHours?: true;
    actualHours?: true;
    questions?: true;
    startTime?: true;
    endTime?: true;
    carryForward?: true;
    status?: true;
    dailyQuestion1?: true;
    dailyAnswer1?: true;
    dailyQuestion2?: true;
    dailyAnswer2?: true;
    responseDate?: true;
    createdAt?: true;
    updatedAt?: true;
    userId?: true;
    _all?: true;
};
export type TargetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Target to aggregate.
     */
    where?: Prisma.TargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Targets to fetch.
     */
    orderBy?: Prisma.TargetOrderByWithRelationInput | Prisma.TargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.TargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Targets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Targets
    **/
    _count?: true | TargetCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: TargetAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: TargetSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: TargetMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: TargetMaxAggregateInputType;
};
export type GetTargetAggregateType<T extends TargetAggregateArgs> = {
    [P in keyof T & keyof AggregateTarget]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTarget[P]> : Prisma.GetScalarType<T[P], AggregateTarget[P]>;
};
export type TargetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TargetWhereInput;
    orderBy?: Prisma.TargetOrderByWithAggregationInput | Prisma.TargetOrderByWithAggregationInput[];
    by: Prisma.TargetScalarFieldEnum[] | Prisma.TargetScalarFieldEnum;
    having?: Prisma.TargetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TargetCountAggregateInputType | true;
    _avg?: TargetAvgAggregateInputType;
    _sum?: TargetSumAggregateInputType;
    _min?: TargetMinAggregateInputType;
    _max?: TargetMaxAggregateInputType;
};
export type TargetGroupByOutputType = {
    id: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours: number | null;
    actualHours: number | null;
    questions: number | null;
    startTime: Date | null;
    endTime: Date | null;
    carryForward: boolean;
    status: $Enums.TargetStatus;
    dailyQuestion1: string | null;
    dailyAnswer1: string | null;
    dailyQuestion2: string | null;
    dailyAnswer2: string | null;
    responseDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    _count: TargetCountAggregateOutputType | null;
    _avg: TargetAvgAggregateOutputType | null;
    _sum: TargetSumAggregateOutputType | null;
    _min: TargetMinAggregateOutputType | null;
    _max: TargetMaxAggregateOutputType | null;
};
type GetTargetGroupByPayload<T extends TargetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TargetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TargetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TargetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TargetGroupByOutputType[P]>;
}>>;
export type TargetWhereInput = {
    AND?: Prisma.TargetWhereInput | Prisma.TargetWhereInput[];
    OR?: Prisma.TargetWhereInput[];
    NOT?: Prisma.TargetWhereInput | Prisma.TargetWhereInput[];
    id?: Prisma.StringFilter<"Target"> | string;
    field?: Prisma.StringFilter<"Target"> | string;
    subject?: Prisma.StringFilter<"Target"> | string;
    title?: Prisma.StringFilter<"Target"> | string;
    type?: Prisma.EnumTargetTypeFilter<"Target"> | $Enums.TargetType;
    plannedHours?: Prisma.FloatNullableFilter<"Target"> | number | null;
    actualHours?: Prisma.FloatNullableFilter<"Target"> | number | null;
    questions?: Prisma.IntNullableFilter<"Target"> | number | null;
    startTime?: Prisma.DateTimeNullableFilter<"Target"> | Date | string | null;
    endTime?: Prisma.DateTimeNullableFilter<"Target"> | Date | string | null;
    carryForward?: Prisma.BoolFilter<"Target"> | boolean;
    status?: Prisma.EnumTargetStatusFilter<"Target"> | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.StringNullableFilter<"Target"> | string | null;
    dailyAnswer1?: Prisma.StringNullableFilter<"Target"> | string | null;
    dailyQuestion2?: Prisma.StringNullableFilter<"Target"> | string | null;
    dailyAnswer2?: Prisma.StringNullableFilter<"Target"> | string | null;
    responseDate?: Prisma.DateTimeNullableFilter<"Target"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Target"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Target"> | Date | string;
    userId?: Prisma.StringFilter<"Target"> | string;
    user?: Prisma.XOR<Prisma.User_infoScalarRelationFilter, Prisma.User_infoWhereInput>;
    revisions?: Prisma.RevisionListRelationFilter;
    journals?: Prisma.JournalListRelationFilter;
};
export type TargetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    plannedHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    actualHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    questions?: Prisma.SortOrderInput | Prisma.SortOrder;
    startTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    endTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    carryForward?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dailyQuestion1?: Prisma.SortOrderInput | Prisma.SortOrder;
    dailyAnswer1?: Prisma.SortOrderInput | Prisma.SortOrder;
    dailyQuestion2?: Prisma.SortOrderInput | Prisma.SortOrder;
    dailyAnswer2?: Prisma.SortOrderInput | Prisma.SortOrder;
    responseDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    user?: Prisma.User_infoOrderByWithRelationInput;
    revisions?: Prisma.RevisionOrderByRelationAggregateInput;
    journals?: Prisma.JournalOrderByRelationAggregateInput;
};
export type TargetWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TargetWhereInput | Prisma.TargetWhereInput[];
    OR?: Prisma.TargetWhereInput[];
    NOT?: Prisma.TargetWhereInput | Prisma.TargetWhereInput[];
    field?: Prisma.StringFilter<"Target"> | string;
    subject?: Prisma.StringFilter<"Target"> | string;
    title?: Prisma.StringFilter<"Target"> | string;
    type?: Prisma.EnumTargetTypeFilter<"Target"> | $Enums.TargetType;
    plannedHours?: Prisma.FloatNullableFilter<"Target"> | number | null;
    actualHours?: Prisma.FloatNullableFilter<"Target"> | number | null;
    questions?: Prisma.IntNullableFilter<"Target"> | number | null;
    startTime?: Prisma.DateTimeNullableFilter<"Target"> | Date | string | null;
    endTime?: Prisma.DateTimeNullableFilter<"Target"> | Date | string | null;
    carryForward?: Prisma.BoolFilter<"Target"> | boolean;
    status?: Prisma.EnumTargetStatusFilter<"Target"> | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.StringNullableFilter<"Target"> | string | null;
    dailyAnswer1?: Prisma.StringNullableFilter<"Target"> | string | null;
    dailyQuestion2?: Prisma.StringNullableFilter<"Target"> | string | null;
    dailyAnswer2?: Prisma.StringNullableFilter<"Target"> | string | null;
    responseDate?: Prisma.DateTimeNullableFilter<"Target"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Target"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Target"> | Date | string;
    userId?: Prisma.StringFilter<"Target"> | string;
    user?: Prisma.XOR<Prisma.User_infoScalarRelationFilter, Prisma.User_infoWhereInput>;
    revisions?: Prisma.RevisionListRelationFilter;
    journals?: Prisma.JournalListRelationFilter;
}, "id">;
export type TargetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    plannedHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    actualHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    questions?: Prisma.SortOrderInput | Prisma.SortOrder;
    startTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    endTime?: Prisma.SortOrderInput | Prisma.SortOrder;
    carryForward?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dailyQuestion1?: Prisma.SortOrderInput | Prisma.SortOrder;
    dailyAnswer1?: Prisma.SortOrderInput | Prisma.SortOrder;
    dailyQuestion2?: Prisma.SortOrderInput | Prisma.SortOrder;
    dailyAnswer2?: Prisma.SortOrderInput | Prisma.SortOrder;
    responseDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    _count?: Prisma.TargetCountOrderByAggregateInput;
    _avg?: Prisma.TargetAvgOrderByAggregateInput;
    _max?: Prisma.TargetMaxOrderByAggregateInput;
    _min?: Prisma.TargetMinOrderByAggregateInput;
    _sum?: Prisma.TargetSumOrderByAggregateInput;
};
export type TargetScalarWhereWithAggregatesInput = {
    AND?: Prisma.TargetScalarWhereWithAggregatesInput | Prisma.TargetScalarWhereWithAggregatesInput[];
    OR?: Prisma.TargetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TargetScalarWhereWithAggregatesInput | Prisma.TargetScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Target"> | string;
    field?: Prisma.StringWithAggregatesFilter<"Target"> | string;
    subject?: Prisma.StringWithAggregatesFilter<"Target"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Target"> | string;
    type?: Prisma.EnumTargetTypeWithAggregatesFilter<"Target"> | $Enums.TargetType;
    plannedHours?: Prisma.FloatNullableWithAggregatesFilter<"Target"> | number | null;
    actualHours?: Prisma.FloatNullableWithAggregatesFilter<"Target"> | number | null;
    questions?: Prisma.IntNullableWithAggregatesFilter<"Target"> | number | null;
    startTime?: Prisma.DateTimeNullableWithAggregatesFilter<"Target"> | Date | string | null;
    endTime?: Prisma.DateTimeNullableWithAggregatesFilter<"Target"> | Date | string | null;
    carryForward?: Prisma.BoolWithAggregatesFilter<"Target"> | boolean;
    status?: Prisma.EnumTargetStatusWithAggregatesFilter<"Target"> | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.StringNullableWithAggregatesFilter<"Target"> | string | null;
    dailyAnswer1?: Prisma.StringNullableWithAggregatesFilter<"Target"> | string | null;
    dailyQuestion2?: Prisma.StringNullableWithAggregatesFilter<"Target"> | string | null;
    dailyAnswer2?: Prisma.StringNullableWithAggregatesFilter<"Target"> | string | null;
    responseDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Target"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Target"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Target"> | Date | string;
    userId?: Prisma.StringWithAggregatesFilter<"Target"> | string;
};
export type TargetCreateInput = {
    id?: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours?: number | null;
    actualHours?: number | null;
    questions?: number | null;
    startTime?: Date | string | null;
    endTime?: Date | string | null;
    carryForward?: boolean;
    status?: $Enums.TargetStatus;
    dailyQuestion1?: string | null;
    dailyAnswer1?: string | null;
    dailyQuestion2?: string | null;
    dailyAnswer2?: string | null;
    responseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.User_infoCreateNestedOneWithoutTargetsInput;
    revisions?: Prisma.RevisionCreateNestedManyWithoutTargetInput;
    journals?: Prisma.JournalCreateNestedManyWithoutTargetInput;
};
export type TargetUncheckedCreateInput = {
    id?: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours?: number | null;
    actualHours?: number | null;
    questions?: number | null;
    startTime?: Date | string | null;
    endTime?: Date | string | null;
    carryForward?: boolean;
    status?: $Enums.TargetStatus;
    dailyQuestion1?: string | null;
    dailyAnswer1?: string | null;
    dailyQuestion2?: string | null;
    dailyAnswer2?: string | null;
    responseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    revisions?: Prisma.RevisionUncheckedCreateNestedManyWithoutTargetInput;
    journals?: Prisma.JournalUncheckedCreateNestedManyWithoutTargetInput;
};
export type TargetUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.User_infoUpdateOneRequiredWithoutTargetsNestedInput;
    revisions?: Prisma.RevisionUpdateManyWithoutTargetNestedInput;
    journals?: Prisma.JournalUpdateManyWithoutTargetNestedInput;
};
export type TargetUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    revisions?: Prisma.RevisionUncheckedUpdateManyWithoutTargetNestedInput;
    journals?: Prisma.JournalUncheckedUpdateManyWithoutTargetNestedInput;
};
export type TargetCreateManyInput = {
    id?: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours?: number | null;
    actualHours?: number | null;
    questions?: number | null;
    startTime?: Date | string | null;
    endTime?: Date | string | null;
    carryForward?: boolean;
    status?: $Enums.TargetStatus;
    dailyQuestion1?: string | null;
    dailyAnswer1?: string | null;
    dailyQuestion2?: string | null;
    dailyAnswer2?: string | null;
    responseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
};
export type TargetUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TargetUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TargetListRelationFilter = {
    every?: Prisma.TargetWhereInput;
    some?: Prisma.TargetWhereInput;
    none?: Prisma.TargetWhereInput;
};
export type TargetOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TargetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    plannedHours?: Prisma.SortOrder;
    actualHours?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    carryForward?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dailyQuestion1?: Prisma.SortOrder;
    dailyAnswer1?: Prisma.SortOrder;
    dailyQuestion2?: Prisma.SortOrder;
    dailyAnswer2?: Prisma.SortOrder;
    responseDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type TargetAvgOrderByAggregateInput = {
    plannedHours?: Prisma.SortOrder;
    actualHours?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
};
export type TargetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    plannedHours?: Prisma.SortOrder;
    actualHours?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    carryForward?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dailyQuestion1?: Prisma.SortOrder;
    dailyAnswer1?: Prisma.SortOrder;
    dailyQuestion2?: Prisma.SortOrder;
    dailyAnswer2?: Prisma.SortOrder;
    responseDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type TargetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    field?: Prisma.SortOrder;
    subject?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    plannedHours?: Prisma.SortOrder;
    actualHours?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    carryForward?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    dailyQuestion1?: Prisma.SortOrder;
    dailyAnswer1?: Prisma.SortOrder;
    dailyQuestion2?: Prisma.SortOrder;
    dailyAnswer2?: Prisma.SortOrder;
    responseDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type TargetSumOrderByAggregateInput = {
    plannedHours?: Prisma.SortOrder;
    actualHours?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
};
export type TargetNullableScalarRelationFilter = {
    is?: Prisma.TargetWhereInput | null;
    isNot?: Prisma.TargetWhereInput | null;
};
export type TargetCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TargetCreateWithoutUserInput, Prisma.TargetUncheckedCreateWithoutUserInput> | Prisma.TargetCreateWithoutUserInput[] | Prisma.TargetUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TargetCreateOrConnectWithoutUserInput | Prisma.TargetCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TargetCreateManyUserInputEnvelope;
    connect?: Prisma.TargetWhereUniqueInput | Prisma.TargetWhereUniqueInput[];
};
export type TargetUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TargetCreateWithoutUserInput, Prisma.TargetUncheckedCreateWithoutUserInput> | Prisma.TargetCreateWithoutUserInput[] | Prisma.TargetUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TargetCreateOrConnectWithoutUserInput | Prisma.TargetCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TargetCreateManyUserInputEnvelope;
    connect?: Prisma.TargetWhereUniqueInput | Prisma.TargetWhereUniqueInput[];
};
export type TargetUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TargetCreateWithoutUserInput, Prisma.TargetUncheckedCreateWithoutUserInput> | Prisma.TargetCreateWithoutUserInput[] | Prisma.TargetUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TargetCreateOrConnectWithoutUserInput | Prisma.TargetCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TargetUpsertWithWhereUniqueWithoutUserInput | Prisma.TargetUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TargetCreateManyUserInputEnvelope;
    set?: Prisma.TargetWhereUniqueInput | Prisma.TargetWhereUniqueInput[];
    disconnect?: Prisma.TargetWhereUniqueInput | Prisma.TargetWhereUniqueInput[];
    delete?: Prisma.TargetWhereUniqueInput | Prisma.TargetWhereUniqueInput[];
    connect?: Prisma.TargetWhereUniqueInput | Prisma.TargetWhereUniqueInput[];
    update?: Prisma.TargetUpdateWithWhereUniqueWithoutUserInput | Prisma.TargetUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TargetUpdateManyWithWhereWithoutUserInput | Prisma.TargetUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TargetScalarWhereInput | Prisma.TargetScalarWhereInput[];
};
export type TargetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TargetCreateWithoutUserInput, Prisma.TargetUncheckedCreateWithoutUserInput> | Prisma.TargetCreateWithoutUserInput[] | Prisma.TargetUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TargetCreateOrConnectWithoutUserInput | Prisma.TargetCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TargetUpsertWithWhereUniqueWithoutUserInput | Prisma.TargetUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TargetCreateManyUserInputEnvelope;
    set?: Prisma.TargetWhereUniqueInput | Prisma.TargetWhereUniqueInput[];
    disconnect?: Prisma.TargetWhereUniqueInput | Prisma.TargetWhereUniqueInput[];
    delete?: Prisma.TargetWhereUniqueInput | Prisma.TargetWhereUniqueInput[];
    connect?: Prisma.TargetWhereUniqueInput | Prisma.TargetWhereUniqueInput[];
    update?: Prisma.TargetUpdateWithWhereUniqueWithoutUserInput | Prisma.TargetUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TargetUpdateManyWithWhereWithoutUserInput | Prisma.TargetUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TargetScalarWhereInput | Prisma.TargetScalarWhereInput[];
};
export type EnumTargetTypeFieldUpdateOperationsInput = {
    set?: $Enums.TargetType;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type EnumTargetStatusFieldUpdateOperationsInput = {
    set?: $Enums.TargetStatus;
};
export type TargetCreateNestedOneWithoutRevisionsInput = {
    create?: Prisma.XOR<Prisma.TargetCreateWithoutRevisionsInput, Prisma.TargetUncheckedCreateWithoutRevisionsInput>;
    connectOrCreate?: Prisma.TargetCreateOrConnectWithoutRevisionsInput;
    connect?: Prisma.TargetWhereUniqueInput;
};
export type TargetUpdateOneWithoutRevisionsNestedInput = {
    create?: Prisma.XOR<Prisma.TargetCreateWithoutRevisionsInput, Prisma.TargetUncheckedCreateWithoutRevisionsInput>;
    connectOrCreate?: Prisma.TargetCreateOrConnectWithoutRevisionsInput;
    upsert?: Prisma.TargetUpsertWithoutRevisionsInput;
    disconnect?: Prisma.TargetWhereInput | boolean;
    delete?: Prisma.TargetWhereInput | boolean;
    connect?: Prisma.TargetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TargetUpdateToOneWithWhereWithoutRevisionsInput, Prisma.TargetUpdateWithoutRevisionsInput>, Prisma.TargetUncheckedUpdateWithoutRevisionsInput>;
};
export type TargetCreateNestedOneWithoutJournalsInput = {
    create?: Prisma.XOR<Prisma.TargetCreateWithoutJournalsInput, Prisma.TargetUncheckedCreateWithoutJournalsInput>;
    connectOrCreate?: Prisma.TargetCreateOrConnectWithoutJournalsInput;
    connect?: Prisma.TargetWhereUniqueInput;
};
export type TargetUpdateOneWithoutJournalsNestedInput = {
    create?: Prisma.XOR<Prisma.TargetCreateWithoutJournalsInput, Prisma.TargetUncheckedCreateWithoutJournalsInput>;
    connectOrCreate?: Prisma.TargetCreateOrConnectWithoutJournalsInput;
    upsert?: Prisma.TargetUpsertWithoutJournalsInput;
    disconnect?: Prisma.TargetWhereInput | boolean;
    delete?: Prisma.TargetWhereInput | boolean;
    connect?: Prisma.TargetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TargetUpdateToOneWithWhereWithoutJournalsInput, Prisma.TargetUpdateWithoutJournalsInput>, Prisma.TargetUncheckedUpdateWithoutJournalsInput>;
};
export type TargetCreateWithoutUserInput = {
    id?: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours?: number | null;
    actualHours?: number | null;
    questions?: number | null;
    startTime?: Date | string | null;
    endTime?: Date | string | null;
    carryForward?: boolean;
    status?: $Enums.TargetStatus;
    dailyQuestion1?: string | null;
    dailyAnswer1?: string | null;
    dailyQuestion2?: string | null;
    dailyAnswer2?: string | null;
    responseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    revisions?: Prisma.RevisionCreateNestedManyWithoutTargetInput;
    journals?: Prisma.JournalCreateNestedManyWithoutTargetInput;
};
export type TargetUncheckedCreateWithoutUserInput = {
    id?: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours?: number | null;
    actualHours?: number | null;
    questions?: number | null;
    startTime?: Date | string | null;
    endTime?: Date | string | null;
    carryForward?: boolean;
    status?: $Enums.TargetStatus;
    dailyQuestion1?: string | null;
    dailyAnswer1?: string | null;
    dailyQuestion2?: string | null;
    dailyAnswer2?: string | null;
    responseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    revisions?: Prisma.RevisionUncheckedCreateNestedManyWithoutTargetInput;
    journals?: Prisma.JournalUncheckedCreateNestedManyWithoutTargetInput;
};
export type TargetCreateOrConnectWithoutUserInput = {
    where: Prisma.TargetWhereUniqueInput;
    create: Prisma.XOR<Prisma.TargetCreateWithoutUserInput, Prisma.TargetUncheckedCreateWithoutUserInput>;
};
export type TargetCreateManyUserInputEnvelope = {
    data: Prisma.TargetCreateManyUserInput | Prisma.TargetCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TargetUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TargetWhereUniqueInput;
    update: Prisma.XOR<Prisma.TargetUpdateWithoutUserInput, Prisma.TargetUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TargetCreateWithoutUserInput, Prisma.TargetUncheckedCreateWithoutUserInput>;
};
export type TargetUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TargetWhereUniqueInput;
    data: Prisma.XOR<Prisma.TargetUpdateWithoutUserInput, Prisma.TargetUncheckedUpdateWithoutUserInput>;
};
export type TargetUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TargetScalarWhereInput;
    data: Prisma.XOR<Prisma.TargetUpdateManyMutationInput, Prisma.TargetUncheckedUpdateManyWithoutUserInput>;
};
export type TargetScalarWhereInput = {
    AND?: Prisma.TargetScalarWhereInput | Prisma.TargetScalarWhereInput[];
    OR?: Prisma.TargetScalarWhereInput[];
    NOT?: Prisma.TargetScalarWhereInput | Prisma.TargetScalarWhereInput[];
    id?: Prisma.StringFilter<"Target"> | string;
    field?: Prisma.StringFilter<"Target"> | string;
    subject?: Prisma.StringFilter<"Target"> | string;
    title?: Prisma.StringFilter<"Target"> | string;
    type?: Prisma.EnumTargetTypeFilter<"Target"> | $Enums.TargetType;
    plannedHours?: Prisma.FloatNullableFilter<"Target"> | number | null;
    actualHours?: Prisma.FloatNullableFilter<"Target"> | number | null;
    questions?: Prisma.IntNullableFilter<"Target"> | number | null;
    startTime?: Prisma.DateTimeNullableFilter<"Target"> | Date | string | null;
    endTime?: Prisma.DateTimeNullableFilter<"Target"> | Date | string | null;
    carryForward?: Prisma.BoolFilter<"Target"> | boolean;
    status?: Prisma.EnumTargetStatusFilter<"Target"> | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.StringNullableFilter<"Target"> | string | null;
    dailyAnswer1?: Prisma.StringNullableFilter<"Target"> | string | null;
    dailyQuestion2?: Prisma.StringNullableFilter<"Target"> | string | null;
    dailyAnswer2?: Prisma.StringNullableFilter<"Target"> | string | null;
    responseDate?: Prisma.DateTimeNullableFilter<"Target"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Target"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Target"> | Date | string;
    userId?: Prisma.StringFilter<"Target"> | string;
};
export type TargetCreateWithoutRevisionsInput = {
    id?: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours?: number | null;
    actualHours?: number | null;
    questions?: number | null;
    startTime?: Date | string | null;
    endTime?: Date | string | null;
    carryForward?: boolean;
    status?: $Enums.TargetStatus;
    dailyQuestion1?: string | null;
    dailyAnswer1?: string | null;
    dailyQuestion2?: string | null;
    dailyAnswer2?: string | null;
    responseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.User_infoCreateNestedOneWithoutTargetsInput;
    journals?: Prisma.JournalCreateNestedManyWithoutTargetInput;
};
export type TargetUncheckedCreateWithoutRevisionsInput = {
    id?: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours?: number | null;
    actualHours?: number | null;
    questions?: number | null;
    startTime?: Date | string | null;
    endTime?: Date | string | null;
    carryForward?: boolean;
    status?: $Enums.TargetStatus;
    dailyQuestion1?: string | null;
    dailyAnswer1?: string | null;
    dailyQuestion2?: string | null;
    dailyAnswer2?: string | null;
    responseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    journals?: Prisma.JournalUncheckedCreateNestedManyWithoutTargetInput;
};
export type TargetCreateOrConnectWithoutRevisionsInput = {
    where: Prisma.TargetWhereUniqueInput;
    create: Prisma.XOR<Prisma.TargetCreateWithoutRevisionsInput, Prisma.TargetUncheckedCreateWithoutRevisionsInput>;
};
export type TargetUpsertWithoutRevisionsInput = {
    update: Prisma.XOR<Prisma.TargetUpdateWithoutRevisionsInput, Prisma.TargetUncheckedUpdateWithoutRevisionsInput>;
    create: Prisma.XOR<Prisma.TargetCreateWithoutRevisionsInput, Prisma.TargetUncheckedCreateWithoutRevisionsInput>;
    where?: Prisma.TargetWhereInput;
};
export type TargetUpdateToOneWithWhereWithoutRevisionsInput = {
    where?: Prisma.TargetWhereInput;
    data: Prisma.XOR<Prisma.TargetUpdateWithoutRevisionsInput, Prisma.TargetUncheckedUpdateWithoutRevisionsInput>;
};
export type TargetUpdateWithoutRevisionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.User_infoUpdateOneRequiredWithoutTargetsNestedInput;
    journals?: Prisma.JournalUpdateManyWithoutTargetNestedInput;
};
export type TargetUncheckedUpdateWithoutRevisionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    journals?: Prisma.JournalUncheckedUpdateManyWithoutTargetNestedInput;
};
export type TargetCreateWithoutJournalsInput = {
    id?: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours?: number | null;
    actualHours?: number | null;
    questions?: number | null;
    startTime?: Date | string | null;
    endTime?: Date | string | null;
    carryForward?: boolean;
    status?: $Enums.TargetStatus;
    dailyQuestion1?: string | null;
    dailyAnswer1?: string | null;
    dailyQuestion2?: string | null;
    dailyAnswer2?: string | null;
    responseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.User_infoCreateNestedOneWithoutTargetsInput;
    revisions?: Prisma.RevisionCreateNestedManyWithoutTargetInput;
};
export type TargetUncheckedCreateWithoutJournalsInput = {
    id?: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours?: number | null;
    actualHours?: number | null;
    questions?: number | null;
    startTime?: Date | string | null;
    endTime?: Date | string | null;
    carryForward?: boolean;
    status?: $Enums.TargetStatus;
    dailyQuestion1?: string | null;
    dailyAnswer1?: string | null;
    dailyQuestion2?: string | null;
    dailyAnswer2?: string | null;
    responseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userId: string;
    revisions?: Prisma.RevisionUncheckedCreateNestedManyWithoutTargetInput;
};
export type TargetCreateOrConnectWithoutJournalsInput = {
    where: Prisma.TargetWhereUniqueInput;
    create: Prisma.XOR<Prisma.TargetCreateWithoutJournalsInput, Prisma.TargetUncheckedCreateWithoutJournalsInput>;
};
export type TargetUpsertWithoutJournalsInput = {
    update: Prisma.XOR<Prisma.TargetUpdateWithoutJournalsInput, Prisma.TargetUncheckedUpdateWithoutJournalsInput>;
    create: Prisma.XOR<Prisma.TargetCreateWithoutJournalsInput, Prisma.TargetUncheckedCreateWithoutJournalsInput>;
    where?: Prisma.TargetWhereInput;
};
export type TargetUpdateToOneWithWhereWithoutJournalsInput = {
    where?: Prisma.TargetWhereInput;
    data: Prisma.XOR<Prisma.TargetUpdateWithoutJournalsInput, Prisma.TargetUncheckedUpdateWithoutJournalsInput>;
};
export type TargetUpdateWithoutJournalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.User_infoUpdateOneRequiredWithoutTargetsNestedInput;
    revisions?: Prisma.RevisionUpdateManyWithoutTargetNestedInput;
};
export type TargetUncheckedUpdateWithoutJournalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    revisions?: Prisma.RevisionUncheckedUpdateManyWithoutTargetNestedInput;
};
export type TargetCreateManyUserInput = {
    id?: string;
    field: string;
    subject: string;
    title: string;
    type: $Enums.TargetType;
    plannedHours?: number | null;
    actualHours?: number | null;
    questions?: number | null;
    startTime?: Date | string | null;
    endTime?: Date | string | null;
    carryForward?: boolean;
    status?: $Enums.TargetStatus;
    dailyQuestion1?: string | null;
    dailyAnswer1?: string | null;
    dailyQuestion2?: string | null;
    dailyAnswer2?: string | null;
    responseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TargetUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revisions?: Prisma.RevisionUpdateManyWithoutTargetNestedInput;
    journals?: Prisma.JournalUpdateManyWithoutTargetNestedInput;
};
export type TargetUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revisions?: Prisma.RevisionUncheckedUpdateManyWithoutTargetNestedInput;
    journals?: Prisma.JournalUncheckedUpdateManyWithoutTargetNestedInput;
};
export type TargetUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    field?: Prisma.StringFieldUpdateOperationsInput | string;
    subject?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTargetTypeFieldUpdateOperationsInput | $Enums.TargetType;
    plannedHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    actualHours?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    questions?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    startTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carryForward?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumTargetStatusFieldUpdateOperationsInput | $Enums.TargetStatus;
    dailyQuestion1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer1?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyQuestion2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dailyAnswer2?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type TargetCountOutputType
 */
export type TargetCountOutputType = {
    revisions: number;
    journals: number;
};
export type TargetCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    revisions?: boolean | TargetCountOutputTypeCountRevisionsArgs;
    journals?: boolean | TargetCountOutputTypeCountJournalsArgs;
};
/**
 * TargetCountOutputType without action
 */
export type TargetCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetCountOutputType
     */
    select?: Prisma.TargetCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * TargetCountOutputType without action
 */
export type TargetCountOutputTypeCountRevisionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RevisionWhereInput;
};
/**
 * TargetCountOutputType without action
 */
export type TargetCountOutputTypeCountJournalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JournalWhereInput;
};
export type TargetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    field?: boolean;
    subject?: boolean;
    title?: boolean;
    type?: boolean;
    plannedHours?: boolean;
    actualHours?: boolean;
    questions?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    carryForward?: boolean;
    status?: boolean;
    dailyQuestion1?: boolean;
    dailyAnswer1?: boolean;
    dailyQuestion2?: boolean;
    dailyAnswer2?: boolean;
    responseDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
    revisions?: boolean | Prisma.Target$revisionsArgs<ExtArgs>;
    journals?: boolean | Prisma.Target$journalsArgs<ExtArgs>;
    _count?: boolean | Prisma.TargetCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["target"]>;
export type TargetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    field?: boolean;
    subject?: boolean;
    title?: boolean;
    type?: boolean;
    plannedHours?: boolean;
    actualHours?: boolean;
    questions?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    carryForward?: boolean;
    status?: boolean;
    dailyQuestion1?: boolean;
    dailyAnswer1?: boolean;
    dailyQuestion2?: boolean;
    dailyAnswer2?: boolean;
    responseDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["target"]>;
export type TargetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    field?: boolean;
    subject?: boolean;
    title?: boolean;
    type?: boolean;
    plannedHours?: boolean;
    actualHours?: boolean;
    questions?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    carryForward?: boolean;
    status?: boolean;
    dailyQuestion1?: boolean;
    dailyAnswer1?: boolean;
    dailyQuestion2?: boolean;
    dailyAnswer2?: boolean;
    responseDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["target"]>;
export type TargetSelectScalar = {
    id?: boolean;
    field?: boolean;
    subject?: boolean;
    title?: boolean;
    type?: boolean;
    plannedHours?: boolean;
    actualHours?: boolean;
    questions?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    carryForward?: boolean;
    status?: boolean;
    dailyQuestion1?: boolean;
    dailyAnswer1?: boolean;
    dailyQuestion2?: boolean;
    dailyAnswer2?: boolean;
    responseDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userId?: boolean;
};
export type TargetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "field" | "subject" | "title" | "type" | "plannedHours" | "actualHours" | "questions" | "startTime" | "endTime" | "carryForward" | "status" | "dailyQuestion1" | "dailyAnswer1" | "dailyQuestion2" | "dailyAnswer2" | "responseDate" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["target"]>;
export type TargetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
    revisions?: boolean | Prisma.Target$revisionsArgs<ExtArgs>;
    journals?: boolean | Prisma.Target$journalsArgs<ExtArgs>;
    _count?: boolean | Prisma.TargetCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TargetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
};
export type TargetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.User_infoDefaultArgs<ExtArgs>;
};
export type $TargetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Target";
    objects: {
        user: Prisma.$User_infoPayload<ExtArgs>;
        revisions: Prisma.$RevisionPayload<ExtArgs>[];
        journals: Prisma.$JournalPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        field: string;
        subject: string;
        title: string;
        type: $Enums.TargetType;
        plannedHours: number | null;
        actualHours: number | null;
        questions: number | null;
        startTime: Date | null;
        endTime: Date | null;
        carryForward: boolean;
        status: $Enums.TargetStatus;
        dailyQuestion1: string | null;
        dailyAnswer1: string | null;
        dailyQuestion2: string | null;
        dailyAnswer2: string | null;
        responseDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }, ExtArgs["result"]["target"]>;
    composites: {};
};
export type TargetGetPayload<S extends boolean | null | undefined | TargetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TargetPayload, S>;
export type TargetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TargetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TargetCountAggregateInputType | true;
};
export interface TargetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Target'];
        meta: {
            name: 'Target';
        };
    };
    /**
     * Find zero or one Target that matches the filter.
     * @param {TargetFindUniqueArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TargetFindUniqueArgs>(args: Prisma.SelectSubset<T, TargetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TargetClient<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Target that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TargetFindUniqueOrThrowArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TargetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TargetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TargetClient<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Target that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindFirstArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TargetFindFirstArgs>(args?: Prisma.SelectSubset<T, TargetFindFirstArgs<ExtArgs>>): Prisma.Prisma__TargetClient<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Target that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindFirstOrThrowArgs} args - Arguments to find a Target
     * @example
     * // Get one Target
     * const target = await prisma.target.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TargetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TargetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TargetClient<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Targets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Targets
     * const targets = await prisma.target.findMany()
     *
     * // Get first 10 Targets
     * const targets = await prisma.target.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const targetWithIdOnly = await prisma.target.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TargetFindManyArgs>(args?: Prisma.SelectSubset<T, TargetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Target.
     * @param {TargetCreateArgs} args - Arguments to create a Target.
     * @example
     * // Create one Target
     * const Target = await prisma.target.create({
     *   data: {
     *     // ... data to create a Target
     *   }
     * })
     *
     */
    create<T extends TargetCreateArgs>(args: Prisma.SelectSubset<T, TargetCreateArgs<ExtArgs>>): Prisma.Prisma__TargetClient<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Targets.
     * @param {TargetCreateManyArgs} args - Arguments to create many Targets.
     * @example
     * // Create many Targets
     * const target = await prisma.target.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TargetCreateManyArgs>(args?: Prisma.SelectSubset<T, TargetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Targets and returns the data saved in the database.
     * @param {TargetCreateManyAndReturnArgs} args - Arguments to create many Targets.
     * @example
     * // Create many Targets
     * const target = await prisma.target.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Targets and only return the `id`
     * const targetWithIdOnly = await prisma.target.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TargetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TargetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Target.
     * @param {TargetDeleteArgs} args - Arguments to delete one Target.
     * @example
     * // Delete one Target
     * const Target = await prisma.target.delete({
     *   where: {
     *     // ... filter to delete one Target
     *   }
     * })
     *
     */
    delete<T extends TargetDeleteArgs>(args: Prisma.SelectSubset<T, TargetDeleteArgs<ExtArgs>>): Prisma.Prisma__TargetClient<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Target.
     * @param {TargetUpdateArgs} args - Arguments to update one Target.
     * @example
     * // Update one Target
     * const target = await prisma.target.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TargetUpdateArgs>(args: Prisma.SelectSubset<T, TargetUpdateArgs<ExtArgs>>): Prisma.Prisma__TargetClient<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Targets.
     * @param {TargetDeleteManyArgs} args - Arguments to filter Targets to delete.
     * @example
     * // Delete a few Targets
     * const { count } = await prisma.target.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TargetDeleteManyArgs>(args?: Prisma.SelectSubset<T, TargetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Targets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Targets
     * const target = await prisma.target.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TargetUpdateManyArgs>(args: Prisma.SelectSubset<T, TargetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Targets and returns the data updated in the database.
     * @param {TargetUpdateManyAndReturnArgs} args - Arguments to update many Targets.
     * @example
     * // Update many Targets
     * const target = await prisma.target.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Targets and only return the `id`
     * const targetWithIdOnly = await prisma.target.updateManyAndReturn({
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
    updateManyAndReturn<T extends TargetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TargetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Target.
     * @param {TargetUpsertArgs} args - Arguments to update or create a Target.
     * @example
     * // Update or create a Target
     * const target = await prisma.target.upsert({
     *   create: {
     *     // ... data to create a Target
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Target we want to update
     *   }
     * })
     */
    upsert<T extends TargetUpsertArgs>(args: Prisma.SelectSubset<T, TargetUpsertArgs<ExtArgs>>): Prisma.Prisma__TargetClient<runtime.Types.Result.GetResult<Prisma.$TargetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Targets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetCountArgs} args - Arguments to filter Targets to count.
     * @example
     * // Count the number of Targets
     * const count = await prisma.target.count({
     *   where: {
     *     // ... the filter for the Targets we want to count
     *   }
     * })
    **/
    count<T extends TargetCountArgs>(args?: Prisma.Subset<T, TargetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TargetCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Target.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TargetAggregateArgs>(args: Prisma.Subset<T, TargetAggregateArgs>): Prisma.PrismaPromise<GetTargetAggregateType<T>>;
    /**
     * Group by Target.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetGroupByArgs} args - Group by arguments.
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
    groupBy<T extends TargetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TargetGroupByArgs['orderBy'];
    } : {
        orderBy?: TargetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TargetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTargetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Target model
     */
    readonly fields: TargetFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Target.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__TargetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.User_infoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User_infoDefaultArgs<ExtArgs>>): Prisma.Prisma__User_infoClient<runtime.Types.Result.GetResult<Prisma.$User_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    revisions<T extends Prisma.Target$revisionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Target$revisionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    journals<T extends Prisma.Target$journalsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Target$journalsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Target model
 */
export interface TargetFieldRefs {
    readonly id: Prisma.FieldRef<"Target", 'String'>;
    readonly field: Prisma.FieldRef<"Target", 'String'>;
    readonly subject: Prisma.FieldRef<"Target", 'String'>;
    readonly title: Prisma.FieldRef<"Target", 'String'>;
    readonly type: Prisma.FieldRef<"Target", 'TargetType'>;
    readonly plannedHours: Prisma.FieldRef<"Target", 'Float'>;
    readonly actualHours: Prisma.FieldRef<"Target", 'Float'>;
    readonly questions: Prisma.FieldRef<"Target", 'Int'>;
    readonly startTime: Prisma.FieldRef<"Target", 'DateTime'>;
    readonly endTime: Prisma.FieldRef<"Target", 'DateTime'>;
    readonly carryForward: Prisma.FieldRef<"Target", 'Boolean'>;
    readonly status: Prisma.FieldRef<"Target", 'TargetStatus'>;
    readonly dailyQuestion1: Prisma.FieldRef<"Target", 'String'>;
    readonly dailyAnswer1: Prisma.FieldRef<"Target", 'String'>;
    readonly dailyQuestion2: Prisma.FieldRef<"Target", 'String'>;
    readonly dailyAnswer2: Prisma.FieldRef<"Target", 'String'>;
    readonly responseDate: Prisma.FieldRef<"Target", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Target", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Target", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"Target", 'String'>;
}
/**
 * Target findUnique
 */
export type TargetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Target to fetch.
     */
    where: Prisma.TargetWhereUniqueInput;
};
/**
 * Target findUniqueOrThrow
 */
export type TargetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Target to fetch.
     */
    where: Prisma.TargetWhereUniqueInput;
};
/**
 * Target findFirst
 */
export type TargetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Target to fetch.
     */
    where?: Prisma.TargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Targets to fetch.
     */
    orderBy?: Prisma.TargetOrderByWithRelationInput | Prisma.TargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Targets.
     */
    cursor?: Prisma.TargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Targets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Targets.
     */
    distinct?: Prisma.TargetScalarFieldEnum | Prisma.TargetScalarFieldEnum[];
};
/**
 * Target findFirstOrThrow
 */
export type TargetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Target to fetch.
     */
    where?: Prisma.TargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Targets to fetch.
     */
    orderBy?: Prisma.TargetOrderByWithRelationInput | Prisma.TargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Targets.
     */
    cursor?: Prisma.TargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Targets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Targets.
     */
    distinct?: Prisma.TargetScalarFieldEnum | Prisma.TargetScalarFieldEnum[];
};
/**
 * Target findMany
 */
export type TargetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Targets to fetch.
     */
    where?: Prisma.TargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Targets to fetch.
     */
    orderBy?: Prisma.TargetOrderByWithRelationInput | Prisma.TargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Targets.
     */
    cursor?: Prisma.TargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Targets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Targets.
     */
    skip?: number;
    distinct?: Prisma.TargetScalarFieldEnum | Prisma.TargetScalarFieldEnum[];
};
/**
 * Target create
 */
export type TargetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Target.
     */
    data: Prisma.XOR<Prisma.TargetCreateInput, Prisma.TargetUncheckedCreateInput>;
};
/**
 * Target createMany
 */
export type TargetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Targets.
     */
    data: Prisma.TargetCreateManyInput | Prisma.TargetCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Target createManyAndReturn
 */
export type TargetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: Prisma.TargetSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Target
     */
    omit?: Prisma.TargetOmit<ExtArgs> | null;
    /**
     * The data used to create many Targets.
     */
    data: Prisma.TargetCreateManyInput | Prisma.TargetCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TargetIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Target update
 */
export type TargetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Target.
     */
    data: Prisma.XOR<Prisma.TargetUpdateInput, Prisma.TargetUncheckedUpdateInput>;
    /**
     * Choose, which Target to update.
     */
    where: Prisma.TargetWhereUniqueInput;
};
/**
 * Target updateMany
 */
export type TargetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Targets.
     */
    data: Prisma.XOR<Prisma.TargetUpdateManyMutationInput, Prisma.TargetUncheckedUpdateManyInput>;
    /**
     * Filter which Targets to update
     */
    where?: Prisma.TargetWhereInput;
    /**
     * Limit how many Targets to update.
     */
    limit?: number;
};
/**
 * Target updateManyAndReturn
 */
export type TargetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Target
     */
    select?: Prisma.TargetSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Target
     */
    omit?: Prisma.TargetOmit<ExtArgs> | null;
    /**
     * The data used to update Targets.
     */
    data: Prisma.XOR<Prisma.TargetUpdateManyMutationInput, Prisma.TargetUncheckedUpdateManyInput>;
    /**
     * Filter which Targets to update
     */
    where?: Prisma.TargetWhereInput;
    /**
     * Limit how many Targets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TargetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Target upsert
 */
export type TargetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Target to update in case it exists.
     */
    where: Prisma.TargetWhereUniqueInput;
    /**
     * In case the Target found by the `where` argument doesn't exist, create a new Target with this data.
     */
    create: Prisma.XOR<Prisma.TargetCreateInput, Prisma.TargetUncheckedCreateInput>;
    /**
     * In case the Target was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.TargetUpdateInput, Prisma.TargetUncheckedUpdateInput>;
};
/**
 * Target delete
 */
export type TargetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Target to delete.
     */
    where: Prisma.TargetWhereUniqueInput;
};
/**
 * Target deleteMany
 */
export type TargetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Targets to delete
     */
    where?: Prisma.TargetWhereInput;
    /**
     * Limit how many Targets to delete.
     */
    limit?: number;
};
/**
 * Target.revisions
 */
export type Target$revisionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Target.journals
 */
export type Target$journalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Target without action
 */
export type TargetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Target.d.ts.map