import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import targetRoutes from "./routes/target.routes";
import revisionRoutes from "./routes/revision.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security
app.use(helmet());
app.use(cors());

// Health check route
app.get("/", (_req, res) => {
  res.json({ message: "Server is running" });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/targets", targetRoutes);
app.use("/api/revisions", revisionRoutes);

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started successfully on port ${port}`);
});

export { app, server };