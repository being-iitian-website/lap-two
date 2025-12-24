"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const target_routes_1 = __importDefault(require("./routes/target.routes"));
const revision_routes_1 = __importDefault(require("./routes/revision.routes"));
const focus_routes_1 = __importDefault(require("./routes/focus.routes"));
const space_routes_1 = __importDefault(require("./routes/space.routes"));
const performance_routes_1 = __importDefault(require("./routes/performance.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const nonacademic_routes_1 = __importDefault(require("./routes/nonacademic.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
// Import Socket.IO and subscriber
const socket_1 = require("./services/socket");
require("./services/reward.subscriber"); // Auto-start subscriber
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://lap-one-blue.vercel.app",
    ],
    credentials: true,
}));
// Health check
app.get("/", (_req, res) => {
    res.json({ message: "Server is running" });
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/targets", target_routes_1.default);
app.use("/api/revisions", revision_routes_1.default);
app.use("/api/focus", focus_routes_1.default);
app.use("/api/yourspace", space_routes_1.default);
app.use("/api/performance", performance_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api", nonacademic_routes_1.default);
app.use("/api/notifications", notification_routes_1.default);
// Start server
const port = process.env.PORT || 5000;
// Create HTTP server for Socket.IO
const httpServer = http_1.default.createServer(app);
// Initialize Socket.IO with Redis adapter
const io = (0, socket_1.initializeSocket)(httpServer);
exports.io = io;
const server = httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started successfully on port ${port}`);
    // eslint-disable-next-line no-console
    console.log(`WebSocket server ready for real-time notifications`);
});
exports.server = server;
exports.default = app;
//# sourceMappingURL=index.js.map