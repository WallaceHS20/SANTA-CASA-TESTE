import { Customer } from "../../models/Customer.js";
import {
  IPostIndividualCustomer,
  IPostCorporateCustomer,
  IPostCustomerBase,
} from "./CustomerDTOs.js";

export interface ICustomerFactory {
  create(id: number, data: IPostCustomerBase): Customer;
  createIndividual(id: number, data: IPostIndividualCustomer): Customer;
  createCorporate(id: number, data: IPostCorporateCustomer): Customer;
}
