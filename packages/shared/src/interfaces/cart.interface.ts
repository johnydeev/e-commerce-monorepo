import { Types } from "mongoose";
import { IProductItem } from "./productItem.interface";

export interface ICart {
    customer: Types.ObjectId;
    products: IProductItem[];
    total: number;
}
