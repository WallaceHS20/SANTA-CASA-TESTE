import { Request, Response } from "express";
import { CustomerService } from "../services/CustomerService.js";
import { IGetCustomerParams } from "../interfaces/Customer/CustomerDTOs.js";

export class CustomerController {
  private service: CustomerService;

  constructor() {
    this.service = new CustomerService();
  }

  async createCustomer(req: Request, res: Response) {
    try {
      // 🟢 O SEGREDO: await antes da chamada do service
      const customer = await this.service.createCustomer(req.body);
      return res.status(201).json(customer);
    } catch (error: any) {
      console.error("Erro capturado:", error.message);
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const filters = req.query as IGetCustomerParams; // GET usa QUERY!
      const customers = await this.service.listAll(filters);
      return res.json(customers);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao listar clientes." });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const customer = await this.service.getById(Number(id));
      return res.json(customer);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedCustomer = await this.service.update(Number(id), req.body);
      return res.json(updatedCustomer);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.service.remove(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}