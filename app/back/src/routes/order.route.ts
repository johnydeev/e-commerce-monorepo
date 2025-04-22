import { Router } from "express";
import {
    createOrderController,
    updateOrderController,
    deleteOrderController,
    getOrderByIdController,
    getOrdersByCustomerController,
    updateOrderStatusController,
} from "../controllers/order.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware"; // Si tenés autenticación

const orderRouter: Router = Router();

// Crear orden
orderRouter.post("/", createOrderController);

// Actualizar orden por ID
orderRouter.put("/:orderId", AuthMiddleware, updateOrderController);

// Eliminar orden por ID
orderRouter.delete("/:orderId", AuthMiddleware, deleteOrderController);

// Obtener orden por ID
orderRouter.get("/:orderId", AuthMiddleware, getOrderByIdController);

// Obtener todas las órdenes de un cliente
orderRouter.get("/customer/:customerId", AuthMiddleware, getOrdersByCustomerController);

// Actualizar estado de una orden
orderRouter.patch("/:orderId/status", AuthMiddleware, updateOrderStatusController);

export default orderRouter;
