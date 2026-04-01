import { Dialog } from "primereact/dialog";
import { BasicInputField } from "@/components/FormFields/BasicInputField";
import { BasicSelectField } from "@/components/FormFields/BasicSelectField";
import {
  Button,
  ButtonSeverity,
  ButtonIcon,
  ButtonVariant,
} from "@/components/Button";
import {
  PostProductKeys,
  type IGetProductResponse,
} from "@/Interfaces/Products";
import { useEffect, useState } from "react";
import { categoryOptions } from "@/constants/Routes/products";

interface Props {
  visible: boolean;
  onHide: () => void;
  product?: IGetProductResponse | null;
  onSave: (data: any) => void;
}

export const ProductFormModal = ({
  visible,
  onHide,
  product,
  onSave,
}: Props) => {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (product) setForm(product);
    else setForm({});
  }, [product, visible]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

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
        onClick={() => onSave(form)}
      />
    </div>
  );

  return (
    <Dialog
      header={product ? "Editar Produto" : "Novo Cadastro"}
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
            onChange={handleChange}
          />
        </div>

        <div className="col-12 md:col-6">
          <BasicInputField
            id={PostProductKeys.SAP_CODE}
            name={PostProductKeys.SAP_CODE}
            label="Código SAP"
            value={form[PostProductKeys.SAP_CODE] || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 md:col-6">
          <BasicSelectField
            id={PostProductKeys.CATEGORY}
            name={PostProductKeys.CATEGORY}
            label="Categoria"
            options={categoryOptions}
            value={form[PostProductKeys.CATEGORY] || ""}
            handleSetField={handleChange}
          />
        </div>

        <div className="col-12 md:col-4">
          <BasicInputField
            id={PostProductKeys.QUANTITY}
            name={PostProductKeys.QUANTITY}
            label="Estoque Atual"
            type="number"
            value={form[PostProductKeys.QUANTITY] || 0}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 md:col-4">
          <BasicInputField
            id={PostProductKeys.MIN_QUANTITY}
            name={PostProductKeys.MIN_QUANTITY}
            label="Estoque Mínimo"
            type="number"
            value={form[PostProductKeys.MIN_QUANTITY] || 0}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 md:col-4">
          <BasicInputField
            id={PostProductKeys.UNIT_VAL}
            name={PostProductKeys.UNIT_VAL}
            label="Valor Unitário (R$)"
            value={form[PostProductKeys.UNIT_VAL] || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </Dialog>
  );
};
