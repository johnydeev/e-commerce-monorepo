import { Router } from "express";
import { getOrderByIdController } from "../controllers/order.controller";

const publicOrderRouter: Router = Router();

// ✅ Ver estado de una orden sin autenticación (por tracking ID o similar)
publicOrderRouter.get("/:orderId", getOrderByIdController);

export default publicOrderRouter;
