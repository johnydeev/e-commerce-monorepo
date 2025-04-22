import { Schema } from "mongoose";
import { IGuestCustomer } from "../../interfaces/customer.interface";

export const guestCustomerSchema = new Schema<IGuestCustomer>(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            number: { type: String, required: true },
            postalCode: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String }, // Opcional
        },
    },
    { _id: false } // importante: no queremos un _id para guest, es un subdocumento embebido
);

