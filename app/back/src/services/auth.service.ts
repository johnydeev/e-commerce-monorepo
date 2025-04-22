import ServerError from "../utils/Errors/serverError.util";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/auth.repository";
import { ICustomer } from "../interfaces/customer.interface";

class AuthService {
    async verifyEmail(verification_token: string): Promise<ICustomer> {
        try {
            // Verificar que exista el token
            if (!verification_token) {
                throw new ServerError("Token not provided", 400);
            }
            
            // validar el token
            const payload = jwt.verify(
                verification_token,
                process.env.SECRET_KEY_JWT as string
            );
            if (!payload) {
                throw new ServerError("Invalid Token", 400);
            }
            const { email } = payload as { email: string };

            // Buscar al usuario por email y verificar si existe
            const customer =
                await authRepository.findByVerificationToken(email);
            if (!customer) {
                throw new ServerError("Customer not found", 400);
            }
            console.log("Customer: ", customer?.verified);
            if (customer?.verified) {
                throw new ServerError("The customer is already verified", 400);
            }

            // Marcar al usuario como verificado
            if (customer) {
                customer.verified = true;
                await customer.save();
            }

            return customer;
        } catch (error: any) {
            if (error instanceof ServerError) {
                throw error;
            }
            throw new ServerError("Error verifying email", 500);
        }
    }
}

const authService = new AuthService();
export default authService;
