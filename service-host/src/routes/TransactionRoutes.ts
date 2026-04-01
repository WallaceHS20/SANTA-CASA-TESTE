import { Router } from "express";
import { TransactionController } from "../controllers/TransactionController.js";

const transactionRoutes = Router();
const controller = new TransactionController();

// ... código atual ...
transactionRoutes.post("/", controller.create);
transactionRoutes.get("/", controller.findAll);

export { transactionRoutes };


