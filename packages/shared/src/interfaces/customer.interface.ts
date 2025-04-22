export interface IShippingAddress {    
    street: string;
    number: string;
    postalCode: string;
    city: string;
    country?: string;    
}

export interface ICustomer {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    address: IShippingAddress;
    role: "customer" | "admin";
    verified?: boolean; // Nuevo campo para verificar si el usuario ha validado su email
    active?: boolean; // Nuevo campo para monitorizar la actividad de la cuenta
    verification_token: string; // Token de verificación para la validación del correo electrónico
}

export interface IGuestCustomer {
    fullName: string;
    email: string;
    phone: string;
    address: IShippingAddress;
}

