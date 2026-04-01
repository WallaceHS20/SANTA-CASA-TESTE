import type { UserRole } from "../Auth";

export enum BaseRouteKey {
  PATH = "path",
  TITLE = "title",
  ROLE = "role",
  ICON = "icon" // Adicionei ícone, pois o PrimeReact ama eles!
}

export interface IRouteDefinition {
  [BaseRouteKey.PATH]: string;
  [BaseRouteKey.TITLE]: string;
  [BaseRouteKey.ROLE]: UserRole[];
  [BaseRouteKey.ICON]?: string;
}

export enum SectionKeys {
  MANAGEMENT = "management",
  TRANSACTIONS = "transactions",
  AUTH = "auth"
}

export enum PageRoutesKeys {
  LOGIN = "/login",
  DASHBOARD = "/dashboard",
  PRODUCT_LIST = "/products",
  PRODUCT_DETAILS = "/products/:id", 
  TRANSACTION_LIST = "/transactions",
  TRANSACTION_DETAILS = "/transactions/:id",
  CUSTOMER_LIST = "/customers",
  CUSTOMER_DETAILS = "/customers/:id",
}