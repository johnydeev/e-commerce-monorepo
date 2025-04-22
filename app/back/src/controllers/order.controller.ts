import { Request, Response } from "express";
import orderService from "../services/order.service";
import { handleError } from "../utils/Errors/handleError.util";

// ✅ Crear orden
export const createOrderController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const order = await orderService.create(req.body);
        res.status(201).json({
            ok: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// ✅ Actualizar orden
export const updateOrderController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { orderId } = req.params;
        const updated = await orderService.update(orderId, req.body);
        res.status(200).json({
            ok: true,
            message: "Order updated successfully",
            data: updated,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// ✅ Eliminar orden
export const deleteOrderController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { orderId } = req.params;
        const deleted = await orderService.delete(orderId);
        res.status(200).json({
            ok: true,
            message: "Order deleted successfully",
            data: deleted,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// ✅ Obtener orden por ID
export const getOrderByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { orderId } = req.params;
        const order = await orderService.getOrderById(orderId);
        res.status(200).json({
            ok: true,
            data: order,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// ✅ Obtener órdenes por customer
export const getOrdersByCustomerController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { customerId } = req.params;
        const orders = await orderService.getByCustomer(customerId);
        res.status(200).json({
            ok: true,
            data: orders,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// ✅ Actualizar estado de la orden
export const updateOrderStatusController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const updated = await orderService.updateStatus(orderId, status);
        res.status(200).json({
            ok: true,
            message: "Order status updated",
            data: updated,
        });
    } catch (error) {
        handleError(res, error);
    }
};

