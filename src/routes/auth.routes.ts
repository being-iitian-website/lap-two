import { Router } from "express";

import { login, register, logout } from "../controllers/authentication/auth.controller";

const router = Router();

// Simple health/test route
router.get("/test", (_req, res) => {
  // eslint-disable-next-line no-console
  console.log("HIT /api/auth/test");
  res.send("auth test ok");
});

router.post("/register", register);
router.post("/login", login);

// Stateless logout endpoint
router.post("/logout", logout);

export default router;
