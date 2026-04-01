import express from "express";
import { customerRoutes } from "./src/routes/CustomerRoutes.js";
import { logger } from "./src/utils/Logger.js";
import { productRoutes } from "./src/routes/ProductRoutes.js";
import { transactionRoutes } from "./src/routes/TransactionRoutes.js";
import { authRoutes } from "./src/routes/Auth.js";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./src/docs/swagger.json" with {type: "json"};

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Chamada recebida: ${req.method} ${req.url} ${res}`);
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
app.use("/transactions", transactionRoutes);

app.listen(3000, () => {
  console.log("🚀 Servidor rodando!");
});
