import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";

const productRoutes = Router();
const controller = new ProductController();

productRoutes.post("/", controller.createProduct);
productRoutes.get("/", controller.findAll);
productRoutes.get("/:id", controller.findById);
productRoutes.patch("/:id", controller.update);
productRoutes.delete("/:id", controller.delete);

export { productRoutes };