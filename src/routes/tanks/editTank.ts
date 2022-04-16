import express, { Request, Response } from "express";
import Tank from "../../models/tank";
import { validationResult, ValidationError } from "express-validator";

import { tankBodyValidation } from "../../middleware/tankBodyValidation";

const router = express.Router();

router.put(
  "/(:id)",
  tankBodyValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorArray: ValidationError[] = errors.array();
      return res.status(400).json({ message: errorArray[0].msg });
    }

    const tank = await Tank.findById(req.params.id);

    if (!tank) {
      return res.status(404).json({ message: "There is no tank with that id" });
    }

    if (tank?.ownerId.toString() !== req.user.id) {
      return res.sendStatus(403);
    }

    const dataToUpdate = {
      ...req.body,
      tankModel: req.body.model,
    };

    Tank.findByIdAndUpdate(
      req.params.id,
      dataToUpdate,
      { new: true },
      (err: any, doc: any) => {
        if (err) {
          return res.sendStatus(500);
        } else {
          return res.json({ message: "Tank successfully edited", tank: doc });
        }
      }
    );
  }
);

export { router as editTankRouter };
