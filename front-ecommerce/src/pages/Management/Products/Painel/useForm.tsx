import { useNotificationContext } from "@/contexts/Notification";
import type {
  IPaginatedResponse,
  THandleSetFieldProps,
} from "@/Interfaces/Common";
import {
  type IGetProductParams,
  type IGetProductResponse,
  GetProductParamsKeys,
  PostProductKeys,
} from "@/Interfaces/Products";
import { ProductService } from "@/services/Products";
import { useError } from "@/utils/ErrorHandler";
import { useState, useCallback } from "react";
import { usePurchase } from "./PurchaseFormModal/usePurchase";
import { useProductModal } from "./ProductFormModal/useProductModal";

const defaultForm: IGetProductParams = {
  [GetProductParamsKeys.NAME]: "",
  [GetProductParamsKeys.SAP_CODE]: "",
  [GetProductParamsKeys.LOT]: "",
  [GetProductParamsKeys.CATEGORY]: undefined,
  [GetProductParamsKeys.LOCATION]: undefined,
  page: 1,
  limit: 10,
};

export const useForm = () => {
  const { Loading, showToast } = useNotificationContext();
  const { handleError } = useError();

  const productModal = useProductModal();
  const purchaseModal = usePurchase(() => fetchProducts(form));

  const [form, setForm] = useState<IGetProductParams>(defaultForm);
  const [data, setData] = useState<IPaginatedResponse<IGetProductResponse>>();

  const fetchProducts = useCallback(
    async (currentForm: IGetProductParams) => {
      Loading.show("Buscando produtos...");
      try {
        const response = await ProductService.getProducts(currentForm);
        setData(response);
      } catch (error) {
        handleError("Erro ao buscar produtos", error);
      } finally {
        Loading.hide();
      }
    },
    [Loading, handleError],
  );

  const handleSetField = useCallback((event: THandleSetFieldProps) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onPageChange = (page: number, limit: number) => {
    const newForm = { ...form, page, limit };
    setForm(newForm);
    fetchProducts(newForm);
  };

  const onSubmit = () => {
    const firstPageForm = { ...form, page: 1 };
    setForm(firstPageForm);
    fetchProducts(firstPageForm);
  };

  const onClear = useCallback(() => {
    setForm(defaultForm);
    setData(undefined);
  }, []);

  const onSave = async () => {
    if (!productModal.validateForm()) return;

    Loading.show(
      productModal.editingProduct
        ? "Atualizando produto..."
        : "Cadastrando produto...",
    );

    try {
      const formData = productModal.form;

      const dataToSend = {
        ...formData,
        [PostProductKeys.LOT]: String(formData[PostProductKeys.LOT] || ""),
        [PostProductKeys.QUANTITY]: Number(formData[PostProductKeys.QUANTITY] || 0),
        [PostProductKeys.MIN_QUANTITY]: Number(formData[PostProductKeys.MIN_QUANTITY] || 0),
        [PostProductKeys.UNIT_VAL]: Number(formData[PostProductKeys.UNIT_VAL] || 0),
        [PostProductKeys.CATEGORY]: Number(formData[PostProductKeys.CATEGORY]),
        [PostProductKeys.LOCATION]: formData[PostProductKeys.LOCATION]
          ? Number(formData[PostProductKeys.LOCATION])
          : null,
      };

      if (productModal.editingProduct?.product_id) {
        await ProductService.updateProduct(
          productModal.editingProduct.product_id,
          dataToSend,
        );
        showToast("success", "Sucesso", "Produto atualizado com sucesso!");
      } else {
        await ProductService.createProduct(dataToSend);
        showToast("success", "Sucesso", "Produto cadastrado com sucesso!");
      }

      productModal.close();
      fetchProducts(form);
    } catch (error) {
      handleError("Erro ao salvar produto", error);
    } finally {
      Loading.hide();
    }
  };

  return {
    form,
    data,
    handleSetField,
    onClear,
    onSubmit,
    onPageChange,
    productModal,
    purchaseModal,
    onSave,
  };
};