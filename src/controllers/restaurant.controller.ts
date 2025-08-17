import { Request, Response } from "express";
import { Restaurant } from "../model/Restaurant";
import { asyncHandler } from "../utils/asyncHandler";

export const createRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json(restaurant);
});

export const listRestaurants = asyncHandler(async (req: Request, res: Response) => {
  const { city, status } = req.query;
  const filter: any = {};
  if (city) filter.city = city;
  if (status) filter.status = status;
  const items = await Restaurant.find(filter);
  res.json(items);
});

export const getRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const doc = await Restaurant.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Restaurant not found" });
  res.json(doc);
});

export const updateRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const doc = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: "Restaurant not found" });
  res.json(doc);
});

export const deleteRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const doc = await Restaurant.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Restaurant not found" });
  res.json({ message: "Restaurant deleted" });
});