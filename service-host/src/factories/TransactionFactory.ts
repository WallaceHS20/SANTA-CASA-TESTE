import { TransactionTypeId } from "../interfaces/Transactions/TransactionDTOs.js";
import { ITransactionStrategy, ITransactionFactory } from "../interfaces/Transactions/TransactionFactory.js";


export class EntryTransactionStrategy implements ITransactionStrategy {
  validateStock(productName: string, currentQuantity: number, requestedQuantity: number): void {
  }

  getQuantityChange(quantity: number): number {
    return quantity; // Positivo (Soma)
  }
}

export class ExitTransactionStrategy implements ITransactionStrategy {
  validateStock(productName: string, currentQuantity: number, requestedQuantity: number): void {
    if (currentQuantity < requestedQuantity) {
      throw new Error(`Estoque insuficiente para o produto: ${productName}. Disponível: ${currentQuantity}, Solicitado: ${requestedQuantity}`);
    }
  }

  getQuantityChange(quantity: number): number {
    return -quantity; 
  }
}

export class TransactionFactory implements ITransactionFactory {
  getStrategy(type: TransactionTypeId): ITransactionStrategy {
    switch (type) {
      case TransactionTypeId.ENTRY:
        return new EntryTransactionStrategy();
        
      case TransactionTypeId.EXIT:
        return new ExitTransactionStrategy();
        
      default:
        throw new Error(`Tipo de transação inválido: ${type}`);
    }
  }
}