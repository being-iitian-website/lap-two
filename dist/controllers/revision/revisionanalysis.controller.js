"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevisionAnalytics = void 0;
const prismaconfig_1 = __importDefault(require("../../config/prismaconfig"));
const revision_controller_1 = require("./revision.controller");
/**
 * GET REVISION ANALYTICS (Count by Subject and Unit)
 * GET /api/revisions/analytics/count
 */
const getRevisionAnalytics = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Update missed revisions before analytics
        await (0, revision_controller_1.updateMissedRevisions)(userId);
        const revisions = await prismaconfig_1.default.revision.findMany({
            where: {
                userId,
            },
            select: {
                subject: true,
                units: true,
                status: true,
            },
        });
        // Build analytics structure: { subject: { unit: { completed, pending, missed } } }
        const analytics = {};
        revisions.forEach((revision) => {
            if (!analytics[revision.subject]) {
                analytics[revision.subject] = {};
            }
            revision.units.forEach((unit) => {
                if (!analytics[revision.subject][unit]) {
                    analytics[revision.subject][unit] = {
                        completed: 0,
                        pending: 0,
                        missed: 0,
                    };
                }
                const status = revision.status;
                if (status === "completed") {
                    analytics[revision.subject][unit].completed++;
                }
                else if (status === "pending") {
                    analytics[revision.subject][unit].pending++;
                }
                else if (status === "missed") {
                    analytics[revision.subject][unit].missed++;
                }
            });
        });
        return res.json(analytics);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching revision analytics:", error);
        return res.status(500).json({ message: "Failed to fetch revision analytics" });
    }
};
exports.getRevisionAnalytics = getRevisionAnalytics;
//# sourceMappingURL=revisionanalysis.controller.js.map