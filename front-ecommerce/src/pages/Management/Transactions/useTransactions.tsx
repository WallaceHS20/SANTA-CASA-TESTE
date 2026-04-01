import { useState, useEffect } from "react";
import { TransactionService } from "@/services/Transactions";
import { useError } from "@/utils/ErrorHandler";
import type { IGetTransactionResponse } from "@/Interfaces/Transactions";
import type { IPaginatedResponse } from "@/Interfaces/Common";

export const useTransactions = () => {
  const { handleError } = useError();
  
  const [data, setData] = useState<IPaginatedResponse<IGetTransactionResponse>>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // 🎯 Estado local para gerenciar APENAS a tabela, sem travar a tela
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await TransactionService.getTransactions({ 
          page, 
          limit 
        });
        setData(response);
      } catch (error) {
        handleError("Erro ao buscar transações", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [page, limit]);

  const onPageChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  return { data, page, limit, onPageChange, isLoading }; 
};