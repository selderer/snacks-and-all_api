import express from "express";
import { postOrder } from "../controllers/order.js";

const router  = express.Router();

router.post("/", postOrder)

export default router;
