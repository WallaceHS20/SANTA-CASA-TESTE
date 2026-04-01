import { useState, useEffect } from "react";
import { TransactionService } from "@/services/Transactions";
import { useError } from "@/utils/ErrorHandler";
import {
  TransactionKeys,
  type IGetTransactionResponse,
} from "@/Interfaces/Transactions";
import type { IPaginatedResponse } from "@/Interfaces/Common";
import { useAuthContext } from "@/contexts/Auth";
import { UserKeys, UserRole } from "@/Interfaces/Auth";

export const useTransactions = () => {
  const { handleError } = useError();
  const { user } = useAuthContext();

  const [data, setData] =
    useState<IPaginatedResponse<IGetTransactionResponse>>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedTransaction, setSelectedTransaction] =
    useState<IGetTransactionResponse | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const userId =
      user?.[UserKeys.ROLE] === UserRole.CUSTOMER
        ? user[UserKeys.ID]
        : undefined;
    const loadTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await TransactionService.getTransactions({
          page,
          limit,
          [TransactionKeys.CUSTOMER_ID]: userId,
        });
        if (isMounted) {
          setData(response);
        }
      } catch (error) {
        if (isMounted) {
          handleError("Erro ao buscar transações", error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTransactions();

    return () => {
      isMounted = false;
    };
  }, [page, limit]);

  const onPageChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  const openDetails = (transaction: IGetTransactionResponse) => {
    setSelectedTransaction(transaction);
    setIsDetailOpen(true);
  };

  const closeDetails = () => {
    setIsDetailOpen(false);
    setSelectedTransaction(null);
  };

  return {
    data,
    form: { page, limit },
    onPageChange,
    isLoading,
    openDetails,
    closeDetails,
    selectedTransaction,
    isDetailOpen,
  };
};
