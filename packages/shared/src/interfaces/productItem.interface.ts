import { Types } from 'mongoose';

export interface IProductItem {
    product: Types.ObjectId;
    variant?: Types.ObjectId;
    quantity: number;
    price: number;
}
