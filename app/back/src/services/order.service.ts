import { Types } from "mongoose";

import { IOrder } from "@ecommerce/shared";
import Order from "../models/order.model";
import orderRepository from "../repositories/order.repository";
import ServerError from "../utils/Errors/serverError.util";



class OrderService {
    async create(orderData: IOrder): Promise<IOrder> {
        const { customer, guest, products, totalAmount, paymentMethod } =
            orderData;

        if (!products || products.length === 0) {
            throw new ServerError(
                "La orden debe contener al menos un producto",
                400
            );
        }

        if (!totalAmount || totalAmount < 0) {
            throw new ServerError(
                "El monto total debe ser un valor positivo",
                400
            );
        }

        if (!paymentMethod) {
            throw new ServerError("El método de pago es requerido", 400);
        }

        const isCustomerValid =
            customer && Types.ObjectId.isValid(customer as any);
        const isGuestValid =
            guest &&
            guest.fullName &&
            guest.email &&
            guest.phone &&
            guest.address &&
            guest.address.street &&
            guest.address.number &&
            guest.address.postalCode &&
            guest.address.city;

        if (!isCustomerValid && !isGuestValid) {
            throw new ServerError(
                "Debe proveerse un cliente registrado o datos de invitado completos",
                400
            );
        }

        return await orderRepository.create(orderData);
    }

    async getAllOrders(): Promise<IOrder[]> {
        // Si en el futuro querés traer solo por customer, podés usar `findByCustomer`
        return await Order.find()
            .populate("products.product")
            .populate("products.variant")
            .populate("customer");
    }

    async getOrderById(orderId: string): Promise<IOrder> {
        if (!Types.ObjectId.isValid(orderId)) {
            throw new ServerError("ID de orden inválido", 400);
        }

        const order = await orderRepository.findById(orderId);
        if (!order) {
            throw new ServerError("Orden no encontrada", 404);
        }

        return order;
    }

    async getByCustomer(customerId: string): Promise<IOrder[]> {
        if (!Types.ObjectId.isValid(customerId)) {
            throw new ServerError("ID de cliente inválido", 400);
        }

        return await orderRepository.findByCustomer(customerId);
    }

    async update(
        orderId: string,
        updateData: Partial<IOrder>
    ): Promise<IOrder> {
        if (!Types.ObjectId.isValid(orderId)) {
            throw new ServerError("ID de orden inválido", 400);
        }

        const updated = await orderRepository.update(orderId, updateData);
        if (!updated) {
            throw new ServerError(
                "Orden no encontrada o no pudo ser actualizada",
                404
            );
        }

        return updated;
    }

    async delete(orderId: string): Promise<IOrder> {
        if (!Types.ObjectId.isValid(orderId)) {
            throw new ServerError("ID de orden inválido", 400);
        }

        const existingOrder = await orderRepository.findById(orderId);
        if (!existingOrder) {
            throw new ServerError("Orden no encontrada", 404);
        }

        const deleted = await orderRepository.delete(orderId);
        if (!deleted) {
            throw new ServerError("No se pudo eliminar la orden", 500);
        }

        return deleted;
    }

    async updateStatus(orderId: string, status: string): Promise<IOrder> {
        if (!Types.ObjectId.isValid(orderId)) {
            throw new ServerError("ID de orden inválido", 400);
        }

        const updated = await orderRepository.updateStatus(orderId, status);
        if (!updated) {
            throw new ServerError(
                "No se pudo actualizar el estado de la orden",
                404
            );
        }

        return updated;
    }
}

const orderService = new OrderService();
export default orderService;
