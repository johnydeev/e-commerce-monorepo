import { Document, Schema, model } from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import { productVariantSchema } from "./schemas/productVariant.schema";
import { imageSchema } from "./schemas/image.schema";

// Se extiende la interfaz IProduct para que se respete la firma de la entidad y 
// Document para que tenga _id, createAt, updateAt por defecto y demás propiedades de Mongoose.
export interface IProductModel extends IProduct, Document {}

const productSchema = new Schema<IProductModel>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        price: { type: Number, required: true, min: 0 },
        images: [imageSchema],
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
        sku: {
            type: String,
            unique: true,
            uppercase: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "archived"],
            default: "active",
        },
        variants: [productVariantSchema],
    },
    { timestamps: true }
);

const Product = model<IProductModel>("Product", productSchema);
export default Product;
