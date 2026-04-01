import { IPostProductBase, IGetProductParams, IPatchProductParams } from "../interfaces/Product/ProductDTOs.js";
import { ProductService } from "../services/ProductService.js";
import { logger } from "../utils/Logger.js";
import { Request, Response } from "express";


export class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: IPostProductBase = req.body;
      const product = await this.service.createProduct(data);
      
      res.status(201).json(product);
    } catch (error: any) {
      logger.error(`[CONTROLLER] Erro ao criar produto: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const filters: IGetProductParams = req.query;
      const products = await this.service.listAll(filters);
      
      res.status(200).json(products);
    } catch (error: any) {
      logger.error(`[CONTROLLER] Erro ao listar produtos: ${error.message}`);
      res.status(500).json({ error: "Erro interno ao buscar produtos." });
    }
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const product = await this.service.getById(id);
      
      res.status(200).json(product);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const data: IPatchProductParams = req.body;
      const updatedProduct = await this.service.update(id, data);
      
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      logger.error(`[CONTROLLER] Erro ao atualizar produto ID ${req.params.id}: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.service.delete(id);
      
      res.status(204).send(); 
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}