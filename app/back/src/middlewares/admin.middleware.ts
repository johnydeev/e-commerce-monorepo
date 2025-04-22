import { Request, Response, NextFunction } from "express";
import { handleError } from "../utils/Errors/handleError.util";
import { ICustomer } from "../interfaces/customer.interface";
import ServerError from "../utils/Errors/serverError.util";

interface AuthenticatedRequest extends Request {
    customer?: ICustomer;
}

export const AdminMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        if (!req.customer || req.customer.role !== "admin") {
            throw new ServerError(
                "Access denied: Administrator role required",
                403
            );
        }
        next();
    } catch (error) {
        console.error("Authorization error:", error);
        handleError(res, error);
    }
};
