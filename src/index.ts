import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import targetRoutes from "./routes/target.routes";
import revisionRoutes from "./routes/revision.routes";
import focusRoutes from "./routes/focus.routes";
import yourspaceRoutes from "./routes/space.routes";
import performanceRoutes from "./routes/performance.routes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Health check
app.get("/", (_req, res) => {
  res.json({ message: "Server is running" });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/targets", targetRoutes);
app.use("/api/revisions", revisionRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/yourspace", yourspaceRoutes);
app.use("/api/performance", performanceRoutes);

// Start server
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started successfully on port ${port}`);
});

export { app, server };
export default app;
