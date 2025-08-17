import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middlewares/auth";
import { createReview, listReviews } from "../controllers/review.controller";

const router = Router();

router.get("/", listReviews);
router.post(
  "/",
  auth,
  [
    body("order_id").notEmpty(),
    body("customer_id").notEmpty(),
    body("restaurant_id").notEmpty(),
    body("rating").isInt({ min: 1, max: 5 })
  ],
  createReview
);

export default router;