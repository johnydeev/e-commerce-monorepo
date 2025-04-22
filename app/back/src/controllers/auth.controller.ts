import  { Request, Response } from "express";
import authService from "../services/auth.service";

export const verifyEmailController = async (req: Request, res: Response): Promise<void>=> {
    try {
        const { verification_token } = req.query;        

        if (typeof verification_token !== 'string') {
            res.status(400).json({ message: "Invalid verification token" });
            return;
        }

        const verifiedCustomer =
            await authService.verifyEmail(verification_token);

        res.status(200).json({
            message: "Email verified successfully",
            customer: verifiedCustomer,
        });
        return;
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message });
        return;
    }
};
