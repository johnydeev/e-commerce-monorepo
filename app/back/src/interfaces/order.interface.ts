import { Types } from "mongoose";
import { IProductInOrder } from "./productItem.interface";
import { IGuestCustomer } from "./customer.interface";


export interface IOrder {
    customer?: Types.ObjectId; // Usuario registrado
    guest?: IGuestCustomer; // Usuario anónimo
    products: IProductInOrder[];
    totalAmount: number;
    paymentMethod: "card" | "mercadopago" | "cash" | "crypto";
    status: "pending" | "paid" | "shipped" | "cancelled";
}
