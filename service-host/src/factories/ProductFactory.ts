import { Product } from "@prisma/client";
import {
  IPostProductBase,
  PostProductKeys,
  IPatchProductParams,
} from "../interfaces/Product/ProductDTOs.js";
import { IProductFactory } from "../interfaces/Product/ProductFactory.js";
import { ProductCategoryId, ProductLocationId } from "../models/Product.js";

export class ProductFactory implements IProductFactory {
  create(data: IPostProductBase): IPostProductBase {
  const product = { ...data };

  switch (data[PostProductKeys.CATEGORY]) {
    case ProductCategoryId.MEDICINE:
      product[PostProductKeys.MIN_QUANTITY] = data[PostProductKeys.MIN_QUANTITY] ?? 15;
      product[PostProductKeys.LOCATION] = data[PostProductKeys.LOCATION] ?? ProductLocationId.INTERNAL_PHARMACY;
      break;

    case ProductCategoryId.EQUIPMENT:
      product[PostProductKeys.EXPIRY_DATE] = undefined;
      product[PostProductKeys.LOCATION] = data[PostProductKeys.LOCATION] ?? ProductLocationId.CENTRAL_WAREHOUSE;
      break;

    case ProductCategoryId.SUPPLY:
      product[PostProductKeys.MIN_QUANTITY] = data[PostProductKeys.MIN_QUANTITY] ?? 50;
      break;

    case ProductCategoryId.CLEANING:
      product[PostProductKeys.UNIT_WEIGHT] = data[PostProductKeys.UNIT_WEIGHT] ?? 1.0; // Padrão 1kg/1L
      break;

    default:
      product[PostProductKeys.MIN_QUANTITY] = data[PostProductKeys.MIN_QUANTITY] ?? 5;
      break;
  }

  return product;
}

  buildUpdate(data: IPatchProductParams): IPatchProductParams {
    const updateData = { ...data };
    if ("product_sap_code" in updateData) {
      delete (updateData as any)["product_sap_code"];
    }

    if ("product_lot" in updateData) {
      delete (updateData as any)["product_lot"];
    }

    return updateData;
  }

  buildResponse(data: any): Product {
    return data as Product;
  }
}
