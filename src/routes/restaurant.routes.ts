import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middlewares/auth.js";
import { isRole } from "../middlewares/auth.js";
import  upload from "../middlewares/cloudinaryUpload.js";
import { createRestaurant, deleteRestaurant, getRestaurant, listRestaurants, updateRestaurant } from "../controllers/restaurant.controller.js";

const router = Router();

router.get("/", listRestaurants);
router.get("/:id", getRestaurant);
router.post("/", auth,isRole(["restaurant"]),upload.single("restaurant_photo") ,[body("name").notEmpty()], createRestaurant);
router.put("/:id", auth,isRole(["restaurant"]),upload.single("restaurant_photo"), updateRestaurant);
router.delete("/:id", auth,isRole(["restaurant"]), deleteRestaurant);

export default router;
