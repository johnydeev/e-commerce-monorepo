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

// ✅ Crear customer (registro público)
customerRouter.post("/", createCustomerController);

// ✅ Obtener todos los customers (solo admin)
customerRouter.get("/", AuthMiddleware, AdminMiddleware, getAllCustomersController);

// ✅ Obtener un customer por ID (privado)
customerRouter.get("/:id", AuthMiddleware, getCustomerByIdController);

// ✅ Obtener un customer por email (privado)
customerRouter.get("/email/:email", AuthMiddleware, getCustomerByEmailController);

// ✅ Actualizar customer (privado)
customerRouter.put("/:id", AuthMiddleware, updateCustomerController);

// ✅ Eliminar customer (privado)
customerRouter.delete("/:id", AuthMiddleware, deleteCustomerController);

export default customerRouter;
