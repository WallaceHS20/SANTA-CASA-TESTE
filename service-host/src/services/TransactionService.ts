import { PrismaClient, Transaction } from "@prisma/client";
import {
  ICreateTransactionDTO,
  TransactionKeys,
  TransactionItemKeys,
  IGetTransactionParams,
} from "../interfaces/Transactions/TransactionDTOs.js";
import { ProductKeys } from "../models/Product.js";
import { TransactionFactory } from "../factories/TransactionFactory.js";
import { TransactionRepository } from "../repositories/TransactionRepository.js";
import { IPaginatedResponse } from "../interfaces/PaginationDTOs.js";
import { prisma } from "../lib/prisma.js";

export class TransactionService {
  private factory: TransactionFactory;
  private repository: TransactionRepository;

  constructor() {
    this.factory = new TransactionFactory();
    this.repository = new TransactionRepository();
  }

  async create(data: ICreateTransactionDTO) {
    return await prisma.$transaction(async (tx) => {
      let totalAmount = 0;

      const items = data[TransactionKeys.ITEMS];
      const transactionType = data[TransactionKeys.TYPE];

      const strategy = this.factory.getStrategy(transactionType);

      for (const item of items) {
        const productId = item[TransactionItemKeys.PRODUCT_ID];
        const quantity = item[TransactionItemKeys.QUANTITY];
        const unitPrice = item[TransactionItemKeys.UNIT_PRICE];

        const product = await tx.product.findUnique({
          where: { [ProductKeys.ID]: productId },
        });

        if (!product)
          throw new Error(`Produto ID ${productId} não encontrado.`);

        strategy.validateStock(
          String(product[ProductKeys.NAME]),
          Number(product[ProductKeys.QUANTITY]),
          quantity,
        );

        totalAmount += quantity * unitPrice;
      }

      const transaction = await tx.transaction.create({
        data: {
          [TransactionKeys.TYPE]: transactionType,
          [TransactionKeys.DESCRIPTION]: data[TransactionKeys.DESCRIPTION],
          [TransactionKeys.CUSTOMER_ID]: data[TransactionKeys.CUSTOMER_ID],
          [TransactionKeys.TOTAL_AMOUNT]: totalAmount,
        },
      });

      for (const item of items) {
        const productId = item[TransactionItemKeys.PRODUCT_ID];
        const quantity = item[TransactionItemKeys.QUANTITY];
        const unitPrice = item[TransactionItemKeys.UNIT_PRICE];
        const subtotal = quantity * unitPrice;

        await tx.transactionItem.create({
          data: {
            transaction_id: transaction.id,
            [TransactionItemKeys.PRODUCT_ID]: productId,
            [TransactionItemKeys.QUANTITY]: quantity,
            [TransactionItemKeys.UNIT_PRICE]: unitPrice,
            [TransactionItemKeys.SUBTOTAL]: subtotal,
          },
        });

        const quantityChange = strategy.getQuantityChange(quantity);
        const totalValueChange = quantityChange * Number(unitPrice);

        await tx.product.update({
          where: { [ProductKeys.ID]: productId },
          data: {
            [ProductKeys.QUANTITY]: { increment: quantityChange },
            [ProductKeys.TOTAL_VAL]: { increment: totalValueChange },
          },
        });
      }

      return transaction;
    });
  }

  async listAll(
    params: IGetTransactionParams,
  ): Promise<IPaginatedResponse<Transaction>> {
    return await this.repository.findAll(params);
  }
}
