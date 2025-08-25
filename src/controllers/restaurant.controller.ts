import { Request, Response } from "express";
import { Restaurant } from "../model/Restaurant.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthedRequest } from "../middlewares/auth.js";
import { deleteImage } from "../middlewares/cloudinaryDelete.js";
export const createRestaurant = asyncHandler(
  async (req: AuthedRequest, res: Response) => {
    const imageUrl = req.file ? (req.file as any).path : null;
    const user_id = req.user?.id;
    const exists = await Restaurant.findOne({ user_id });
    if (exists)
      return res.status(400).json({ message: "Restaurant already exist" });
    const restaurant = await Restaurant.create({
      ...req.body,
      user_id: user_id,
      restaurant_photo: imageUrl,
    });
    res.status(201).json(restaurant);
  }
);

export const listRestaurants = asyncHandler(
  async (req: Request, res: Response) => {
    const { city, status } = req.query;
    const filter: any = {};
    if (city) filter.city = city;
    if (status) filter.status = status;
    const items = await Restaurant.find(filter);
    res.json(items);
  }
);

export const getRestaurant = asyncHandler(
  async (req: Request, res: Response) => {
    const doc = await Restaurant.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Restaurant not found" });
    res.json(doc);
  }
);

export const updateRestaurant = asyncHandler(
  async (req: Request, res: Response) => {
    const imageUrl = req.file ? (req.file as any).path : null;

    if (imageUrl) {
      const rest = await Restaurant.findById(req.params.id);
      if (!rest)
        return res.status(404).json({ message: "Restaurant not found" });
      if (rest.restaurant_photo != null) {
        deleteImage(rest.restaurant_photo);
      }
      const doc = await Restaurant.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          restaurant_photo: imageUrl, // properly included here
        },
        { new: true }
      );
      res.json(doc);
    } else {
      const doc = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!doc)
        return res.status(404).json({ message: "Restaurant not found" });
      res.json(doc);
    }
  }
);

export const deleteRestaurant = asyncHandler(
  async (req: Request, res: Response) => {
    const rest = await Restaurant.findById(req.params.id);
    if (!rest) return res.status(404).json({ message: "Restaurant not found" });
    deleteImage(rest.restaurant_photo);
    const doc = await Restaurant.deleteOne(rest);
    if (!doc)
      return res.status(404).json({ message: "Restaurant not found deleted" });
    res.json({ message: "Restaurant deleted" });
  }
);
