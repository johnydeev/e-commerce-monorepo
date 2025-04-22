import { Request, Response } from "express";
import productService from "../services/product.service";
import { IProduct } from "../interfaces/product.interface";

export const createProductController = async (req: Request, res: Response):Promise<void> => {
    try {
        const newProduct: IProduct = await productService.create(req.body);
        
        res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        });
    } catch (error:any) {
        console.error("Driver error:", error);
        res.status(400).json({ message: error.message });
    }
};

export const getAllProductsController = async (req: Request, res: Response):Promise<void> => {
    try {
        const products: IProduct[] = await productService.getAll();
        res.status(200).json(products);
    } catch (error:any) {
        console.error("Error getting products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getProductByIdController = async (req: Request, res: Response):Promise<void> => {
    try {
        const product: IProduct | null = await productService.getProductById(
            req.params.id
        );
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return
        }
        res.status(200).json(product);  
    } catch (error:any) {
        console.error("Error getting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProductController = async (req: Request, res: Response):Promise<void>  => {
    try {
        const updatedProduct: IProduct | null = await productService.update(
            req.params.id,
            req.body
        );
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({
            message: "Product updated successfully",
            updatedProduct,
        });
    } catch (error:any) {
        console.error("Error uptading product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteProductController = async (req: Request, res: Response):Promise<void>  => {
    try {
        const deletedProduct: IProduct | null = await productService.delete(req.params.id);
        if (!deletedProduct) {            
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted" });
    } catch (error:any) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
