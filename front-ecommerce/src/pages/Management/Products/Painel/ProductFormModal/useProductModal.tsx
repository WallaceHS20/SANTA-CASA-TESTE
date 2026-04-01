import { useState, useCallback } from "react";
import { useNotificationContext } from "@/contexts/Notification";
import type { TFormError, THandleSetFieldProps } from "@/Interfaces/Common";
import { 
  PostProductKeys, 
  type IGetProductResponse 
} from "@/Interfaces/Products";

const defaultForm = {
  [PostProductKeys.NAME]: "",
  [PostProductKeys.SAP_CODE]: "",
  [PostProductKeys.CATEGORY]: "",
  [PostProductKeys.QUANTITY]: 0,
  [PostProductKeys.MIN_QUANTITY]: 0,
  [PostProductKeys.UNIT_VAL]: "",
};

const defaultFormError: TFormError<typeof defaultForm> = {
  [PostProductKeys.NAME]: "",
  [PostProductKeys.SAP_CODE]: "",
  [PostProductKeys.CATEGORY]: "",
  [PostProductKeys.QUANTITY]: "",
  [PostProductKeys.MIN_QUANTITY]: "",
  [PostProductKeys.UNIT_VAL]: "",
};

export const useProductModal = () => {
  const { showToast } = useNotificationContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IGetProductResponse | null>(null);
  
  const [form, setForm] = useState<any>(defaultForm);
  const [formError, setFormError] = useState<TFormError<typeof defaultForm>>(defaultFormError);

  const handleSetField = useCallback((event: THandleSetFieldProps) => {
    const key = event.target.name;
    const value = event.target.value;

    setForm((prev: any) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });

    setFormError((prev: any) => {
      if (!prev[key]) return prev;
      return { ...prev, [key]: "" };
    });
  }, []);

  const validateRules: Partial<Record<PostProductKeys, (value: any) => string>> = {
    [PostProductKeys.NAME]: (value: string) => {
      if (!value || String(value).trim() === "") return "O nome do produto é obrigatório.";
      return "";
    },
    [PostProductKeys.SAP_CODE]: (value: string) => {
      if (!value || String(value).trim() === "") return "O código SAP é obrigatório.";
      return "";
    },
    [PostProductKeys.CATEGORY]: (value: any) => {
      if (!value) return "Selecione uma categoria.";
      return "";
    },
    [PostProductKeys.UNIT_VAL]: (value: any) => {
      if (!value || Number(value) <= 0) return "Informe um valor unitário válido.";
      return "";
    },
    [PostProductKeys.QUANTITY]: (value: any) => {
      if (!value || Number(value) <= 0) return "Informe uma quantidade válida.";
      return "";
    },
    [PostProductKeys.MIN_QUANTITY]: (value: any) => {
      if (!value || Number(value) <= 0) return "Informe uma quantidade minima válida.";
      return "";
    },
  };

  const handleValidation = (currentForm: any): TFormError<typeof defaultForm> => {
    const errors: any = {};
    Object.entries(currentForm).forEach(([key, value]) => {
      const validationKey = key as PostProductKeys;
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
        "Verifique os campos preenchidos e tente novamente."
      );
      return false; 
    }
    
    return true; 
  };

  const openAdd = useCallback(() => {
    setEditingProduct(null);
    setForm(defaultForm);
    setFormError(defaultFormError);
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((product: IGetProductResponse) => {
    setEditingProduct(product);
    setForm({
      ...product,
      [PostProductKeys.CATEGORY]: product[PostProductKeys.CATEGORY] || "",
    });
    setFormError(defaultFormError);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setEditingProduct(null);
    setForm(defaultForm);
    setFormError(defaultFormError);
  }, []);

  return {
    isOpen,
    editingProduct,
    form,
    formError,
    openAdd,
    openEdit,
    close,
    handleSetField,
    validateForm,
  };
};