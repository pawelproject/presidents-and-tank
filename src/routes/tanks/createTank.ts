import express, { Request, Response } from "express";
import Tank, { ITank } from "../../models/tank";
import { validationResult, ValidationError } from "express-validator";
import { HydratedDocument } from "mongoose";
import User from "../../models/user";
import { tankBodyValidation } from "../../middleware/tankBodyValidation";

const router = express.Router();

router.post(
  "/create",
  tankBodyValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorArray: ValidationError[] = errors.array();
      return res.status(400).json({ message: errorArray[0].msg });
    }

    try {
      const user = await User.findById(req.user.id);

      const tank: HydratedDocument<ITank> = new Tank({
        ...req.body,
        tankModel: req.body.model,
        ownerId: user?._id,
      });

      await tank.save();
      await user?.tanks.push(tank);
      await user?.save();

      return res.status(201).json({ tank: tank });
    } catch (err) {
      return res.sendStatus(500);
    }
  }
);

export { router as createTankRouter };
