import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middlewares/auth.js";
import { createRestaurant, deleteRestaurant, getRestaurant, listRestaurants, updateRestaurant } from "../controllers/restaurant.controller.js";

const router = Router();

router.get("/", listRestaurants);
router.get("/:id", getRestaurant);
router.post("/", auth, [body("name").notEmpty()], createRestaurant);
router.put("/:id", auth, updateRestaurant);
router.delete("/:id", auth, deleteRestaurant);

export default router;
