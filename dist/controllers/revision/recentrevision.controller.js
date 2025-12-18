"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevisionHistory = void 0;
const prismaconfig_1 = __importDefault(require("../../config/prismaconfig"));
const revision_controller_1 = require("./revision.controller");
/**
 * GET REVISION HISTORY
 * GET /api/revisions/history?range=7|30|all
 * Default range: 7 days
 */
const getRevisionHistory = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { range } = req.query;
        // Default to 7 days if range is not provided
        const rangeValue = range && typeof range === "string" ? range : "7";
        if (!["7", "30", "all"].includes(rangeValue)) {
            return res.status(400).json({
                message: "Range query parameter must be: 7, 30, or all",
            });
        }
        // Update missed revisions before fetching history
        await (0, revision_controller_1.updateMissedRevisions)(userId);
        let startDate;
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        if (rangeValue === "7") {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            startDate.setHours(0, 0, 0, 0);
        }
        else if (rangeValue === "30") {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            startDate.setHours(0, 0, 0, 0);
        }
        const whereClause = {
            userId,
        };
        if (startDate) {
            whereClause.revisionDate = {
                gte: startDate,
                lte: endDate,
            };
        }
        const revisions = await prismaconfig_1.default.revision.findMany({
            where: whereClause,
            select: {
                status: true,
            },
        });
        const completed = revisions.filter((r) => r.status === "completed").length;
        const pending = revisions.filter((r) => r.status === "pending").length;
        const missed = revisions.filter((r) => r.status === "missed").length;
        const response = {
            to: endDate.toISOString().split("T")[0],
            completed,
            pending,
            missed,
        };
        if (startDate) {
            response.from = startDate.toISOString().split("T")[0];
        }
        return res.json(response);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching revision history:", error);
        return res.status(500).json({ message: "Failed to fetch revision history" });
    }
};
exports.getRevisionHistory = getRevisionHistory;
//# sourceMappingURL=recentrevision.controller.js.map