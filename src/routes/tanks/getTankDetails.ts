import express, { Request, Response } from "express";
import Tank from "../../models/tank";

const router = express.Router();

router.get("/(:id)", async (req: Request, res: Response) => {
  const tankId = req.params.id;

  try {
    const tank = await Tank.findById(tankId);
    if (!tank) {
      return res.status(404).json({ message: "tank with that id not found" });
    }

    return res.json(tank);
  } catch (err) {
    res.sendStatus(500);
  }
});

export { router as getTankDetailsRouter };
