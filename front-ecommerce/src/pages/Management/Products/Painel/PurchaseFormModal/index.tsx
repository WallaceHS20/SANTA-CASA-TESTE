import { Dialog } from 'primereact/dialog';
import { BasicInputField } from "@/components/FormFields/BasicInputField";
import { Button, ButtonSeverity, ButtonIcon, ButtonVariant } from "@/components/Button";
import { type IGetProductResponse, PostProductKeys } from "@/Interfaces/Products";
import { PurchaseFormKeys } from './usePurchase';
import type { TFormError, THandleSetFieldProps } from "@/Interfaces/Common";

interface Props {
  visible: boolean;
  onHide: () => void;
  product: IGetProductResponse | null;
  form: any;
  formError: TFormError<any>;
  onChange: (event: THandleSetFieldProps) => void;
  onConfirm: () => void;
}

export const PurchaseFormModal = ({ visible, onHide, product, form, formError, onChange, onConfirm }: Props) => {
  
  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button 
        label="Cancelar" 
        variant={ButtonVariant.OUTLINED} 
        severity={ButtonSeverity.SECONDARY} 
        onClick={onHide} 
      />
      <Button 
        label="Confirmar" 
        icon={ButtonIcon.SAVE} 
        onClick={onConfirm} 
      />
    </div>
  );

  return (
    <Dialog 
      header="Registrar (Compra)" 
      visible={visible} 
      style={{ width: '45vw' }} 
      breakpoints={{ '960px': '85vw', '641px': '100vw' }}
      modal 
      footer={footer} 
      onHide={onHide}
    >
      <div className="grid mt-2">
        <div className="col-12">
          <div className="p-3 bg-blue-50 border-round-md mb-3 border-left-3 border-blue-500">
            <span className="text-sm text-blue-700 font-bold block mb-1">Produto Selecionado:</span>
            <span className="text-900 font-medium">{product?.[PostProductKeys.NAME]}</span>
          </div>
        </div>

        <div className="col-12">
          <BasicInputField
            id={PurchaseFormKeys.DESCRIPTION}
            name={PurchaseFormKeys.DESCRIPTION}
            label="Descrição/Observação da Transação"
            value={form[PurchaseFormKeys.DESCRIPTION]}
            onChange={onChange}
            error={formError[PurchaseFormKeys.DESCRIPTION]}
          />
        </div>

        <div className="col-12 md:col-6">
          <BasicInputField
            id={PurchaseFormKeys.QUANTITY}
            name={PurchaseFormKeys.QUANTITY}
            label="Quantidade Comprada"
            type="number"
            value={form[PurchaseFormKeys.QUANTITY]}
            onChange={onChange}
            error={formError[PurchaseFormKeys.QUANTITY]} 
          />
        </div>

        <div className="col-12 md:col-6">
          <BasicInputField
            id={PurchaseFormKeys.UNIT_PRICE}
            name={PurchaseFormKeys.UNIT_PRICE}
            label="Custo Unitário nesta Entrada"
            type="number"
            value={form[PurchaseFormKeys.UNIT_PRICE]}
            onChange={onChange}
            error={formError[PurchaseFormKeys.UNIT_PRICE]} 
          />
        </div>

        <div className="col-12 md:col-6">
          <BasicInputField
            id={PurchaseFormKeys.LOT}
            name={PurchaseFormKeys.LOT}
            label="Lote"
            value={form[PurchaseFormKeys.LOT]}
            onChange={onChange}
            error={formError[PurchaseFormKeys.LOT]} 
          />
        </div>

        <div className="col-12 md:col-6">
          <BasicInputField
            id={PurchaseFormKeys.EXPIRY_DATE}
            name={PurchaseFormKeys.EXPIRY_DATE}
            label="Data de Validade"
            type="date"
            value={form[PurchaseFormKeys.EXPIRY_DATE]}
            onChange={onChange}
            error={formError[PurchaseFormKeys.EXPIRY_DATE]} 
          />
        </div>

        <div className="col-12 mt-3">
           <div className="flex justify-content-between p-3 bg-gray-100 border-round-lg border-1 border-300">
              <span className="font-bold text-700">Total da Transação:</span>
              <span className="font-bold text-2xl text-primary">
                {(Number(form[PurchaseFormKeys.QUANTITY] || 0) * Number(form[PurchaseFormKeys.UNIT_PRICE] || 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
           </div>
        </div>
      </div>
    </Dialog>
  );
};