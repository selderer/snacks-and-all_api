import express from "express";
import { registerAdmin, authenticateAdmin } from "../controllers/admin.js";

const router  = express.Router();

router.post("/register", registerAdmin)
router.post("/login", authenticateAdmin)

export default router;
