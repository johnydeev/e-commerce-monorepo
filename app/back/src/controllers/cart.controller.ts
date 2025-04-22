import { Request, Response } from "express";
import cartService from "../services/cart.service";
import { ICart } from "@ecommerce/shared";
import { handleError } from "../utils/Errors/handleError.util";


export const getCartByCustomerController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const cart: ICart | null = await cartService.getByCustomer(
            req.params.customerId
        );
        res.status(200).json(cart);
    } catch (error) {
        handleError(res, error);
    }
};

export const createCartController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const newCart: ICart | null = await cartService.create(req.body);
        res.status(201).json({
            message: "Cart created successfully",
            cart: newCart,
        });
    } catch (error) {
        handleError(res, error);
    }
};

export const updateCartController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const updatedCart: ICart | null = await cartService.update(
            req.params.customerId,
            req.body
        );
        res.status(200).json({
            message: "Cart updated",
            cart: updatedCart,
        });
    } catch (error) {
        handleError(res, error);
    }
};

export const clearCartController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const clearedCart: ICart | null = await cartService.clear(
            req.params.customerId
        );
        res.status(200).json({
            message: "Cart emptied",
            cart: clearedCart,
        });
    } catch (error) {
        handleError(res, error);
    }
};

export const deleteCartController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        await cartService.delete(req.params.customerId);
        res.status(200).json({ message: "Cart deleted" });
    } catch (error) {
        handleError(res, error);
    }
};
