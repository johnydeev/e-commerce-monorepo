import { Router } from "express";
import {
    createCustomerController,
    getCustomerByIdController,
    getCustomerByEmailController,
    getAllCustomersController,
    updateCustomerController,
    deleteCustomerController,
} from "../controllers/customer.controller";

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AdminMiddleware } from "../middlewares/admin.middleware";

const customerRouter: Router = Router();

customerRouter.post("/", createCustomerController);

customerRouter.get("/", AuthMiddleware, AdminMiddleware, getAllCustomersController);

customerRouter.get("/:id", AuthMiddleware, getCustomerByIdController);

customerRouter.get("/email/:email", AuthMiddleware, getCustomerByEmailController);

customerRouter.put("/:id", AuthMiddleware, updateCustomerController);

customerRouter.delete("/:id", AuthMiddleware, deleteCustomerController);

export default customerRouter;
