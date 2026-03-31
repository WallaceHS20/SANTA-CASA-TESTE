import { CustomerFactory } from "../factories/CustomerFactory.js";
import {
  IGetCustomerParams,
  IPostCustomerBase,
  IPatchCustomerParams,
  GetCustomerParamsKeys,
  PostCustomerKeys,
} from "../interfaces/Customer/CustomerDTOs.js";
import { prisma } from "../lib/prisma.js";
import { Customer, CustomerKeys } from "../models/Customer.js";
import { logger } from "../utils/Logger.js";

export class CustomerRepository {
  private factory: CustomerFactory;

  constructor() {
    this.factory = new CustomerFactory();
  }

  async createCustomer(data: IPostCustomerBase): Promise<Customer> {
    // 1. Usamos a Factory para preparar o objeto (regras de PF/PJ)
    // Passamos '0' ou null no ID pois o SQLite gerará o autoincrement
    const customerData = this.factory.create(0, data);

    // 2. Removemos o ID temporário para o Prisma não tentar inserir manualmente
    const { [CustomerKeys.ID]: _, ...dataToSave } = customerData;

    return (await prisma.customer.create({
      data: dataToSave as any,
    })) as unknown as Customer;
  }

  async findAll(params: IGetCustomerParams): Promise<Customer[]> {
    const where: any = {};

    // 1. Mapeamento dos filtros
    Object.entries(params).forEach(([key, value]) => {
      // Só adiciona se o valor não for null, undefined ou string vazia
      if (value !== undefined && value !== null && value !== "") {
        if (key === PostCustomerKeys.NAME) {
          // Busca parcial (LIKE %valor%)
          where[key] = { contains: String(value) };
        } else {
          // Busca exata para o resto (ID, City, TaxId, etc)
          where[key] = value;
        }
      }
    });

    try {
      // 2. Executa a busca com o objeto 'where' montado
      // Atenção: Confirme se é .customer ou .customers (plural)
      const results = await prisma.customer.findMany({
        where: where,
      });

      return results as unknown as Customer[];
    } catch (error: any) {
      logger.error(`[REPOSITORY] Erro ao buscar no banco: ${error.message}`);
      throw error;
    }
  }

  async update(
    id: number,
    data: IPatchCustomerParams,
  ): Promise<Customer | null> {
    try {
      return (await prisma.customer.update({
        where: { [CustomerKeys.ID]: id },
        data: data as any,
      })) as unknown as Customer;
    } catch (error) {
      return null; // Se o ID não existir, o Prisma lança erro; capturamos e retornamos null
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.customer.delete({
        where: { [CustomerKeys.ID]: id },
      });
      return true;
    } catch {
      return false;
    }
  }

  async findById(id: number): Promise<Customer | null> {
    return (await prisma.customer.findUnique({
      where: { [CustomerKeys.ID]: id },
    })) as unknown as Customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return (await prisma.customer.findUnique({
      where: { [CustomerKeys.EMAIL]: email },
    })) as unknown as Customer;
  }

  async findByTaxId(taxId: string): Promise<Customer | null> {
    return (await prisma.customer.findUnique({
      where: { [CustomerKeys.TAX_ID]: taxId },
    })) as unknown as Customer;
  }
}
