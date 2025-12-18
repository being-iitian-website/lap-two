"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMissedRevisions = void 0;
const prismaconfig_1 = __importDefault(require("../../config/prismaconfig"));
/**
 * Helper function to update missed revisions
 * Day boundary is 5:00 AM local time.
 *
 * Until 5:00 AM, the system still treats the previous calendar day as "today",
 * so revisions from "yesterday" are only marked as missed after 5:00 AM.
 *
 * Updates status from pending to missed if revisionDate < effectiveToday and status != completed
 */
const updateMissedRevisions = async (userId) => {
    const now = new Date();
    const effectiveToday = new Date(now);
    // Before 5 AM, roll back one day so that "today" is effectively yesterday.
    if (now.getHours() < 5) {
        effectiveToday.setDate(effectiveToday.getDate() - 1);
    }
    // Normalise to start of effective day for date-only comparison
    effectiveToday.setHours(0, 0, 0, 0);
    await prismaconfig_1.default.revision.updateMany({
        where: {
            userId,
            revisionDate: {
                lt: effectiveToday,
            },
            status: {
                not: "completed",
            },
        },
        data: {
            status: "missed",
        },
    });
};
exports.updateMissedRevisions = updateMissedRevisions;
//# sourceMappingURL=revision.helper.js.map