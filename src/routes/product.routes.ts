import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middlewares/auth.js";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", auth, [body("restaurant_id").notEmpty(), body("name").notEmpty(), body("price").isFloat({ gt: 0 })], createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);
export default router;