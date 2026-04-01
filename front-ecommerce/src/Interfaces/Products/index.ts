import type { IPaginationParams } from "../Common";

export enum ProductCategoryId {
  MEDICINE = 1,
  SUPPLY = 2,
  EQUIPMENT = 3,
  CLEANING = 4,
}

export enum ProductLocationId {
  CENTRAL_WAREHOUSE = 1,
  AISLE_A_SHELF_1 = 2,
  AISLE_B_DRAWER_5 = 3,
  INTERNAL_PHARMACY = 4,
}

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

export enum IGetProductKeys {
  ID = "product_id",
  SAP_CODE = "product_sap_code",
  NAME = "product_name",
  LOT = "product_lot",
  QUANTITY = "product_quantity",
  MIN_QUANTITY = "product_min_quantity",
  UNIT_VAL = "product_unit_val",
  TOTAL_VAL = "product_total_val",
  UNIT_WEIGHT = "product_unit_weight",
  CATEGORY = "product_category",
  LOCATION = "product_location",
  ENTRY_DATE = "product_entry_date",
  EXPIRY_DATE = "product_expiry_date",
  ACTIVE = "product_active",
}

export interface IGetProductResponse {
  [IGetProductKeys.ID]: number;
  [IGetProductKeys.SAP_CODE]: string;
  [IGetProductKeys.NAME]: string;
  [IGetProductKeys.LOT]: string;
  [IGetProductKeys.QUANTITY]: number;
  [IGetProductKeys.MIN_QUANTITY]: number;
  [IGetProductKeys.UNIT_VAL]: any;
  [IGetProductKeys.TOTAL_VAL]: any;
  [IGetProductKeys.CATEGORY]: ProductCategoryId;
  [IGetProductKeys.ENTRY_DATE]: Date | null;
  [IGetProductKeys.ACTIVE]: boolean;
  [IGetProductKeys.UNIT_WEIGHT]?: number | null; 
  [IGetProductKeys.LOCATION]?: number | null;
  [IGetProductKeys.EXPIRY_DATE]?: Date | null;
}
