import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../model/User.js";
import { signToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body as { name: string; email: string; password: string; phone?: string; role?: "customer"|"driver"|"restaurant" };
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already in use" });
  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password_hash, phone, role });
  const token = signToken({ id: user._id, role: user.role });
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });
  const token = signToken({ id: user._id, role: user.role });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});