import { useState, useCallback } from "react";
import { TransactionService } from "@/services/Transactions";
import { useNotificationContext } from "@/contexts/Notification";
import { useError } from "@/utils/ErrorHandler";
import {
  type IGetProductResponse,
  PostProductKeys,
} from "@/Interfaces/Products";
import {
  TransactionKeys,
  TransactionItemKeys,
  TransactionTypeId,
  type ICreateTransactionDTO,
} from "@/Interfaces/Transactions";
import type { TFormError, THandleSetFieldProps } from "@/Interfaces/Common";
import { useAuthContext } from "@/contexts/Auth";
import { UserKeys } from "@/Interfaces/Auth";

export enum PurchaseFormKeys {
  QUANTITY = "quantity",
  UNIT_PRICE = "unit_price",
  LOT = "lot",
  EXPIRY_DATE = "expiry_date",
  DESCRIPTION = "description",
}

const defaultPurchaseForm = {
  [PurchaseFormKeys.QUANTITY]: 0,
  [PurchaseFormKeys.UNIT_PRICE]: 0,
  [PurchaseFormKeys.LOT]: "",
  [PurchaseFormKeys.EXPIRY_DATE]: "",
  [PurchaseFormKeys.DESCRIPTION]: "",
};

const defaultFormError: TFormError<typeof defaultPurchaseForm> = {
  [PurchaseFormKeys.QUANTITY]: "",
  [PurchaseFormKeys.UNIT_PRICE]: "",
  [PurchaseFormKeys.LOT]: "",
  [PurchaseFormKeys.EXPIRY_DATE]: "",
  [PurchaseFormKeys.DESCRIPTION]: "",
};

export const usePurchase = (onSuccess: () => void) => {
  const { user } = useAuthContext();
  const { Loading, showToast } = useNotificationContext();
  const { handleError } = useError();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<IGetProductResponse | null>(null);

  const [form, setForm] = useState(defaultPurchaseForm);
  const [formError, setFormError] =
    useState<TFormError<typeof defaultPurchaseForm>>(defaultFormError);

  const openModal = useCallback((product: IGetProductResponse) => {
    setSelectedProduct(product);
    setForm({
      [PurchaseFormKeys.QUANTITY]: 0,
      [PurchaseFormKeys.UNIT_PRICE]: product[PostProductKeys.UNIT_VAL] || 0,
      [PurchaseFormKeys.LOT]: "",
      [PurchaseFormKeys.EXPIRY_DATE]: "",
      [PurchaseFormKeys.DESCRIPTION]: `Entrada de estoque: ${product[PostProductKeys.NAME]}`,
    });
    setFormError(defaultFormError);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedProduct(null);
    setForm(defaultPurchaseForm);
    setFormError(defaultFormError);
  }, []);

  const handleSetField = useCallback((event: THandleSetFieldProps) => {
    const key = event.target.name as keyof typeof defaultPurchaseForm;
    const value = event.target.value;

    setForm((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });

    setFormError((prev) => {
      if (!prev[key]) return prev;
      return { ...prev, [key]: "" };
    });
  }, []);

  const validateRules: Partial<
    Record<PurchaseFormKeys, (value: any) => string>
  > = {
    [PurchaseFormKeys.QUANTITY]: (value: any) => {
      if (!value || Number(value) <= 0)
        return "A quantidade deve ser maior que zero.";
      return "";
    },
    [PurchaseFormKeys.UNIT_PRICE]: (value: any) => {
      if (!value || Number(value) < 0)
        return "O preço unitário não pode ser negativo.";
      return "";
    },
    [PurchaseFormKeys.DESCRIPTION]: (value: string) => {
      if (!value || value.trim() === "") return "A descrição é obrigatória.";
      return "";
    },

    [PurchaseFormKeys.LOT]: (value: string) => {
      if (!value || value.trim() === "") return "Informe o lote do produto.";
      return "";
    },
    [PurchaseFormKeys.EXPIRY_DATE]: (value: string) => {
      if (!value) return "A data de validade é obrigatória.";

      const inputDate = new Date(`${value}T00:00:00`);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (inputDate <= today) {
        return "A data de validade deve ser no futuro.";
      }

      return "";
    },
  };

  const handleValidation = (
    currentForm: typeof defaultPurchaseForm,
  ): TFormError<typeof defaultPurchaseForm> => {
    const errors: any = {};
    Object.entries(currentForm).forEach(([key, value]) => {
      const validationKey = key as PurchaseFormKeys;
      if (validationKey in validateRules) {
        const validation = validateRules[validationKey];
        if (validation) {
          errors[key] = validation(value);
        }
      }
    });
    return errors;
  };

  const validateForm = (): boolean => {
    const validate = handleValidation(form);
    if (Object.values(validate).some(Boolean)) {
      setFormError(validate);
      showToast(
        "error",
        "Formulário inválido",
        "Verifique os campos preenchidos e tente novamente.",
      );
      return false;
    }
    return true;
  };

  const onConfirm = async () => {
    if (!selectedProduct?.product_id) return;
    if (!validateForm()) return; // 🎯 Validação antes de enviar

    Loading.show("Realizando compra...");

    try {
      const transactionData: ICreateTransactionDTO = {
        [TransactionKeys.TYPE]: TransactionTypeId.ENTRY,
        [TransactionKeys.DESCRIPTION]: String(
          form[PurchaseFormKeys.DESCRIPTION],
        ),
        [TransactionKeys.CUSTOMER_ID]: user?.[UserKeys.ID],
        [TransactionKeys.ITEMS]: [
          {
            [TransactionItemKeys.PRODUCT_ID]: selectedProduct.product_id,
            [TransactionItemKeys.QUANTITY]: Number(
              form[PurchaseFormKeys.QUANTITY],
            ),
            [TransactionItemKeys.UNIT_PRICE]: Number(
              form[PurchaseFormKeys.UNIT_PRICE],
            ),
          },
        ],
      };

      await TransactionService.createTransaction(transactionData);

      showToast("success", "Sucesso", "Compra registrada!");
      closeModal();
      onSuccess();
    } catch (error) {
      handleError("Erro ao registrar compra", error);
    } finally {
      Loading.hide();
    }
  };

  return {
    isOpen,
    selectedProduct,
    form,
    formError,
    openModal,
    closeModal,
    handleSetField,
    onConfirm,
  };
};
