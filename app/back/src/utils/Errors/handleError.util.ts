import { Response } from "express";
import ServerError from "./serverError.util";


interface IErrorResponse {
    ok: boolean;   
    message: string;
    status: number;
}

export const handleError = (
    res: Response,
    error: unknown
): Response<IErrorResponse> => {
    if (error instanceof ServerError) {
        return res.status(error.status).json({
            ok: false,
            message: error.message,
            status: error.status,
        });
    }
    if (error instanceof Error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
            status: 500,
        });
    }

    return res.status(500).json({
        ok: false,
        message: "Unknown error",
        status: 500,
    });
};