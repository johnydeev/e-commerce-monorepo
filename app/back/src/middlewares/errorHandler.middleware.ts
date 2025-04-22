// middlewares/errorHandler.middleware.ts
import { Request, Response, NextFunction } from "express";
import ServerError from "../utils/Errors/serverError.util";


export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error(`[ERROR]`, err);

    if (err instanceof ServerError) {
        res.status(err.status).json({
            message: err.message,            
        });
        return;
    }

    res.status(500).json({
        message: "Internal server error",
        error: err.message,
    });
};
