import { IProduct } from "../interfaces/product.interface";
import Product, { IProductModel } from "../models/product.model";

class ProductRepository {
    async create(productData: IProduct): Promise<IProductModel> {

        const product = new Product(productData);
        return await product.save();
    }

    async getAll(): Promise<IProductModel[]> {
        return await Product.find();
    }

    async getProductById(productId: string): Promise<IProductModel | null> {

        return await Product.findById(productId);
    }

    async update(
        productId: string,
        updateData: Partial<IProductModel>
    ): Promise<IProductModel | null> {
        return await Product.findByIdAndUpdate(productId, updateData, {
            new: true,
        });
    }

    async delete(productId: string): Promise<IProductModel | null> {
        return await Product.findByIdAndDelete(productId);
    }
}

const productRepository = new ProductRepository();
export default productRepository;
