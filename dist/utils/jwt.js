import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
}
export const signToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN || "7d") => {
    const options = { expiresIn: expiresIn }; // 👈 cast fixes TS error
    return jwt.sign(payload, JWT_SECRET, options);
};
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
