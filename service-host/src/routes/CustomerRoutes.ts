import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController.js";

const customerRoutes = Router();
const customerController = new CustomerController();

// ✅ CORRETO: Passe a requisição inteira, não só o corpo
customerRoutes.post("/", (req, res) => customerController.createCustomer(req, res));

customerRoutes.get("/", (req, res) => customerController.list(req, res));

customerRoutes.get("/:id", (req, res) => customerController.getById(req, res));

customerRoutes.patch("/:id", (req, res) => customerController.update(req, res));

customerRoutes.delete("/:id", (req, res) => customerController.delete(req, res));

export { customerRoutes };