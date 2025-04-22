import { Types } from "mongoose";
import { IProductItem } from "./productItem.interface";
import { IGuestCustomer } from "./customer.interface";

export interface IOrder {
    customer?: Types.ObjectId; // Usuario registrado
    guest?: IGuestCustomer; // Usuario anónimo
    products: IProductItem[];
    totalAmount: number;
    paymentMethod: "card" | "mercadopago" | "cash" | "crypto";
    status: "pending" | "paid" | "shipped" | "cancelled";
}
