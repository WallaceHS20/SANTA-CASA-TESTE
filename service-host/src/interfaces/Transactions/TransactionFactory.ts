import { TransactionTypeId } from "./TransactionDTOs.js";

export interface ITransactionStrategy {
  validateStock(
    productName: string,
    currentQuantity: number,
    requestedQuantity: number,
  ): void;
  getQuantityChange(quantity: number): number;
}

export interface ITransactionFactory {
  getStrategy(type: TransactionTypeId): ITransactionStrategy;
}
