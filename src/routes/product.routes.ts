import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middlewares/auth.js";
import { isRole } from "../middlewares/auth.js";
import  upload from "../middlewares/cloudinaryUpload.js";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../controllers/product.controller.js";


const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", auth,isRole(["restaurant"]),upload.single("product_photo"),[body("name").notEmpty(), body("price").isFloat({ gt: 0 })], createProduct);
router.put("/:id", auth,isRole(["restaurant"]), updateProduct);
router.delete("/:id", auth,isRole(["restaurant"]),deleteProduct);
export default router;