import { ICustomer } from "@ecommerce/shared";
import { Document, Schema, model } from "mongoose";


// Se extiende la interfaz ICustomer para que se respete la firma de la entidad y 
// Document para que tenga _id, createAt, updateAt por defecto y demás propiedades de Mongoose.
export interface ICustomerModel extends ICustomer, Document {}

const customerSchema = new Schema<ICustomerModel>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
        },
        address: {
            street: { type: String },
            number: { type: String },
            postalCode: { type: String },
            city: { type: String },
            country: { type: String },
        },
        verified: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        verification_token: { 
            type: String,
        },
    },
    { timestamps: true }
);

const Customer = model<ICustomerModel>("Customer", customerSchema);

export default Customer;
