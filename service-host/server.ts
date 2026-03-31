import express from "express";
import { customerRoutes } from "./src/routes/CustomerRoutes.js";
import { logger } from "./src/utils/Logger.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Chamada recebida: ${req.method} ${req.url}`);
  next();
});

app.use("/customers", customerRoutes);

app.listen(3000, () => {
  console.log("🚀 Servidor rodando!");
});
