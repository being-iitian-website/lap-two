export declare const TargetType: {
    readonly theory: "theory";
    readonly lecture: "lecture";
    readonly revision: "revision";
    readonly solving: "solving";
    readonly mock: "mock";
};
export type TargetType = (typeof TargetType)[keyof typeof TargetType];
export declare const TargetStatus: {
    readonly pending: "pending";
    readonly completed: "completed";
    readonly missed: "missed";
};
export type TargetStatus = (typeof TargetStatus)[keyof typeof TargetStatus];
export declare const RevisionStatus: {
    readonly pending: "pending";
    readonly completed: "completed";
    readonly missed: "missed";
};
export type RevisionStatus = (typeof RevisionStatus)[keyof typeof RevisionStatus];
export declare const RevisionSource: {
    readonly manual: "manual";
    readonly target: "target";
};
export type RevisionSource = (typeof RevisionSource)[keyof typeof RevisionSource];
//# sourceMappingURL=enums.d.ts.map