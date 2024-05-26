import express from "express";
import { getAllProducts, addProduct, getProductById, getFilteredProducts, updateProduct, deleteProduct } from "../controllers/product.js";

const router  = express.Router();

router.get("/all", getAllProducts)
router.get("/find/:productId", getProductById)
router.get("/", getFilteredProducts)
router.post("/add", addProduct)
router.post("/update/:productId", updateProduct)
router.post("/delete/:productId", deleteProduct)

export default router;
