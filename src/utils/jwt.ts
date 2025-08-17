import jwt, { SignOptions, JwtPayload, Secret } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as Secret;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

export const signToken = (
  payload: object,
  expiresIn: string | number = process.env.JWT_EXPIRES_IN || "7d"
): string => {
  const options: SignOptions = { expiresIn: expiresIn as any }; // 👈 cast fixes TS error
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, JWT_SECRET);
};
