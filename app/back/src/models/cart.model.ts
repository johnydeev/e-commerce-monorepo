import { Document, Schema, model } from "mongoose";
import { productInOrderSchema } from "./schemas/productInOrder.schema";
import { ICart } from "@ecommerce/shared";

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
