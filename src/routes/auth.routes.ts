import { Router } from "express";

import { login, register } from "../controllers/auth.controller";

const router = Router();
router.get("/test", (_req, res) => {
    console.log("HIT /api/auth/test");
    res.send("auth test ok");
  });

router.post("/register", register);
router.post("/login", login);

export default router;
