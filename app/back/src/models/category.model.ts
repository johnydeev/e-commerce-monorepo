import { Document, Schema, model } from "mongoose";
import { imageSchema } from "./schemas/image.schema";
import { ICategory } from "@ecommerce/shared";

export interface ICategoryModel extends ICategory,Document {}

export const categorySchema = new Schema<ICategoryModel>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        image: imageSchema
    },
    { timestamps: true }
);

const Category = model<ICategoryModel>("Category", categorySchema);
export default Category;
