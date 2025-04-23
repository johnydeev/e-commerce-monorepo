import { IProductItem } from "@ecommerce/shared";
import { Schema } from "mongoose";

export const productInOrderSchema = new Schema<IProductItem>(
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
