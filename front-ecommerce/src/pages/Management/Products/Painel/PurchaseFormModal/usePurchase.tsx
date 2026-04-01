import { useState, useCallback } from "react";
import { TransactionService } from "@/services/Transactions";
import { useNotificationContext } from "@/contexts/Notification";
import { useError } from "@/utils/ErrorHandler";
import { type IGetProductResponse, PostProductKeys } from "@/Interfaces/Products";
import { 
  TransactionKeys, 
  TransactionItemKeys, 
  TransactionTypeId, 
  type ICreateTransactionDTO 
} from "@/Interfaces/Transactions";
import type { THandleSetFieldProps } from "@/Interfaces/Common";
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

export const usePurchase = (onSuccess: () => void) => {
  const {user} = useAuthContext()
  const { Loading, showToast } = useNotificationContext();
  const { handleError } = useError();

  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IGetProductResponse | null>(null);
  
  const [purchaseForm, setPurchaseForm] = useState(defaultPurchaseForm);

  const openPurchase = (product: IGetProductResponse) => {
    setSelectedProduct(product);
    setPurchaseForm({
      [PurchaseFormKeys.QUANTITY]: 0,
      [PurchaseFormKeys.UNIT_PRICE]: product[PostProductKeys.UNIT_VAL] || 0,
      [PurchaseFormKeys.LOT]: "",
      [PurchaseFormKeys.EXPIRY_DATE]: "",
      [PurchaseFormKeys.DESCRIPTION]: `Entrada de estoque: ${product[PostProductKeys.NAME]}`,
    });
    setIsPurchaseOpen(true);
  };

  const closePurchase = () => {
    setIsPurchaseOpen(false);
    setSelectedProduct(null);
    setPurchaseForm(defaultPurchaseForm);
  };

  const handleSetPurchaseField = useCallback((event: THandleSetFieldProps) => {
    const { name, value } = event.target;
    setPurchaseForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onConfirmPurchase = async () => {
    if (!selectedProduct?.product_id) return;

    Loading.show("Registrando entrada de estoque...");
    
    try {
      const transactionData: ICreateTransactionDTO = {
        [TransactionKeys.TYPE]: TransactionTypeId.ENTRY,
        [TransactionKeys.DESCRIPTION]: String(purchaseForm[PurchaseFormKeys.DESCRIPTION]),
        [TransactionKeys.CUSTOMER_ID]: user?.[UserKeys.ID],
        [TransactionKeys.ITEMS]: [
          {
            [TransactionItemKeys.PRODUCT_ID]: selectedProduct.product_id,
            [TransactionItemKeys.QUANTITY]: Number(purchaseForm[PurchaseFormKeys.QUANTITY]),
            [TransactionItemKeys.UNIT_PRICE]: Number(purchaseForm[PurchaseFormKeys.UNIT_PRICE]),
          }
        ]
      };

      await TransactionService.createTransaction(transactionData);
      
      showToast("success", "Sucesso", "Entrada de estoque registrada!");
      closePurchase();
      onSuccess(); 
    } catch (error) {
      handleError("Erro ao registrar compra", error);
    } finally {
      Loading.hide();
    }
  };

  return {
    isPurchaseOpen,
    selectedProduct,
    purchaseForm,
    openPurchase,
    closePurchase,
    handleSetPurchaseField,
    onConfirmPurchase
  };
};