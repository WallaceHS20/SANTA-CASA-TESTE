import { CustomerFactory } from "../factories/CustomerFactory.js";
import {
  IGetCustomerParams,
  IPostCustomerBase,
  IPatchCustomerParams,
  PostCustomerKeys,
} from "../interfaces/Customer/CustomerDTOs.js";
import { IPaginatedResponse } from "../interfaces/PaginationDTOs.js";
import { prisma } from "../lib/prisma.js";
import { Customer, CustomerKeys } from "../models/Customer.js";
import { logger } from "../utils/Logger.js";

export class CustomerRepository {
  private factory: CustomerFactory;

  constructor() {
    this.factory = new CustomerFactory();
  }

  async createCustomer(data: IPostCustomerBase): Promise<Customer> {
    const customerData = this.factory.create(0, data);
    const { [CustomerKeys.ID]: _, ...dataToSave } = customerData;

    return (await prisma.customer.create({
      data: dataToSave as any,
    })) as unknown as Customer;
  }

  async findAll(
    params: IGetCustomerParams,
  ): Promise<IPaginatedResponse<Customer>> {
    const where: any = {};

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const skip = (page - 1) * limit;

    Object.entries(params).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        key !== "page" &&
        key !== "limit"
      ) {
        if (key === PostCustomerKeys.NAME) {
          where[key] = { contains: String(value) };
        } else {
          where[key] = value;
        }
      }
    });

    try {
      const [data, total] = await prisma.$transaction([
        prisma.customer.findMany({
          where: where,
          skip: skip,
          take: limit,
        }),
        prisma.customer.count({ where: where }),
      ]);

      return {
        data: data as unknown as Customer[],
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
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
      return null;
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
