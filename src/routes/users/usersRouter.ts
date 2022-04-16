import express from "express";

import { signupRouter } from "./signup";
import { signinRouter } from "./signin";
import { tokenRouter } from "./token";

const router = express.Router();

router.use(signupRouter);
router.use(signinRouter);
router.use(tokenRouter);

export { router as usersRouter };
