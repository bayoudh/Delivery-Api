import { Router } from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  [
    body("name").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").isString().notEmpty()
  ],
  login
);
export default router;