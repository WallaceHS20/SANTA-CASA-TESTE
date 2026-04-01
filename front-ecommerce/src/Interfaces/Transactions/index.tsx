import type { IPaginationParams } from "@/Interfaces/Common";

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

export enum TransactionResponseKeys {
  ID = "id",
  TYPE = "type",
  DESCRIPTION = "description",
  TOTAL_AMOUNT = "total_amount",
  CREATED_AT = "created_at",
  CUSTOMER_ID = "customer_id",
  ITEMS = "items",
  CUSTOMER = "customer",
}

export enum TransactionItemResponseKeys {
  ID = "id",
  TRANSACTION_ID = "transaction_id",
  PRODUCT_ID = "product_id",
  QUANTITY = "quantity",
  UNIT_PRICE = "unit_price",
  SUBTOTAL = "subtotal",
}

export enum CustomerResponseKeys {
  CUSTOMER_NAME = "customer_name",
  NAME = "NAME",
}

export interface ICustomerResponse {
  [CustomerResponseKeys.CUSTOMER_NAME]: string;
}

export interface ITransactionItemResponse {
  [TransactionItemResponseKeys.ID]: number;
  [TransactionItemResponseKeys.TRANSACTION_ID]: number;
  [TransactionItemResponseKeys.PRODUCT_ID]: number;
  [TransactionItemResponseKeys.QUANTITY]: number;
  [TransactionItemResponseKeys.UNIT_PRICE]: string;
  [TransactionItemResponseKeys.SUBTOTAL]: string;
}

export interface IGetTransactionResponse {
  [TransactionResponseKeys.ID]: number;
  [TransactionResponseKeys.TYPE]: number;
  [TransactionResponseKeys.DESCRIPTION]: string;
  [TransactionResponseKeys.TOTAL_AMOUNT]: string;
  [TransactionResponseKeys.CREATED_AT]: string;
  [TransactionResponseKeys.CUSTOMER_ID]: number;
  [TransactionResponseKeys.ITEMS]: ITransactionItemResponse[];
  [TransactionResponseKeys.CUSTOMER]?: ICustomerResponse;
}
