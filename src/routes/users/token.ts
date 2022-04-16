import express, { Request, Response } from "express";
import { authenticateToken } from "../../middleware/authenticateToken";

const router = express.Router();

router.post("/token", authenticateToken, (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return res.json({
    message: "token is valid",
    user: { ...req.user, accessToken: token },
  });
});

export { router as tokenRouter };
