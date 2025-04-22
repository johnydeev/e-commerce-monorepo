import { Router } from "express";
import {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
} from "../controllers/product.controller";

const productRouter:Router = Router();

productRouter.post("/", createProductController);
productRouter.get("/", getAllProductsController);
productRouter.get("/:id", getProductByIdController);
productRouter.put("/:id", updateProductController);
productRouter.delete("/:id", deleteProductController);

export default productRouter;
