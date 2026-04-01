import { useState, useEffect, useCallback } from "react";
import { useNotificationContext } from "@/contexts/Notification";
import { useError } from "@/utils/ErrorHandler";
import type { IPaginatedResponse } from "@/Interfaces/Common";
import {
  CustomerResponseKeys,
  type IGetCustomerResponse,
} from "@/Interfaces/Customer";
import { CustomerService } from "@/services/Customer";
import { useCustomerModal } from "./CustomerModal/useCustomerModal";

export const useCustomers = () => {
  const { Loading, showToast } = useNotificationContext();
  const { handleError } = useError();

  const customerModal = useCustomerModal();

  const [data, setData] = useState<IPaginatedResponse<IGetCustomerResponse>>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await CustomerService.getCustomers({ page, limit });
      setData(response);
    } catch (error) {
      handleError("Erro ao buscar clientes", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const onPageChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  const onSave = async () => {
    if (!customerModal.validateForm()) return;

    Loading.show(
      customerModal.editingCustomer ? "Atualizando..." : "Salvando...",
    );
    try {
      if (customerModal.editingCustomer) {
        await CustomerService.updateCustomer(
          customerModal.editingCustomer[CustomerResponseKeys.ID], 
          customerModal.form,
        );
        showToast("success", "Sucesso", "Cliente atualizado!");
      } else {
        await CustomerService.createCustomer(customerModal.form);
        showToast("success", "Sucesso", "Cliente cadastrado!");
      }
      customerModal.closeModal();
      fetchCustomers();
    } catch (error) {
      handleError("Erro ao salvar cliente", error);
    } finally {
      Loading.hide();
    }
  };

  const onDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

    Loading.show("Excluindo...");
    try {
      await CustomerService.deleteCustomer(id);
      showToast("success", "Sucesso", "Cliente removido!");
      fetchCustomers();
    } catch (error) {
      handleError("Erro ao excluir cliente", error);
    } finally {
      Loading.hide();
    }
  };

  return {
    data,
    page,
    limit,
    isLoading,
    onPageChange,
    onDelete,
    onSave,
    customerModal,
  };
};
