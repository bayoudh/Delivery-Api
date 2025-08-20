import jwt, { SignOptions, JwtPayload, Secret } from "jsonwebtoken";

let JWT_SECRET: Secret;

const getJwtSecret = (): Secret => {
  if (!JWT_SECRET) {
    JWT_SECRET = process.env.JWT_SECRET!;
    if (!JWT_SECRET) {
      throw new Error(
        "JWT_SECRET not found! Make sure you have a .env file and call dotenv.config() before using jwt functions"
      );
    }
  }
  return JWT_SECRET;
};

export const signToken = (
  payload: object,
  expiresIn: string | number = process.env.JWT_EXPIRES_IN || "7d"
): string => {
  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload, getJwtSecret(), options);
};

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, getJwtSecret());
};