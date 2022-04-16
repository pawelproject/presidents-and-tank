import express from "express";

import { getTanksRouter } from "./getTanks";
import { createTankRouter } from "./createTank";
import { authenticateToken } from "../../middleware/authenticateToken";
import { deleteTankRouter } from "./deleteTank";
import { editTankRouter } from "./editTank";
import { getTankDetailsRouter } from "./getTankDetails";

const router = express.Router();

router.use(authenticateToken);
router.use(getTanksRouter);
router.use(getTankDetailsRouter);
router.use(createTankRouter);
router.use(deleteTankRouter);
router.use(editTankRouter);

export { router as tanksRouter };
