import express from "express";
import { getAllProducts, addProduct, getProductById, getFilteredProducts } from "../controllers/product.js";

const router  = express.Router();

router.get("/all", getAllProducts)
router.get("/find/:productId", getProductById)
router.get("/", getFilteredProducts)
router.post("/add", addProduct)

export default router;
