import { Request, Response } from "express";
import { ICreateTransactionDTO, IGetTransactionParams } from "../interfaces/Transactions/TransactionDTOs.js";
import { TransactionService } from "../services/TransactionService.js";
import { logger } from "../utils/Logger.js";


export class TransactionController {
  private service: TransactionService;

  constructor() {
    this.service = new TransactionService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: ICreateTransactionDTO = req.body;
      const transaction = await this.service.create(data);
      
      res.status(201).json(transaction);
    } catch (error: any) {
      logger.error(`[CONTROLLER] Erro na transação: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const filters: IGetTransactionParams = req.query;
      const transactions = await this.service.listAll(filters);
      
      res.status(200).json(transactions);
    } catch (error: any) {
      logger.error(`[CONTROLLER] Erro ao listar transações: ${error.message}`);
      res.status(500).json({ error: "Erro interno ao buscar transações." });
    }
  };
}