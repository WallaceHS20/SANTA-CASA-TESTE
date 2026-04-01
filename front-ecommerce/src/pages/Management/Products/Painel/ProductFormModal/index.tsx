import { Dialog } from "primereact/dialog";
import { BasicInputField } from "@/components/FormFields/BasicInputField";
import { BasicSelectField } from "@/components/FormFields/BasicSelectField";
import { Button, ButtonSeverity, ButtonIcon, ButtonVariant } from "@/components/Button";
import { PostProductKeys } from "@/Interfaces/Products";
import { categoryOptions } from "@/constants/Routes/products";
import type { THandleSetFieldProps } from "@/Interfaces/Common";

interface Props {
  visible: boolean;
  onHide: () => void;
  isEditing: boolean;
  form: any;
  formError: any;
  onChange: (event: THandleSetFieldProps) => void;
  onSave: () => void;
}

export const ProductFormModal = ({
  visible,
  onHide,
  isEditing,
  form,
  formError,
  onChange,
  onSave,
}: Props) => {
  
  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Cancelar"
        variant={ButtonVariant.OUTLINED}
        severity={ButtonSeverity.SECONDARY}
        onClick={onHide}
      />
      <Button
        label="Salvar Produto"
        icon={ButtonIcon.SAVE}
        onClick={onSave}
      />
    </div>
  );

  return (
    <Dialog
      header={isEditing ? "Editar Produto" : "Novo Cadastro"}
      visible={visible}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className="grid mt-2">
        <div className="col-12">
          <BasicInputField
            id={PostProductKeys.NAME}
            name={PostProductKeys.NAME}
            label="Nome Completo do Produto"
            value={form[PostProductKeys.NAME] || ""}
            onChange={onChange}
            error={formError[PostProductKeys.NAME]}
          />
        </div>

        <div className="col-12 md:col-6">
          <BasicInputField
            id={PostProductKeys.SAP_CODE}
            name={PostProductKeys.SAP_CODE}
            label="Código SAP"
            value={form[PostProductKeys.SAP_CODE] || ""}
            onChange={onChange}
            error={formError[PostProductKeys.SAP_CODE]}
          />
        </div>

        <div className="col-12 md:col-6">
          <BasicSelectField
            id={PostProductKeys.CATEGORY}
            name={PostProductKeys.CATEGORY}
            label="Categoria"
            options={categoryOptions}
            value={form[PostProductKeys.CATEGORY] || ""}
            handleSetField={onChange}
            // Supondo que o BasicSelectField aceite error, senão adicione um span embaixo
          />
        </div>

        <div className="col-12 md:col-4">
          <BasicInputField
            id={PostProductKeys.QUANTITY}
            name={PostProductKeys.QUANTITY}
            label="Estoque Atual"
            type="number"
            value={form[PostProductKeys.QUANTITY] || 0}
            onChange={onChange}
            error={formError[PostProductKeys.QUANTITY]}
          />
        </div>

        <div className="col-12 md:col-4">
          <BasicInputField
            id={PostProductKeys.MIN_QUANTITY}
            name={PostProductKeys.MIN_QUANTITY}
            label="Estoque Mínimo"
            type="number"
            value={form[PostProductKeys.MIN_QUANTITY] || 0}
            onChange={onChange}
            error={formError[PostProductKeys.MIN_QUANTITY]}
          />
        </div>

        <div className="col-12 md:col-4">
          <BasicInputField
            id={PostProductKeys.UNIT_VAL}
            name={PostProductKeys.UNIT_VAL}
            label="Valor Unitário (R$)"
            value={form[PostProductKeys.UNIT_VAL] || ""}
            onChange={onChange}
            error={formError[PostProductKeys.UNIT_VAL]}
          />
        </div>
      </div>
    </Dialog>
  );
};