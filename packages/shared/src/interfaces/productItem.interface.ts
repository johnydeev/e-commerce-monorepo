import { Types } from 'mongoose';

export interface IProductInOrder{
    product: Types.ObjectId;
    variant?: Types.ObjectId;
    quantity: number;
    price: number;
}
