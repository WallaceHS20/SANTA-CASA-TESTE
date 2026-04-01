import { useState, useCallback } from "react";
import { useNotificationContext } from "@/contexts/Notification";
import type { TFormError, THandleSetFieldProps } from "@/Interfaces/Common";
import {
  CustomerResponseKeys,
  PostCustomerKeys,
  type IGetCustomerResponse,
  type IPostCustomerBase,
} from "@/Interfaces/Customer";
import { Validations } from "@/utils/Validate";
import { Masks } from "@/utils/Masks";

const defaultForm: IPostCustomerBase = {
  [PostCustomerKeys.NAME]: "",
  [PostCustomerKeys.EMAIL]: "",
  [PostCustomerKeys.TAX_ID]: "",
  [PostCustomerKeys.CITY]: "",
  [PostCustomerKeys.STATE]: "",
};

const defaultFormError: TFormError<IPostCustomerBase> = {
  [PostCustomerKeys.NAME]: "",
  [PostCustomerKeys.EMAIL]: "",
  [PostCustomerKeys.TAX_ID]: "",
  [PostCustomerKeys.CITY]: "",
  [PostCustomerKeys.STATE]: "",
};

export const useCustomerModal = () => {
  const { showToast } = useNotificationContext();

  const [isOpen, setIsOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] =
    useState<IGetCustomerResponse | null>(null);

  const [form, setForm] = useState<IPostCustomerBase>(defaultForm);
  const [formError, setFormError] =
    useState<TFormError<IPostCustomerBase>>(defaultFormError);

  const handleSetField = useCallback((event: THandleSetFieldProps) => {
    const key = event.target.name as keyof IPostCustomerBase;
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
    Record<PostCustomerKeys, (value: any) => string>
  > = {
    [PostCustomerKeys.NAME]: (value: string) => {
      if (!value || value.trim() === "")
        return "O Nome/Razão Social é obrigatório.";
      return "";
    },
    [PostCustomerKeys.TAX_ID]: (value: string) => {
      if (!value || !Validations.isValidTaxId(value))
        return "Insira um CPF/CNPJ válido.";
      return "";
    },
    [PostCustomerKeys.EMAIL]: (value: string) => {
      if (!value || !Validations.validateEmail(value))
        return "É necessário informar um e-mail válido.";
      return "";
    },
  };

  const handleValidation = (
    currentForm: IPostCustomerBase,
  ): TFormError<IPostCustomerBase> => {
    const errors: TFormError<IPostCustomerBase> = {};

    Object.entries(currentForm).forEach(([key, value]) => {
      const validationKey = key as PostCustomerKeys;
      if (validationKey in validateRules) {
        const validation = validateRules[validationKey];
        if (validation) {
          errors[key as keyof IPostCustomerBase] = validation(value);
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

  const openModal = useCallback((customer?: IGetCustomerResponse) => {
    const rawTaxId = customer
      ? Masks.removeSpecialChars(customer[CustomerResponseKeys.TAX_ID])
      : "";
    const formattedTaxId = Masks.cpfCnpj(rawTaxId);
    if (customer) {
      setEditingCustomer(customer);
      setForm({
        [PostCustomerKeys.NAME]: customer[CustomerResponseKeys.NAME] || "",
        [PostCustomerKeys.EMAIL]: formattedTaxId,
        [PostCustomerKeys.TAX_ID]: customer[CustomerResponseKeys.TAX_ID] || "",
        [PostCustomerKeys.CITY]: customer[CustomerResponseKeys.CITY] || "",
        [PostCustomerKeys.STATE]: customer[CustomerResponseKeys.STATE] || "",
      });
    } else {
      setEditingCustomer(null);
      setForm(defaultForm);
    }
    setFormError(defaultFormError);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setEditingCustomer(null);
    setForm(defaultForm);
    setFormError(defaultFormError);
  }, []);

  return {
    isOpen,
    editingCustomer,
    form,
    formError,
    openModal,
    closeModal,
    handleSetField,
    validateForm,
  };
};
