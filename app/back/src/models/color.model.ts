import { Document, Schema, model } from "mongoose";
import { IColor } from "../interfaces/color.interface";

export interface IColorModel extends IColor, Document {}

const colorSchema = new Schema<IColorModel>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        hex: {
            type: String,
        },
    },
    { timestamps: true }
);

const Color = model<IColorModel>("Color", colorSchema);

export default Color;
