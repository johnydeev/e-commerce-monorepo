export interface CreateCustomerDTO {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    address: {
        street: string;
        number: string;
        postalCode: string;
        city: string;
        country: string;
    };
    role?: "customer" | "admin"; // 'customer' por defecto
}
