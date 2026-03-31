import {
  IPostIndividualCustomer,
  PostCustomerKeys,
  IPostCorporateCustomer,
  IPostCustomerBase,
} from "../interfaces/Customer/CustomerDTOs.js";
import { ICustomerFactory } from "../interfaces/Customer/CustomerFactory.js";
import { Customer, CustomerKeys } from "../models/Customer.js";
import { Masks } from "../utils/Masks.js";
import { Validations } from "../utils/Validate.js";

export class CustomerFactory implements ICustomerFactory {
  create(id: number, data: IPostCustomerBase): Customer {
    if (Validations.isCpf(data[PostCustomerKeys.TAX_ID])) {
      return this.createIndividual(id, data as IPostIndividualCustomer);
    } else {
      return this.createCorporate(id, data as IPostCorporateCustomer);
    }
  }

  createIndividual(id: number, data: IPostIndividualCustomer): Customer {
    return {
      [CustomerKeys.ID]: id,
      [CustomerKeys.REGISTRATION_DATE]: new Date().toISOString(),
      [CustomerKeys.NAME]: data[PostCustomerKeys.NAME].trim(),
      [CustomerKeys.EMAIL]: data[PostCustomerKeys.EMAIL],
      [CustomerKeys.TAX_ID]: Masks.removeSpecialChars(
        data[PostCustomerKeys.TAX_ID],
      ),
      [CustomerKeys.CITY]: data[PostCustomerKeys.CITY].trim(),
      [CustomerKeys.STATE]: data[PostCustomerKeys.STATE],
      [CustomerKeys.STATE_REGISTRATION]: null,
      [CustomerKeys.MUNICIPAL_REGISTRATION]: null,
    };
  }

  createCorporate(id: number, data: IPostCorporateCustomer): Customer {
    return {
      [CustomerKeys.ID]: id,
      [CustomerKeys.REGISTRATION_DATE]: new Date().toISOString(),
      [CustomerKeys.NAME]: data[PostCustomerKeys.NAME].trim(),
      [CustomerKeys.EMAIL]: data[PostCustomerKeys.EMAIL],
      [CustomerKeys.TAX_ID]: Masks.removeSpecialChars(
        data[PostCustomerKeys.TAX_ID],
      ),
      [CustomerKeys.CITY]: data[PostCustomerKeys.CITY].trim(),
      [CustomerKeys.STATE]: data[PostCustomerKeys.STATE],
      [CustomerKeys.STATE_REGISTRATION]:
        data[PostCustomerKeys.STATE_REGISTRATION],
      [CustomerKeys.MUNICIPAL_REGISTRATION]:
        data[PostCustomerKeys.MUNICIPAL_REGISTRATION] || null,
    };
  }
}
