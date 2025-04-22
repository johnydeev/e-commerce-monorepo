import { Schema } from "mongoose";
import { IProductInOrder } from "../../interfaces/productItem.interface";

export const productInOrderSchema = new Schema<IProductInOrder>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        variant: {
            type: Schema.Types.ObjectId,
            ref: "Variant",
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);
