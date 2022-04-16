import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { body, validationResult, ValidationError } from "express-validator";
import jwt from "jsonwebtoken";

import User from "../../models/user";

const router = express.Router();

export function generateAccessToken(userData: any) {
  const serectToken: string = process.env.ACCESS_TOKEN_SECRET as string;
  return jwt.sign(userData, serectToken, {
    expiresIn: "12h",
  });
}

router.post(
  "/signin",
  [
    body("email").exists().withMessage("Email is required"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorArray: ValidationError[] = errors.array();
      return res.status(400).json({ message: errorArray[0].msg });
    }

    const sendError = () => {
      return res.status(400).json({ message: "Invalid email or password" });
    };

    const userData = await User.findOne({ email: req.body.email });

    if (!userData) return sendError();

    const { password: userPassword, ...user } = userData.toObject();

    const isCorrect = await bcrypt.compare(req.body.password, userPassword);
    if (isCorrect) {
      const accessToken = generateAccessToken(user);
      res.json({
        accessToken: accessToken,
        ...user,
      });
    } else {
      return sendError();
    }
  }
);

export { router as signinRouter };
