import { Types } from "mongoose";
import { IImage } from "./image.interface";

// Interfaz para variantes del producto
export interface IProductVariant {
    size: Types.ObjectId;
    color: Types.ObjectId;
    stock?: number;
    sku?: string;
    image?: IImage;
}
