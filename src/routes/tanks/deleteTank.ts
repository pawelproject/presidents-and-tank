import express, { NextFunction, Request, Response } from "express";
import Tank from "../../models/tank";

const router = express.Router();

router.delete(
  "/(:id)",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tank = await Tank.findOne({ _id: req.params.id });
      if (tank) {
        if (tank?.ownerId.toString() !== req.user.id) {
          return res.sendStatus(403);
        }
        await tank?.remove();
      }

      return res.sendStatus(204);
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

export { router as deleteTankRouter };
