import { ServiceApi } from "../../api";
import { BaseService } from "../BaseService";
import type {
  IGetProductParams,
  IPostProductBase,
  IPatchProductParams,
  IGetProductResponse,
} from "../../Interfaces/Products";
import type { IPaginatedResponse } from "../../Interfaces/Common";

export class ProductService extends BaseService {
  static {
    this.setPrefix("/products");
  }

  public static getProducts = async (params: IGetProductParams) => {
    try {
      const response = await ServiceApi.get<
        IPaginatedResponse<IGetProductResponse>
      >(this.endpoint("/"), { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static createProduct = async (data: IPostProductBase) => {
    try {
      const response = await ServiceApi.post<IPostProductBase>(
        this.endpoint("/"),
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static updateProduct = async (
    id: string | number,
    data: IPatchProductParams,
  ) => {
    try {
      // Enviamos para /products/:id
      const response = await ServiceApi.patch<IPostProductBase>(
        this.endpoint(`/${id}`),
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static deleteProduct = async (id: string | number) => {
    try {
      await ServiceApi.delete(this.endpoint(`/${id}`));
    } catch (error) {
      throw error;
    }
  };
}
