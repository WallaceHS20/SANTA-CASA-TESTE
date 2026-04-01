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

export enum ProductKeys {
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

export interface Product {
  [ProductKeys.ID]: number;
  [ProductKeys.SAP_CODE]: string;
  [ProductKeys.NAME]: string;
  [ProductKeys.LOT]: string;
  [ProductKeys.QUANTITY]: number;
  [ProductKeys.MIN_QUANTITY]: number;
  [ProductKeys.UNIT_VAL]: any;
  [ProductKeys.TOTAL_VAL]: any;
  [ProductKeys.CATEGORY]: ProductCategoryId;
  [ProductKeys.ENTRY_DATE]: Date | null;
  [ProductKeys.ACTIVE]: boolean;
  [ProductKeys.UNIT_WEIGHT]?: number | null; 
  [ProductKeys.LOCATION]?: number | null;
  [ProductKeys.EXPIRY_DATE]?: Date | null;
}
