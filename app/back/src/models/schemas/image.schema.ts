import { Schema } from "mongoose";
import { IImage } from "../../interfaces/image.interface";

export const imageSchema = new Schema<IImage>(
    {
        url: { type: String, required: true },
        alt: { type: String, default: "" },
    },
    { _id: false } // Para evitar generar un _id por cada imagen
);
