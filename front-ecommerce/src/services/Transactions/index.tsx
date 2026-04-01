import { ServiceApi } from "../../api";
import { BaseService } from "../BaseService";
import type { 
  ICreateTransactionDTO, 
  IGetTransactionParams, 
  IGetTransactionResponse
} from "../../Interfaces/Transactions";
import type { IPaginatedResponse } from "../../Interfaces/Common";

export class TransactionService extends BaseService {
  static {
    this.setPrefix("/transactions");
  }

  public static getTransactions = async (params: IGetTransactionParams) => {
    try {
      const response = await ServiceApi.get<
        IPaginatedResponse<IGetTransactionResponse>
      >(this.endpoint("/"), { params });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static createTransaction = async (data: ICreateTransactionDTO) => {
    try {
      const response = await ServiceApi.post<ICreateTransactionDTO>(
        this.endpoint("/"),
        data
      );
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}