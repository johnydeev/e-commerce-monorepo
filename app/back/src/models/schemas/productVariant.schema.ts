import { Schema } from "mongoose";
import { IProductVariant } from "../../interfaces/productVariant.interface";
import { imageSchema } from "./image.schema";


export const productVariantSchema = new Schema<IProductVariant>(
    {
        size: {
            type: Schema.Types.ObjectId,
            ref: "Size",
            required: true,
        },
        color: {
            type: Schema.Types.ObjectId,
            ref: "Color",
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        sku: { type: String, trim: true },
        image: imageSchema,
    },
    { _id: false }
);
