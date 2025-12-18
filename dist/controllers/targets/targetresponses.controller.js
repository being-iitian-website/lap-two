"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitDailyResponse = exports.deleteTarget = exports.carryForwardTarget = void 0;
const prismaconfig_1 = __importDefault(require("../../config/prismaconfig"));
/**
 * CARRY FORWARD MISSED TARGET
 * POST /api/targets/:id/carry-forward
 */
const carryForwardTarget = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const { newDate } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!newDate) {
            return res.status(400).json({ message: "newDate is required" });
        }
        const newStartTime = new Date(newDate);
        if (isNaN(newStartTime.getTime())) {
            return res.status(400).json({ message: "Invalid date format for newDate" });
        }
        // Check if target exists and belongs to user
        const target = await prismaconfig_1.default.target.findFirst({
            where: {
                id,
                userId,
            },
        });
        if (!target) {
            return res.status(404).json({ message: "Target not found or access denied" });
        }
        // Calculate new end time based on planned hours (if available)
        let updateData = {
            startTime: newStartTime,
            status: "pending",
            carryForward: true,
        };
        // Only calculate endTime if plannedHours is available
        if (target.plannedHours) {
            const newEndTime = new Date(newStartTime);
            newEndTime.setHours(newEndTime.getHours() + target.plannedHours);
            updateData.endTime = newEndTime;
        }
        const updatedTarget = await prismaconfig_1.default.target.update({
            where: { id },
            data: updateData,
        });
        return res.json({
            message: "Target carried forward successfully",
            target: {
                id: updatedTarget.id,
                startTime: updatedTarget.startTime,
                endTime: updatedTarget.endTime,
                status: updatedTarget.status,
                carryForward: updatedTarget.carryForward,
            },
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error carrying forward target:", error);
        return res.status(500).json({ message: "Failed to carry forward target" });
    }
};
exports.carryForwardTarget = carryForwardTarget;
/**
 * DELETE TARGET
 * DELETE /api/targets/:id
 */
const deleteTarget = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Check if target exists and belongs to user
        const target = await prismaconfig_1.default.target.findFirst({
            where: {
                id,
                userId,
            },
        });
        if (!target) {
            return res.status(404).json({ message: "Target not found or access denied" });
        }
        // Delete the target
        await prismaconfig_1.default.target.delete({
            where: { id },
        });
        return res.json({
            message: "Target deleted successfully",
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error deleting target:", error);
        return res.status(500).json({ message: "Failed to delete target" });
    }
};
exports.deleteTarget = deleteTarget;
/**
 * SUBMIT DAILY RESPONSE
 * POST /api/targets/:targetId/daily-response
 *
 * Submit daily question responses for a target
 * Validation:
 * - Target must belong to logged-in user
 * - responseDate must be today
 * - Responses cannot be overwritten
 */
const submitDailyResponse = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { targetId } = req.params;
        const { question1, answer1, question2, answer2 } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Validate required fields
        if (!question1 || !answer1) {
            return res.status(400).json({
                message: "question1 and answer1 are required",
            });
        }
        // Check if target exists and belongs to user
        const target = await prismaconfig_1.default.target.findFirst({
            where: {
                id: targetId,
                userId,
            },
        });
        if (!target) {
            return res.status(404).json({ message: "Target not found or access denied" });
        }
        // Get today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        // Check if responses already exist for today (cannot overwrite)
        if (target.responseDate) {
            const responseDate = new Date(target.responseDate);
            responseDate.setHours(0, 0, 0, 0);
            if (responseDate.getTime() === today.getTime()) {
                return res.status(400).json({
                    message: "Responses for today already exist and cannot be overwritten",
                });
            }
        }
        // Update target with daily responses and set status to completed
        const updatedTarget = await prismaconfig_1.default.target.update({
            where: { id: targetId },
            data: {
                dailyQuestion1: question1,
                dailyAnswer1: answer1,
                dailyQuestion2: question2 || null,
                dailyAnswer2: answer2 || null,
                responseDate: today, // Set responseDate to today
                status: "completed", // Set status to completed when response is submitted
            },
        });
        return res.json({
            message: "Daily response submitted successfully",
            target: {
                id: updatedTarget.id,
                title: updatedTarget.title,
                status: updatedTarget.status,
                responseDate: updatedTarget.responseDate,
            },
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error submitting daily response:", error);
        return res.status(500).json({ message: "Failed to submit daily response" });
    }
};
exports.submitDailyResponse = submitDailyResponse;
//# sourceMappingURL=targetresponses.controller.js.map