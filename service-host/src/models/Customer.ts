export enum CustomerKeys {
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

export interface Customer {
  [CustomerKeys.ID]: number;
  [CustomerKeys.NAME]: string;
  [CustomerKeys.EMAIL]: string;
  [CustomerKeys.TAX_ID]: string | null;
  [CustomerKeys.REGISTRATION_DATE]: string;
  [CustomerKeys.CITY]: string;
  [CustomerKeys.STATE]: string;
  [CustomerKeys.STATE_REGISTRATION]: string | null;
  [CustomerKeys.MUNICIPAL_REGISTRATION]: string | null;
}
