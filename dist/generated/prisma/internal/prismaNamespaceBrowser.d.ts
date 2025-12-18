import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly User_info: "User_info";
    readonly Target: "Target";
    readonly Revision: "Revision";
    readonly FocusSession: "FocusSession";
    readonly Journal: "Journal";
    readonly VisionBoard: "VisionBoard";
    readonly VisionBoardItem: "VisionBoardItem";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const User_infoScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type User_infoScalarFieldEnum = (typeof User_infoScalarFieldEnum)[keyof typeof User_infoScalarFieldEnum];
export declare const TargetScalarFieldEnum: {
    readonly id: "id";
    readonly field: "field";
    readonly subject: "subject";
    readonly title: "title";
    readonly type: "type";
    readonly plannedHours: "plannedHours";
    readonly actualHours: "actualHours";
    readonly questions: "questions";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly carryForward: "carryForward";
    readonly status: "status";
    readonly dailyQuestion1: "dailyQuestion1";
    readonly dailyAnswer1: "dailyAnswer1";
    readonly dailyQuestion2: "dailyQuestion2";
    readonly dailyAnswer2: "dailyAnswer2";
    readonly responseDate: "responseDate";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
};
export type TargetScalarFieldEnum = (typeof TargetScalarFieldEnum)[keyof typeof TargetScalarFieldEnum];
export declare const RevisionScalarFieldEnum: {
    readonly id: "id";
    readonly subject: "subject";
    readonly units: "units";
    readonly notes: "notes";
    readonly revisionDate: "revisionDate";
    readonly status: "status";
    readonly source: "source";
    readonly targetId: "targetId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RevisionScalarFieldEnum = (typeof RevisionScalarFieldEnum)[keyof typeof RevisionScalarFieldEnum];
export declare const FocusSessionScalarFieldEnum: {
    readonly id: "id";
    readonly notes: "notes";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly duration: "duration";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type FocusSessionScalarFieldEnum = (typeof FocusSessionScalarFieldEnum)[keyof typeof FocusSessionScalarFieldEnum];
export declare const JournalScalarFieldEnum: {
    readonly id: "id";
    readonly date: "date";
    readonly notes: "notes";
    readonly userId: "userId";
    readonly targetId: "targetId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type JournalScalarFieldEnum = (typeof JournalScalarFieldEnum)[keyof typeof JournalScalarFieldEnum];
export declare const VisionBoardScalarFieldEnum: {
    readonly id: "id";
    readonly columns: "columns";
    readonly rows: "rows";
    readonly gap: "gap";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VisionBoardScalarFieldEnum = (typeof VisionBoardScalarFieldEnum)[keyof typeof VisionBoardScalarFieldEnum];
export declare const VisionBoardItemScalarFieldEnum: {
    readonly id: "id";
    readonly row: "row";
    readonly column: "column";
    readonly rowSpan: "rowSpan";
    readonly columnSpan: "columnSpan";
    readonly type: "type";
    readonly text: "text";
    readonly imageUrl: "imageUrl";
    readonly fontSize: "fontSize";
    readonly textColor: "textColor";
    readonly background: "background";
    readonly boardId: "boardId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VisionBoardItemScalarFieldEnum = (typeof VisionBoardItemScalarFieldEnum)[keyof typeof VisionBoardItemScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map