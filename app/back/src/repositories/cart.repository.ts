import Cart, { ICartModel } from "../models/cart.model";

class CartRepository {
    async findByCustomer(customerId: string) {
        return await Cart.findOne({ customer: customerId })
            .populate("products.product")
            .populate("products.variant");
    }

    async create(cartData: Partial<ICartModel>): Promise<ICartModel | null> {
        const cart = new Cart(cartData);
        return await cart.save();
    }

    async getCartByCustomer(customerId: string): Promise<ICartModel | null> {
        return await Cart.findOne({ customer: customerId })
            .populate("products.product")
            .populate("products.variant");
    }

    async update(
        customerId: string,
        updateData: Partial<ICartModel>
    ): Promise<ICartModel | null> {
        return await Cart.findOneAndUpdate(
            { customer: customerId },
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    async clear(customerId: string) {
        return await Cart.findOneAndUpdate(
            { customer: customerId },
            { products: [], total: 0 },
            { new: true }
        );
    }

    async delete(customerId: string) {
        return await Cart.findOneAndDelete({ customer: customerId });
    }
}
const cartRepository = new CartRepository();
export default cartRepository;
