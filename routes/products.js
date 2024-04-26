import express from "express";
import { getAllProducts, addProduct } from "../controllers/product.js";

const router  = express.Router();

router.get("/all", getAllProducts)
router.post("/add-product", addProduct)

export default router;
