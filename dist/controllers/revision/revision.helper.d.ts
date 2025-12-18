/**
 * Helper function to update missed revisions
 * Day boundary is 5:00 AM local time.
 *
 * Until 5:00 AM, the system still treats the previous calendar day as "today",
 * so revisions from "yesterday" are only marked as missed after 5:00 AM.
 *
 * Updates status from pending to missed if revisionDate < effectiveToday and status != completed
 */
export declare const updateMissedRevisions: (userId: string) => Promise<void>;
//# sourceMappingURL=revision.helper.d.ts.map