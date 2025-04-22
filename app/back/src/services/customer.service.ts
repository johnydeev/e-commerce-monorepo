import { Types } from "mongoose";
import customerRepository from "../repositories/customer.repository";
import { ICustomer } from "../interfaces/customer.interface";
import ServerError from "../utils/Errors/serverError.util";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail/sendEmail.util";
import { CreateCustomerDTO } from "../dtos/customer/createCustomer.dto";
import { UpdateCustomerDTO } from "../dtos/customer/updateCustomer.dto";


class CustomerService {
    async getAll(): Promise<ICustomer[]> {
        return await customerRepository.getAll();
    }

    async getById(customerId: string): Promise<ICustomer> {
        if (!Types.ObjectId.isValid(customerId)) {
            throw new ServerError("ID de cliente no válido", 400);
        }

        const customer = await customerRepository.findById(customerId);
        if (!customer) {
            throw new ServerError("Cliente no encontrado", 404);
        }

        return customer;
    }

    async create(
        data: CreateCustomerDTO,
        currentCustomer?: ICustomer
    ): Promise<ICustomer> {
        try {
            // Validaciones básicas
            if (
                !data.fullName ||
                !data.email ||
                !data.password ||
                !data.phone
            ) {
                throw new ServerError("Todos los campos son requeridos", 400);
            }

            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(data.email)) {
                throw new ServerError(
                    "El email no tiene un formato válido",
                    400
                );
            }

            // Verificar si ya existe el cliente
            const existingCustomer = await customerRepository.findByEmail(
                data.email
            );
            if (existingCustomer) {
                throw new ServerError("Este email ya está registrado", 400);
            }

            // Encriptar la contraseña
            const passwordHash = await bcrypt.hash(data.password, 10);

            // Validar y limpiar el rol si no es admin
            let role: "admin" | "customer" = "customer";
            if (data.role === "admin" && currentCustomer?.role === "admin") {
                role = "admin";
            }

            // Generar el token de verificación
            const verification_token = jwt.sign(
                {
                    fullName: data.fullName,
                    email: data.email,
                    role,
                },
                process.env.SECRET_KEY_JWT as string,
                { expiresIn: "24h" }
            );

            // Crear el objeto plano con los datos del cliente
            const customerToCreate: ICustomer = {
                fullName: data.fullName,
                email: data.email,
                password: passwordHash,
                phone: data.phone,
                address: data.address,
                role: role, // validado previamente para ser 'customer' o 'admin'
                verification_token,
            };

            // Guardar en la base de datos
            const newCustomer =
                await customerRepository.create(customerToCreate);

            // Enviar el email
            await sendEmail({
                to: data.email,
                subject: "Verifica tu cuenta",
                html: `
                    <h1>Valida tu email para completar el registro</h1>
                    <p>Si no te has registrado en nuestra plataforma, por favor ignora este mensaje.</p>
                    <a href="${process.env.URL_BACKEND}/api/auth/verify-email?verification_token=${verification_token}">
                        Verifica tu cuenta aquí
                    </a>
                `,
            });

            return newCustomer;
        } catch (error: any) {
            throw new ServerError(error.message, error.status || 500);
        }
    }

    async update(
        customerId: string,
        data: UpdateCustomerDTO
    ): Promise<ICustomer> {
        if (!Types.ObjectId.isValid(customerId)) {
            throw new ServerError("ID de cliente no válido", 400);
        }

        const updated = await customerRepository.update(customerId, data);
        if (!updated) {
            throw new ServerError("Cliente no encontrado", 404);
        }
        
        return updated;
    }

    async delete(customerId: string): Promise<ICustomer> {
        if (!Types.ObjectId.isValid(customerId)) {
            throw new ServerError("ID de cliente no válido", 400);
        }

        const deleted = await customerRepository.delete(customerId);
        if (!deleted) {
            throw new ServerError("Cliente no encontrado", 404);
        }

        return deleted;
    }

    async getByEmail(email: string): Promise<ICustomer> {
        const customer = await customerRepository.findByEmail(email);
        if (!customer) {
            throw new ServerError("Cliente no encontrado", 404);
        }
        return customer;
    }
}

const customerService = new CustomerService();
export default customerService;
