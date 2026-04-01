import { Dialog } from "primereact/dialog";
import { BasicInputField } from "@/components/FormFields/BasicInputField";
import {
  Button,
  ButtonSeverity,
  ButtonIcon,
  ButtonVariant,
} from "@/components/Button";
import type { THandleSetFieldProps, TFormError } from "@/Interfaces/Common";
import {
  PostCustomerKeys,
  type IPostCustomerBase,
} from "@/Interfaces/Customer";
import { SanitizeFieldOnChange } from "@/utils/SanitizeFieldOnChange ";

interface Props {
  visible: boolean;
  onHide: () => void;
  isEditing: boolean;
  form: IPostCustomerBase;
  formError: TFormError<IPostCustomerBase>;
  onChange: (event: THandleSetFieldProps) => void;
  onSave: () => void;
}

export const CustomerFormModal = ({
  visible,
  onHide,
  isEditing,
  form,
  formError,
  onChange,
  onSave,
}: Props) => {
  const sanitizeCPFCnpj = (event: THandleSetFieldProps) => {
    onChange(SanitizeFieldOnChange.cpfCnpj(event));
  };

  const sanitizeEmail = (event: THandleSetFieldProps) => {
    onChange(SanitizeFieldOnChange.email(event));
  };

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Cancelar"
        variant={ButtonVariant.OUTLINED}
        severity={ButtonSeverity.SECONDARY}
        onClick={onHide}
      />
      <Button label="Salvar" icon={ButtonIcon.SAVE} onClick={onSave} />
    </div>
  );

  return (
    <Dialog
      header={isEditing ? "Editar Cliente" : "Novo Cliente"}
      visible={visible}
      style={{ width: "40vw" }}
      breakpoints={{ "960px": "85vw" }}
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className="grid mt-2">
        <div className="col-12">
          <BasicInputField
            id={PostCustomerKeys.NAME}
            name={PostCustomerKeys.NAME}
            label="Nome / Razão Social"
            value={form[PostCustomerKeys.NAME]}
            onChange={onChange}
            error={formError[PostCustomerKeys.NAME]}
          />
        </div>
        <div className="col-12 md:col-6">
          <BasicInputField
            id={PostCustomerKeys.TAX_ID}
            name={PostCustomerKeys.TAX_ID}
            label="CPF / CNPJ"
            value={form[PostCustomerKeys.TAX_ID]}
            onChange={sanitizeCPFCnpj}
            error={formError[PostCustomerKeys.TAX_ID]}
          />
        </div>
        <div className="col-12 md:col-6">
          <BasicInputField
            id={PostCustomerKeys.EMAIL}
            name={PostCustomerKeys.EMAIL}
            label="E-mail"
            type="email"
            value={form[PostCustomerKeys.EMAIL]}
            onChange={sanitizeEmail}
            error={formError[PostCustomerKeys.EMAIL]}
          />
        </div>
        <div className="col-12 md:col-6">
          <BasicInputField
            id={PostCustomerKeys.CITY}
            name={PostCustomerKeys.CITY}
            label="Cidade"
            value={form[PostCustomerKeys.CITY]}
            onChange={onChange}
            error={formError[PostCustomerKeys.CITY]}
          />
        </div>
        <div className="col-12 md:col-6">
          <BasicInputField
            id={PostCustomerKeys.STATE}
            name={PostCustomerKeys.STATE}
            label="UF (Estado)"
            value={form[PostCustomerKeys.STATE]}
            onChange={onChange}
            error={formError[PostCustomerKeys.STATE]}
          />
        </div>
      </div>
    </Dialog>
  );
};
