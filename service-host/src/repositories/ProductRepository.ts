import { IPaginatedResponse } from "../interfaces/PaginationDTOs.js";
import {
  IPostProductBase,
  PostProductKeys,
  IGetProductParams,
  GetProductParamsKeys,
  IPatchProductParams,
  PatchProductKeys,
} from "../interfaces/Product/ProductDTOs.js";
import { prisma } from "../lib/prisma.js";
import { Product, ProductKeys } from "../models/Product.js";

export class ProductRepository {
  async createProduct(data: IPostProductBase): Promise<Product> {
    const totalValue =
      data[PostProductKeys.QUANTITY] * data[PostProductKeys.UNIT_VAL];

    const expiryDate = data[PostProductKeys.EXPIRY_DATE]
      ? new Date(data[PostProductKeys.EXPIRY_DATE])
      : null;

    const createData: any = {
      ...data,
      [ProductKeys.TOTAL_VAL]: totalValue,
      [ProductKeys.EXPIRY_DATE]: expiryDate,
    };

    return (await prisma.product.create({
      data: createData,
    })) as unknown as Product;
  }

  async findAll(
    params: IGetProductParams,
  ): Promise<IPaginatedResponse<Product>> {
    const where: any = {};

    // 1. Configurando a Paginação (Padrão: Página 1, 10 itens por página)
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const skip = (page - 1) * limit; // Fórmula clássica de paginação

    // 2. Montando os Filtros (ignorando page e limit do loop)
    Object.entries(params).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        key !== "page" &&
        key !== "limit"
      ) {
        if (typeof value === "string" && key === GetProductParamsKeys.NAME) {
          where[key] = { contains: value };
        } else if (
          key === GetProductParamsKeys.CATEGORY ||
          key === "product_location"
        ) {
          where[key] = Number(value);
        } else {
          where[key] = value;
        }
      }
    });

    // 3. 🚀 ALTA PERFORMANCE: Buscando dados e contando o total em paralelo!
    const [data, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip, // Pula os itens das páginas anteriores
        take: limit, // Pega apenas a quantidade limite
        orderBy: { [ProductKeys.NAME]: "asc" },
      }),
      prisma.product.count({ where }), // Conta quantos itens no total atendem a esse filtro
    ]);

    // 4. Retornando o formato blindado
    return {
      data: data as unknown as Product[],
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number): Promise<Product | null> {
    return (await prisma.product.findUnique({
      where: { [ProductKeys.ID]: id },
    })) as unknown as Product | null;
  }

  async findBySapCode(sapCode: string): Promise<Product | null> {
    return (await prisma.product.findUnique({
      where: { [ProductKeys.SAP_CODE]: sapCode },
    })) as unknown as Product | null;
  }

  async update(id: number, data: IPatchProductParams): Promise<Product> {
    const currentProduct = await this.findById(id);

    let totalValue: number | undefined = undefined;

    if (currentProduct) {
      const newQty =
        data[PatchProductKeys.QUANTITY] ?? currentProduct[ProductKeys.QUANTITY];
      const newUnitVal =
        data[PatchProductKeys.UNIT_VAL] ?? currentProduct[ProductKeys.UNIT_VAL];

      totalValue = Number(newQty) * Number(newUnitVal);
    }

    const updateData: any = {
      ...data,
    };

    if (totalValue !== undefined) {
      updateData[ProductKeys.TOTAL_VAL] = totalValue;
    }

    return (await prisma.product.update({
      where: { [ProductKeys.ID]: id },
      data: updateData, // Passamos o objeto mapeado
    })) as unknown as Product;
  }

  async delete(id: number): Promise<void> {
    await prisma.product.delete({
      where: { [ProductKeys.ID]: id },
    });
  }
}
