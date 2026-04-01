import { ProductCategoryId, ProductLocationId } from "../../models/Product.js";
import { IPaginationParams } from "../PaginationDTOs.js";

export enum PostProductKeys {
  SAP_CODE = "product_sap_code",
  NAME = "product_name",
  LOT = "product_lot",
  QUANTITY = "product_quantity",
  MIN_QUANTITY = "product_min_quantity",
  UNIT_VAL = "product_unit_val",
  UNIT_WEIGHT = "product_unit_weight",
  CATEGORY = "product_category",
  LOCATION = "product_location",
  EXPIRY_DATE = "product_expiry_date",
}

export interface IPostProductBase {
  [PostProductKeys.SAP_CODE]: string;
  [PostProductKeys.NAME]: string;
  [PostProductKeys.LOT]: string;
  [PostProductKeys.QUANTITY]: number;
  [PostProductKeys.MIN_QUANTITY]?: number;
  [PostProductKeys.UNIT_VAL]: number;
  [PostProductKeys.UNIT_WEIGHT]?: number | null;
  [PostProductKeys.CATEGORY]: ProductCategoryId;
  [PostProductKeys.LOCATION]?: ProductLocationId;
  [PostProductKeys.EXPIRY_DATE]?: string | Date;
}

export enum PatchProductKeys {
  NAME = "product_name",
  QUANTITY = "product_quantity",
  MIN_QUANTITY = "product_min_quantity",
  UNIT_VAL = "product_unit_val",
  LOCATION = "product_location",
  ACTIVE = "product_active",
}

export interface IPatchProductParams {
  [PatchProductKeys.NAME]?: string;
  [PatchProductKeys.QUANTITY]?: number;
  [PatchProductKeys.MIN_QUANTITY]?: number;
  [PatchProductKeys.UNIT_VAL]?: number;
  [PatchProductKeys.LOCATION]?: ProductLocationId;
  [PatchProductKeys.ACTIVE]?: boolean;
}

export enum GetProductParamsKeys {
  NAME = "product_name",
  SAP_CODE = "product_sap_code",
  CATEGORY = "product_category",
  LOCATION = "product_location",
  LOT = "product_lot",
}

export interface IGetProductParams extends IPaginationParams{
  [GetProductParamsKeys.NAME]?: string;
  [GetProductParamsKeys.SAP_CODE]?: string;
  [GetProductParamsKeys.CATEGORY]?: ProductCategoryId;
  [GetProductParamsKeys.LOCATION]?: ProductLocationId;
  [GetProductParamsKeys.LOT]?: string;
}
