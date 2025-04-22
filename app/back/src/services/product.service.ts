import { Types } from "mongoose";
import { IProduct } from "@ecommerce/shared";
import productRepository from "../repositories/product.repository";
import ServerError from "../utils/Errors/serverError.util";
import { IProductModel } from "../models/product.model";

class ProductService {
    async create(productData: IProduct): Promise<IProductModel> {
        // Check if the product already exists in the database
        if (!productData.name || !productData.price) {
            throw new Error("Product data is required: name and price");
        }

        return await productRepository.create(productData);
    }

    async getAll(): Promise<IProduct[]> {
        return await productRepository.getAll();
    }

    async getProductById(productId: string): Promise<IProduct> {
        if (!Types.ObjectId.isValid(productId)) {
            throw new ServerError("Invalid ID format", 400);
        }

        const product = await productRepository.getProductById(productId);
        if (!product) {
            throw new ServerError("Product not found", 404);
        }

        return product;
    }

    async update(
        productId: string,
        updateData: Partial<IProduct>
    ): Promise<IProduct> {
        if (!Types.ObjectId.isValid(productId)) {
            throw new ServerError("Formato de ID inválido", 400);
        }

        const updatedProduct = await productRepository.update(
            productId,
            updateData
        );
        if (!updatedProduct) {
            throw new ServerError(
                "Producto no encontrado o no pudo ser actualizado",
                404
            );
        }

        return updatedProduct;
    }

    async delete(productId: string): Promise<IProduct> {
        if (!Types.ObjectId.isValid(productId)) {
            throw new ServerError("Formato de ID inválido", 400);
        }

        const existingProduct =
            await productRepository.getProductById(productId);
        if (!existingProduct) {
            throw new ServerError("Producto no encontrado", 404);
        }

        const deleted = await productRepository.delete(productId);
        if (!deleted) {
            throw new ServerError("No se pudo eliminar el producto", 500);
        }

        return deleted;
    }
}

const productService = new ProductService();
export default productService;
