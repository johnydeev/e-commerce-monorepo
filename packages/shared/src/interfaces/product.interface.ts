import { Types } from "mongoose";
import { IProductVariant } from "./productVariant.interface";
import { IImage } from "./image.interface";

// Interfaz principal del producto
export interface IProduct {
    name: string;
    description?: string;
    price: number;
    images?: IImage[];
    category?: Types.ObjectId;
    sku?: string;
    status?: "active" | "inactive" | "archived";
    variants?: IProductVariant[];
}
