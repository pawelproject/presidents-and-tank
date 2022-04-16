import express, { Request, Response } from "express";

import User from "../../models/user";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.user.id });

  await user?.populate("tanks", "nr");

  return res.json({ tanks: user?.tanks });
});

export { router as getTanksRouter };
