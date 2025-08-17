import { Request, Response } from "express";
import { Product } from "../model/Product";
import { asyncHandler } from "../utils/asyncHandler";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

export const listProducts = asyncHandler(async (req: Request, res: Response) => {
  const { restaurant_id, available } = req.query;
  const filter: any = {};
  if (restaurant_id) filter.restaurant_id = restaurant_id;
  if (available !== undefined) filter.available = available === "true";
  const items = await Product.find(filter);
  res.json(items);
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const doc = await Product.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Product not found" });
  res.json(doc);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const doc = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: "Product not found" });
  res.json(doc);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const doc = await Product.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
});