import type { IPaginationParams } from "../Common";

export enum PostCustomerKeys {
  NAME = "customer_name",
  EMAIL = "customer_email",
  TAX_ID = "customer_tax_id",
  CITY = "customer_city",
  STATE = "customer_state",
  STATE_REGISTRATION = "customer_state_registration",
  MUNICIPAL_REGISTRATION = "customer_municipal_registration",
}

export interface IPostCustomerBase {
  [PostCustomerKeys.NAME]: string;
  [PostCustomerKeys.EMAIL]: string;
  [PostCustomerKeys.TAX_ID]: string;
  [PostCustomerKeys.CITY]: string;
  [PostCustomerKeys.STATE]: string;
}

export interface IPostIndividualCustomer extends IPostCustomerBase {}

export interface IPostCorporateCustomer extends IPostCustomerBase {
  [PostCustomerKeys.STATE_REGISTRATION]: string;
  [PostCustomerKeys.MUNICIPAL_REGISTRATION]?: string;
}

export enum GetCustomerParamsKeys {
  ID = "customer_id",
  NAME = "customer_name",
  EMAIL = "customer_email",
  TAX_ID = "customer_tax_id",
  REGISTRATION_DATE = "customer_registration_date",
  CITY = "customer_city",
  STATE = "customer_state",
  STATE_REGISTRATION = "customer_state_registration",
  MUNICIPAL_REGISTRATION = "customer_municipal_registration",
}

export interface IGetCustomerParams extends IPaginationParams{
  [GetCustomerParamsKeys.ID]?: string;
  [GetCustomerParamsKeys.NAME]?: string;
  [GetCustomerParamsKeys.EMAIL]?: string;
  [GetCustomerParamsKeys.TAX_ID]?: string;
  [GetCustomerParamsKeys.REGISTRATION_DATE]?: string;
  [GetCustomerParamsKeys.CITY]?: string;
  [GetCustomerParamsKeys.STATE]?: string;
  [GetCustomerParamsKeys.STATE_REGISTRATION]?: string;
  [GetCustomerParamsKeys.MUNICIPAL_REGISTRATION]?: string;
}

export enum PatchCustomerKeys {
  NAME = "customer_name",
  EMAIL = "customer_email",
  CITY = "customer_city",
  STATE = "customer_state",
  STATE_REGISTRATION = "customer_state_registration",
  MUNICIPAL_REGISTRATION = "customer_municipal_registration",
}

export interface IPatchCustomerParams {
  [PatchCustomerKeys.NAME]?: string;
  [PatchCustomerKeys.EMAIL]?: string;
  [PatchCustomerKeys.CITY]?: string;
  [PatchCustomerKeys.STATE]?: string;
  [PatchCustomerKeys.STATE_REGISTRATION]?: string;
  [PatchCustomerKeys.MUNICIPAL_REGISTRATION]?: string;
}

export enum CustomerResponseKeys {
  ID = "customer_id",
  NAME = "customer_name",
  EMAIL = "customer_email",
  TAX_ID = "customer_tax_id",
  REGISTRATION_DATE = "customer_registration_date",
  CITY = "customer_city",
  STATE = "customer_state",
  STATE_REGISTRATION = "customer_state_registration",
  MUNICIPAL_REGISTRATION = "customer_municipal_registration",
}

export interface IGetCustomerResponse {
  [CustomerResponseKeys.ID]: number;
  [CustomerResponseKeys.NAME]: string;
  [CustomerResponseKeys.EMAIL]: string;
  [CustomerResponseKeys.TAX_ID]: string;
  [CustomerResponseKeys.REGISTRATION_DATE]: string;
  [CustomerResponseKeys.CITY]: string;
  [CustomerResponseKeys.STATE]: string;
  [CustomerResponseKeys.STATE_REGISTRATION]: string | null;
  [CustomerResponseKeys.MUNICIPAL_REGISTRATION]: string | null;
}