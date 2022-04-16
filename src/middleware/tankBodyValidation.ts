import { body, validationResult, ValidationError } from "express-validator";

export const tankBodyValidation = [
  body("nr")
    .isLength({ min: 3, max: 10 })
    .withMessage("Number must be between 3 and 10 characters"),
  body("producer")
    .isLength({ min: 3, max: 30 })
    .withMessage("Producer name must be between 3 and 30 characters"),
  body("model")
    .isLength({ min: 3, max: 30 })
    .withMessage("Model name must be between 3 and 30 characters"),
  body("version")
    .isLength({ min: 3, max: 30 })
    .withMessage("Version name must be between 4 and 30 characters"),
  body("tankYear")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Tank year must between 1900 and current year"),
  body("releaseDate")
    .isAfter(new Date(1970).toISOString())
    .isBefore(new Date().toISOString())
    .withMessage("Release Date must between 1970 and current time"),
  body("mileage")
    .isInt({ min: 1 })
    .withMessage("Mileage must be positive integer number"),
  body("ammo")
    .isInt({ min: 1 })
    .withMessage("Ammo must be positive integer number"),
  body("armor")
    .isInt({ min: 1 })
    .withMessage("Armor must be positive integer number"),
];
