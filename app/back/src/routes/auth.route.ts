import { Router } from "express";
import { verifyEmailController } from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.get("/verify-email", verifyEmailController);

export default authRouter;
