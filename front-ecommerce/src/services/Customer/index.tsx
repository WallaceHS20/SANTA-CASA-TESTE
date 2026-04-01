import { ServiceApi } from "../../api";
import { BaseService } from "../BaseService";
import type { IPaginatedResponse } from "../../Interfaces/Common";
import type { IGetCustomerParams, IGetCustomerResponse, IPostCustomerBase, IPatchCustomerParams } from "@/Interfaces/Customer";

export class CustomerService extends BaseService {
  static {
    this.setPrefix("/customers");
  }

  public static getCustomers = async (params: IGetCustomerParams) => {
    try {
      const response = await ServiceApi.get<
        IPaginatedResponse<IGetCustomerResponse>
      >(this.endpoint("/"), { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static createCustomer = async (data: IPostCustomerBase) => {
    try {
      const response = await ServiceApi.post<IGetCustomerResponse>(
        this.endpoint("/"),
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static updateCustomer = async (
    id: string | number,
    data: IPatchCustomerParams,
  ) => {
    try {
      const response = await ServiceApi.patch<IGetCustomerResponse>(
        this.endpoint(`/${id}`),
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static deleteCustomer = async (id: string | number) => {
    try {
      await ServiceApi.delete(this.endpoint(`/${id}`));
    } catch (error) {
      throw error;
    }
  };
}