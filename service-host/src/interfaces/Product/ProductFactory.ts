import { Product } from "@prisma/client";
import { IPostProductBase, IPatchProductParams } from "./ProductDTOs.js";

export interface IProductFactory {
  create(data: IPostProductBase): IPostProductBase;

  buildUpdate(data: IPatchProductParams): IPatchProductParams;

  buildResponse(data: any): Product;
}
