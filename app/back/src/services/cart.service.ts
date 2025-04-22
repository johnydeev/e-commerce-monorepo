import { Types } from "mongoose";
import { ICart } from "@ecommerce/shared";
import cartRepository from "../repositories/cart.repository";
import ServerError from "../utils/Errors/serverError.util";


class CartService {
    async findByCustomer(customerId: string): Promise<ICart | null> {
        if (!Types.ObjectId.isValid(customerId)) {
            throw new ServerError("ID de cliente no válido", 400);
        }

        const cart = await cartRepository.findByCustomer(customerId);
        if (!cart) {
            throw new ServerError("Carrito no encontrado", 404);
        }

        return cart;
    }
    async getByCustomer(customerId: string): Promise<ICart | null> {
        if (!Types.ObjectId.isValid(customerId)) {
            throw new ServerError("ID de cliente no válido", 400);
        }

        const cart = await cartRepository.getCartByCustomer(customerId);
        if (!cart) {
            throw new ServerError("Carrito no encontrado", 404);
        }

        return cart;
    }

    async create(data: Partial<ICart>): Promise<ICart | null> {
        if (
            !data.customer ||
            !Types.ObjectId.isValid(data.customer.toString())
        ) {
            throw new ServerError("ID de cliente no válido", 400);
        }

        return await cartRepository.create(data);
    }

    async update(
        customerId: string,
        data: Partial<ICart>
    ): Promise<ICart | null> {
        if (!Types.ObjectId.isValid(customerId)) {
            throw new ServerError("ID de cliente no válido", 400);
        }

        const updated = await cartRepository.update(customerId, data);
        if (!updated) {
            throw new ServerError("No se pudo actualizar el carrito", 404);
        }

        return updated;
    }

    async clear(customerId: string): Promise<ICart | null> {
        if (!Types.ObjectId.isValid(customerId)) {
            throw new ServerError("ID de cliente no válido", 400);
        }

        const cleared = await cartRepository.clear(customerId);
        if (!cleared) {
            throw new ServerError("No se pudo vaciar el carrito", 404);
        }

        return cleared;
    }

    async delete(customerId: string): Promise<ICart | null> {
        if (!Types.ObjectId.isValid(customerId)) {
            throw new ServerError("ID de cliente no válido", 400);
        }

        const deleted = await cartRepository.delete(customerId);
        if (!deleted) {
            throw new ServerError("No se encontró el carrito a eliminar", 404);
        }

        return deleted;
    }
}

const cartService = new CartService();
export default cartService;
