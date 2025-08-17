import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middlewares/auth";
import { createOrder, deleteOrder, getOrder, listOrders, updateOrderStatus } from "../controllers/order.controller";
const router = Router();
router.get("/", auth, listOrders);
router.get("/:id", auth, getOrder);
router.post("/", auth, [
    body("customer_id").notEmpty(),
    body("restaurant_id").notEmpty(),
    body("payment_method").isIn(["cash", "card"]),
    body("items").isArray({ min: 1 })
], createOrder);
router.patch("/:id/status", auth, updateOrderStatus);
router.delete("/:id", auth, deleteOrder);
export default router;
