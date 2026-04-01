import { IPaginationParams } from "../PaginationDTOs.js";

export enum TransactionTypeId {
  ENTRY = 1, 
  EXIT = 2, 
}

export enum TransactionKeys {
  ID = "id",
  TYPE = "type",
  CUSTOMER_ID = "customer_id",
  DESCRIPTION = "description",
  TOTAL_AMOUNT = "total_amount",
  CREATED_AT = "created_at",
  ITEMS = "items",
}

export enum TransactionItemKeys {
  PRODUCT_ID = "product_id",
  QUANTITY = "quantity",
  UNIT_PRICE = "unit_price",
  SUBTOTAL = "subtotal",
}

export interface ITransactionItemInput {
  [TransactionItemKeys.PRODUCT_ID]: number;
  [TransactionItemKeys.QUANTITY]: number;
  [TransactionItemKeys.UNIT_PRICE]: number;
}

export interface ICreateTransactionDTO {
  [TransactionKeys.TYPE]: TransactionTypeId;
  [TransactionKeys.CUSTOMER_ID]?: number;
  [TransactionKeys.DESCRIPTION]?: string;
  [TransactionKeys.ITEMS]: ITransactionItemInput[];
}

export interface IGetTransactionParams extends IPaginationParams {
  [TransactionKeys.TYPE]?: number;
  [TransactionKeys.CUSTOMER_ID]?: number;
}