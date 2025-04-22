import { Request, Response } from "express";
import customerService from "../services/customer.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { ICustomer } from "@ecommerce/shared";

export const createCustomerController = async (
    req: AuthenticatedRequest, // Usamos AuthenticatedRequest para que 'customer' esté disponible
    res: Response
): Promise<void> => {
    try {
        // Aseguramos que req.customer está tipado correctamente como ICustomer
        const currentCustomer = req.customer as ICustomer;

        const newCustomer: ICustomer = await customerService.create(
            req.body, // Datos del nuevo cliente
            currentCustomer // Cliente actual (quien está haciendo la solicitud)
        );

        res.status(201).json({
            message: "Client created successfully",
            customer: newCustomer,
        });
    } catch (error: any) {
        console.error("Error creating client:", error);
        res.status(400).json({ message: error.message });
    }
};


export const getAllCustomersController = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const customers: ICustomer[] = await customerService.getAll();
        res.status(200).json(customers);
    } catch (error: any) {
        console.error("Error getting clients:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getCustomerByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const customer: ICustomer | null = await customerService.getById(
            req.params.id
        );
        if (!customer) {
            res.status(404).json({ message: "Client not found" });
            return;
        }
        res.status(200).json(customer);
    } catch (error: any) {
        console.error("Error getting client:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getCustomerByEmailController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const customer: ICustomer | null = await customerService.getByEmail(
            req.params.email
        );
        if (!customer) {
            res.status(404).json({ message: "Client not found" });
            return;
        }
        res.status(200).json(customer);
    } catch (error: any) {
        console.error("Error searching for client by email:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateCustomerController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const updatedCustomer: ICustomer | null = await customerService.update(
            req.params.id,
            req.body
        );
        if (!updatedCustomer) {
            res.status(404).json({ message: "Client not found" });
            return;
        }
        res.status(200).json({
            message: "Client updated successfully",
            updatedCustomer,
        });
    } catch (error: any) {
        console.error("Error updating client:", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteCustomerController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const deletedCustomer: ICustomer | null = await customerService.delete(
            req.params.id
        );
        if (!deletedCustomer) {
            res.status(404).json({ message: "Client not found" });
            return;
        }
        res.status(200).json({ message: "Cliente deleted" });
    } catch (error: any) {
        console.error("Error deleting client:", error);
        res.status(500).json({ message: error.message });
    }
};
