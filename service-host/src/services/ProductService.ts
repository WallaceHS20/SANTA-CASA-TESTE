import { Product } from "@prisma/client";
import {
  IPostProductBase,
  PostProductKeys,
  IGetProductParams,
  IPatchProductParams,
  PatchProductKeys,
} from "../interfaces/Product/ProductDTOs.js";
import { ProductRepository } from "../repositories/ProductRepository.js";
import { logger } from "../utils/Logger.js";
import { ProductFactory } from "../factories/ProductFactory.js";
import { IPaginatedResponse } from "../interfaces/PaginationDTOs.js";

export class ProductService {
  private repository: ProductRepository;
  private factory: ProductFactory;

  constructor() {
    this.repository = new ProductRepository();
    this.factory = new ProductFactory();
  }

  async createProduct(data: IPostProductBase): Promise<Product> {
    const preparedData = this.factory.create(data);

    const sapCode = preparedData[PostProductKeys.SAP_CODE];
    const existingProduct = await this.repository.findBySapCode(sapCode);

    if (existingProduct) {
      logger.warn(`[SERVICE] SAP Code duplicado bloqueado: ${sapCode}`);
      throw new Error(`O Código SAP ${sapCode} já está cadastrado.`);
    }

    if (preparedData[PostProductKeys.QUANTITY] < 0) {
      throw new Error("A quantidade inicial não pode ser negativa.");
    }

    if (preparedData[PostProductKeys.EXPIRY_DATE]) {
      const expiry = new Date(preparedData[PostProductKeys.EXPIRY_DATE]);
      if (expiry < new Date()) {
        logger.warn(
          `[SERVICE] Bloqueio de produto vencido: ${preparedData[PostProductKeys.NAME]}`,
        );
        throw new Error("Validade retroativa não permitida.");
      }
    }

    const result = await this.repository.createProduct(preparedData);
    return this.factory.buildResponse(result);
  }

  async listAll(filters: IGetProductParams): Promise<IPaginatedResponse<any>> {
    const results = await this.repository.findAll(filters);
    const formattedData = results.data.map((product: any) =>
      this.factory.buildResponse(product),
    );

    return {
      data: formattedData,
      meta: results.meta,
    };
  }

  async getById(id: number): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product) throw new Error("Produto não encontrado.");

    return this.factory.buildResponse(product);
  }

  async update(id: number, data: IPatchProductParams): Promise<Product> {
    await this.getById(id);

    const preparedUpdate = this.factory.buildUpdate(data);

    if (
      preparedUpdate[PatchProductKeys.QUANTITY] !== undefined &&
      preparedUpdate[PatchProductKeys.QUANTITY] < 0
    ) {
      throw new Error("Estoque não pode ficar negativo.");
    }

    const result = await this.repository.update(id, preparedUpdate);
    return this.factory.buildResponse(result);
  }

  async delete(id: number): Promise<void> {
    await this.getById(id);
    await this.repository.delete(id);
    logger.info(`[SERVICE] Produto ID ${id} removido do sistema.`);
  }
}
