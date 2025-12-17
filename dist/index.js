"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const target_routes_1 = __importDefault(require("./routes/target.routes"));
const revision_routes_1 = __importDefault(require("./routes/revision.routes"));
const focus_routes_1 = __importDefault(require("./routes/focus.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Security
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// Health check route
app.get("/", (_req, res) => {
    res.json({ message: "Server is running" });
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/targets", target_routes_1.default);
app.use("/api/revisions", revision_routes_1.default);
app.use("/api/focus", focus_routes_1.default);
const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started successfully on port ${port}`);
});
exports.server = server;
//# sourceMappingURL=index.js.map