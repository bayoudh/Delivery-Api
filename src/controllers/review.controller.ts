import { Request, Response } from "express";
import { Review } from "../model/Review";
import { asyncHandler } from "../utils/asyncHandler";

export const createReview = asyncHandler(async (req: Request, res: Response) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
});

export const listReviews = asyncHandler(async (req: Request, res: Response) => {
  const { restaurant_id, customer_id } = req.query;
  const filter: any = {};
  if (restaurant_id) filter.restaurant_id = restaurant_id;
  if (customer_id) filter.customer_id = customer_id;
  const reviews = await Review.find(filter).sort({ created_at: -1 });
  res.json(reviews);
});