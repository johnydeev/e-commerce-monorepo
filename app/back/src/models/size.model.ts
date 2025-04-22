import { Document, Schema, model } from "mongoose";
import { ISize } from "../interfaces/size.interface";

export interface ISizeModel extends ISize, Document {}

const sizeSchema = new Schema<ISizeModel>(
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
        order: {
            type: Number, // para ordenarlas en el frontend
            trim: true,
        },
    },
    { timestamps: true }
);

const Size = model<ISizeModel>("Size", sizeSchema);

export default Size;
