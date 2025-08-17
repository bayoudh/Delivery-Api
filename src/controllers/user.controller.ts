import { Request, Response } from "express";
import { User } from "../model/User";
import { asyncHandler } from "../utils/asyncHandler";

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find().select("-password_hash");
  res.json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select("-password_hash");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, phone, role },
    { new: true }
  ).select("-password_hash");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
});