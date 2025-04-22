import { Document, Schema, model } from "mongoose";
import { ICart } from "../interfaces/cart.interface";
import { productInOrderSchema } from "./schemas/productInOrder.schema";

export interface ICartModel extends ICart, Document {}

const cartSchema = new Schema<ICartModel>(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        products: [productInOrderSchema],
    },
    { timestamps: true }
);

const Cart = model<ICartModel>("Cart", cartSchema);
export default Cart;
