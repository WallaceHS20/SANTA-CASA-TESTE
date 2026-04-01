import { PrismaClient, Prisma, Transaction } from "@prisma/client";
import { IPaginatedResponse } from "../interfaces/PaginationDTOs.js";
import {
  IGetTransactionParams,
  TransactionKeys,
} from "../interfaces/Transactions/TransactionDTOs.js";
import { prisma } from "../lib/prisma.js";

type PrismaTransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export class TransactionRepository {
  async createTransaction(
    data: Prisma.TransactionCreateInput,
    tx: PrismaTransactionClient,
  ): Promise<Transaction> {
    return await tx.transaction.create({
      data,
    });
  }

  async createTransactionItem(
    data: Prisma.TransactionItemCreateInput,
    tx: PrismaTransactionClient,
  ): Promise<void> {
    await tx.transactionItem.create({
      data,
    });
  }

  async findAll(
    params: IGetTransactionParams,
  ): Promise<IPaginatedResponse<Transaction>> {
    const where: any = {};

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const skip = (page - 1) * limit;

    if (params[TransactionKeys.TYPE]) {
      where[TransactionKeys.TYPE] = Number(params[TransactionKeys.TYPE]);
    }
    if (params[TransactionKeys.CUSTOMER_ID]) {
      where[TransactionKeys.CUSTOMER_ID] = Number(
        params[TransactionKeys.CUSTOMER_ID],
      );
    }

    const [data, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [TransactionKeys.CREATED_AT]: "desc" }, // Mais recentes primeiro
        include: {
          items: {
          include: {
            product: {
              select: {
                product_name: true, 
              }
            }
          }
        },
          customer: {
            select: { customer_name: true },
          },
        },
      }),
      prisma.transaction.count({ where }),
    ]);

    return {
      data: data as unknown as Transaction[],
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number): Promise<Transaction | null> {
    return await prisma.transaction.findUnique({
      where: { id },
      include: {
        items: true,
        customer: true,
      },
    });
  }
}
