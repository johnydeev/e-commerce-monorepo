import { Document, Schema, model } from "mongoose";
import { productInOrderSchema } from "./schemas/productInOrder.schema";
import { guestCustomerSchema } from "./schemas/guestCustomer.schema";
import { IOrder } from "@ecommerce/shared";

export interface IOrderModel extends IOrder, Document {}

const orderSchema = new Schema<IOrderModel>(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
        },
        guest: guestCustomerSchema,
        products: [productInOrderSchema],
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "cancelled"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            enum: ["card", "mercadopago", "cash", "crypto"],
            required: true,
        },
    },
    { timestamps: true }
);

// Validación de presencia de customer o guest
orderSchema.pre("validate", function (next) {
    const hasCustomer = !!this.customer;
    const hasGuest = !!(
        this.guest?.fullName &&
        this.guest?.email &&
        this.guest?.phone
    );

    if (!hasCustomer && !hasGuest) {
        return next(
            new Error(
                "Debe existir al menos un usuario registrado o datos de invitado."
            )
        );
    }

    next();
});

const Order = model<IOrderModel>("Order", orderSchema);

export default Order;
