import Order, { IOrderModel } from "../models/order.model";


class OrderRepository {
    // Buscar una orden por su ID
    async findById(orderId: string) {
        return await Order.findById(orderId)
            .populate("products.product")
            .populate("products.variant")
            .populate("customer");
    }

    // Buscar todas las órdenes de un cliente
    async findByCustomer(customerId: string) {
        return await Order.find({ customer: customerId })
            .populate("products.product")
            .populate("products.variant");
    }

    // Crear una nueva orden
    async create(orderData: Partial<IOrderModel>) {
        const order = new Order(orderData);
        return await order.save();
    }

    // Actualizar una orden
    async update(orderId: string, updateData: Partial<IOrderModel>) {
        return await Order.findByIdAndUpdate(orderId, updateData, {
            new: true,
            runValidators: true,
        });
    }

    // Eliminar una orden
    async delete(orderId: string) {
        return await Order.findByIdAndDelete(orderId);
    }

    // Cambiar el estado de una orden
    async updateStatus(orderId: string, status: string) {
        return await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
    }
}

const orderRepository = new OrderRepository();
export default orderRepository;
