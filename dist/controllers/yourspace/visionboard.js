"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisionBoard = exports.saveVisionBoard = void 0;
const prismaconfig_1 = __importDefault(require("../../config/prismaconfig"));
/**
 * SAVE / UPDATE VISION BOARD
 * POST /api/vision-board/save
 *
 * Business Rules:
 * - Each user can have only one active vision board
 * - Save action overwrites existing board
 * - Empty cells are not stored
 * - Only logged-in user can save their board
 */
const saveVisionBoard = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { columns, rows, gap, items } = req.body;
        // Validate required fields
        if (columns === undefined || rows === undefined || gap === undefined) {
            return res.status(400).json({
                message: "columns, rows, and gap are required",
            });
        }
        if (!Array.isArray(items)) {
            return res.status(400).json({
                message: "items must be an array",
            });
        }
        // Validate items
        for (const item of items) {
            if (!item.type || (item.type !== "text" && item.type !== "image")) {
                return res.status(400).json({
                    message: "Each item must have a valid type ('text' or 'image')",
                });
            }
            if (item.type === "text" && !item.text) {
                return res.status(400).json({
                    message: "Text items must have a text field",
                });
            }
            if (item.type === "image" && !item.imageUrl) {
                return res.status(400).json({
                    message: "Image items must have an imageUrl field",
                });
            }
            if (item.row === undefined || item.column === undefined) {
                return res.status(400).json({
                    message: "Each item must have row and column",
                });
            }
        }
        // Use transaction to ensure atomicity
        await prismaconfig_1.default.$transaction(async (tx) => {
            // Find existing vision board for this user
            const existingBoard = await tx.visionBoard.findFirst({
                where: { userId },
            });
            if (existingBoard) {
                // Delete all existing items first
                await tx.visionBoardItem.deleteMany({
                    where: { boardId: existingBoard.id },
                });
                // Update the board
                await tx.visionBoard.update({
                    where: { id: existingBoard.id },
                    data: {
                        columns,
                        rows,
                        gap,
                    },
                });
                // Create new items
                if (items.length > 0) {
                    await tx.visionBoardItem.createMany({
                        data: items.map((item) => ({
                            row: item.row,
                            column: item.column,
                            rowSpan: item.rowSpan ?? 1,
                            columnSpan: item.columnSpan ?? 1,
                            type: item.type,
                            text: item.text ?? null,
                            imageUrl: item.imageUrl ?? null,
                            fontSize: item.fontSize ?? null,
                            textColor: item.textColor ?? null,
                            background: item.background ?? null,
                            boardId: existingBoard.id,
                        })),
                    });
                }
            }
            else {
                // Create new board
                const newBoard = await tx.visionBoard.create({
                    data: {
                        columns,
                        rows,
                        gap,
                        userId,
                    },
                });
                // Create items if any
                if (items.length > 0) {
                    await tx.visionBoardItem.createMany({
                        data: items.map((item) => ({
                            row: item.row,
                            column: item.column,
                            rowSpan: item.rowSpan ?? 1,
                            columnSpan: item.columnSpan ?? 1,
                            type: item.type,
                            text: item.text ?? null,
                            imageUrl: item.imageUrl ?? null,
                            fontSize: item.fontSize ?? null,
                            textColor: item.textColor ?? null,
                            background: item.background ?? null,
                            boardId: newBoard.id,
                        })),
                    });
                }
            }
        });
        return res.json({ message: "Vision board saved successfully" });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error saving vision board:", error);
        return res.status(500).json({ message: "Failed to save vision board" });
    }
};
exports.saveVisionBoard = saveVisionBoard;
/**
 * GET VISION BOARD
 * GET /api/vision-board
 *
 * Returns the vision board for the logged-in user
 */
const getVisionBoard = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Find the user's vision board
        const board = await prismaconfig_1.default.visionBoard.findFirst({
            where: { userId },
            include: {
                items: {
                    orderBy: [
                        { row: "asc" },
                        { column: "asc" },
                    ],
                },
            },
        });
        // If no board exists, return empty structure
        if (!board) {
            return res.json({
                columns: 4,
                rows: 4,
                gap: 8,
                items: [],
            });
        }
        // Format response
        const response = {
            columns: board.columns,
            rows: board.rows,
            gap: board.gap,
            items: board.items.map((item) => ({
                row: item.row,
                column: item.column,
                rowSpan: item.rowSpan,
                columnSpan: item.columnSpan,
                type: item.type,
                text: item.text,
                imageUrl: item.imageUrl,
                fontSize: item.fontSize,
                textColor: item.textColor,
                background: item.background,
            })),
        };
        return res.json(response);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching vision board:", error);
        return res.status(500).json({ message: "Failed to fetch vision board" });
    }
};
exports.getVisionBoard = getVisionBoard;
//# sourceMappingURL=visionboard.js.map