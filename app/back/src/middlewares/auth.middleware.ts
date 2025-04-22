import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { handleError } from "../utils/Errors/handleError.util";
import ENVIRONMENT from "../config/environment.config";
import { ICustomer } from "../interfaces/customer.interface";
import customerService from "../services/customer.service";
import { JwtPayload } from "../interfaces/jwtpayload";
import ServerError from "../utils/Errors/serverError.util";
// Importamos la interfaz extendida

// Extendemos el tipo Request para incluir la propiedad customer
export interface AuthenticatedRequest extends Request {
    customer?: ICustomer;
}

export const AuthMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authorization_header = req.headers["authorization"];
        if (!authorization_header) {
            throw new ServerError(
                "You have not provided an authorization header",
                401
            );
        }

        const token = authorization_header.split(" ")[1];
        if (!token) {
            throw new ServerError(
                "You have not provided an authorization token",
                401
            );
        }
        
        const decoded = jwt.verify(
            token,
            ENVIRONMENT.SECRET_KEY_JWT
        ) as JwtPayload;

        // Accedemos a las nuevas propiedades, por ejemplo:
        console.log(decoded.email); // email del cliente
        console.log(decoded.role); // rol del cliente

        // Recuperamos el cliente por ID del payload decodificado
        const customer = await customerService.getById(decoded.id);
        if (!customer) {
            throw new ServerError("Client not found", 404);
        }

        req.customer = customer; // Asignamos el cliente a la solicitud

        next();
    } catch (error) {
        console.error("Failed to authenticate", error);
        handleError(res, error);
    }
};
