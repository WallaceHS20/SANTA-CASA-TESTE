import type { IColumnsConfig } from "@/components/DataTable";
import {
  Button,
  ButtonVariant,
  ButtonSeverity,
  ButtonIcon,
} from "@/components/Button";
import {
  CustomerResponseKeys,
  type IGetCustomerResponse,
} from "@/Interfaces/Customer";
import { CopyContent } from "@/components/CopyContent";
import { Masks } from "@/utils/Masks";

export const ColumnsConfig = (
  onEdit: (customer: IGetCustomerResponse) => void,
  onDelete: (id: number) => void,
): IColumnsConfig[] => {
  return [
    {
      id: CustomerResponseKeys.ID,
      field: CustomerResponseKeys.ID,
      header: "ID",
      sortable: true,
    },
    {
      id: CustomerResponseKeys.NAME,
      field: CustomerResponseKeys.NAME,
      header: "Cliente",
    },
    {
      id: CustomerResponseKeys.TAX_ID,
      field: CustomerResponseKeys.TAX_ID,
      header: "CPF/CNPJ",
      body: (rowData: IGetCustomerResponse) => {
        const rawTaxId = Masks.removeSpecialChars(
          rowData[CustomerResponseKeys.TAX_ID],
        );
        const formattedTaxId = Masks.cpfCnpj(
          rowData[CustomerResponseKeys.TAX_ID],
        );

        return (
          <CopyContent
            content={rawTaxId} 
            label={formattedTaxId} 
          />
        );
      },
    },
    {
      id: CustomerResponseKeys.CITY,
      field: CustomerResponseKeys.CITY,
      header: "Cidade",
    },
    {
      id: CustomerResponseKeys.STATE,
      field: CustomerResponseKeys.STATE,
      header: "UF",
    },
    {
      id: "actions",
      header: "Ações",
      body: (rowData: IGetCustomerResponse) => (
        <div className="flex gap-2">
          <Button
            icon={ButtonIcon.EDIT}
            variant={ButtonVariant.GHOST}
            severity={ButtonSeverity.INFO}
            isIconButton
            onClick={() => onEdit(rowData)}
          />
          <Button
            icon={ButtonIcon.DELETE}
            variant={ButtonVariant.GHOST}
            severity={ButtonSeverity.DANGER}
            isIconButton
            onClick={() => onDelete(rowData[CustomerResponseKeys.ID])}
          />
        </div>
      ),
    },
  ];
};
