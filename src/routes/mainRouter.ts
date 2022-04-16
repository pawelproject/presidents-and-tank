import express from "express";
import path from "path";

import { usersRouter } from "./users/usersRouter";
import { tanksRouter } from "./tanks/tanksRouter";
import { errorHandler } from "../middleware/errorHandler";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/tanks", tanksRouter);

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

router.use(errorHandler);

export { router as mainRouter };
