import bcrypt from "bcryptjs";
import { User } from "../model/User";
import { signToken } from "../utils/jwt";
import { asyncHandler } from "../utils/asyncHandler";
export const register = asyncHandler(async (req, res) => {
    const { name, email, password, phone, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists)
        return res.status(400).json({ message: "Email already in use" });
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash, phone, role });
    const token = signToken({ id: user._id, role: user.role });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok)
        return res.status(400).json({ message: "Invalid credentials" });
    const token = signToken({ id: user._id, role: user.role });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
