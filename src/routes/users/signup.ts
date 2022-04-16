import express, { Request, Response } from "express";
import User, { IUser } from "../../models/user";
import bcrypt from "bcrypt";
import {
  body,
  validationResult,
  CustomValidator,
  ValidationError,
} from "express-validator";
import { HydratedDocument } from "mongoose";
import { generateAccessToken } from "./signin";

const router = express.Router();

const isEmailTaken: CustomValidator = (value) => {
  return User.findOne({ email: value })
    .select("email")
    .then((user) => {
      if (user) {
        return Promise.reject("Account with that email already exist");
      }
    });
};

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Email must be valid")
      .isLength({ max: 255 })
      .withMessage("Email must be shorter than 256 characters")
      .custom(isEmailTaken),
    body("password")
      .isLength({ min: 6, max: 100 })
      .withMessage("Password must be between 6 and 100 characters")
      .isStrongPassword({
        minNumbers: 1,
        minSymbols: 1,
        minLength: 6,
        minUppercase: 0,
        minLowercase: 0,
      })
      .withMessage(
        "Password must contain at least 1 cypher, and 1 special character"
      ),
    body("fullName")
      .isLength({ min: 4, max: 40 })
      .withMessage("Full name must be between 4 and 40 characters"),
    body("country").exists().withMessage("Country is required"),
    body("hasNuclearBomb")
      .isBoolean()
      .withMessage("Specify nuclear bomb status"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorArray: ValidationError[] = errors.array();
      return res.status(400).json({ message: errorArray[0].msg });
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user: HydratedDocument<IUser> = new User({
        email: req.body.email,
        password: hashedPassword,
        fullName: req.body.fullName,
        country: req.body.country,
        hasNuclearBomb: req.body.hasNuclearBomb,
        tanks: [],
      });

      user.save().then((result) => {
        const { password, ...userData } = result.toObject();
        const accessToken = generateAccessToken(userData);
        res.status(201).json({
          accessToken: accessToken,
          ...userData,
        });
      });
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

export { router as signupRouter };
