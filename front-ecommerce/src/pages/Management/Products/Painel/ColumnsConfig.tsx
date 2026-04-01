import { Tag } from "primereact/tag";
import {
  PostProductKeys,
  ProductCategoryId,
  type IGetProductResponse,
} from "@/Interfaces/Products";
import type { IColumnsConfig } from "@/components/DataTable";
import { CopyContent } from "@/components/CopyContent";
import { Button, ButtonIcon } from "@/components/Button";
import { UserRole } from "@/Interfaces/Auth";

const categoryMap: Record<
  number,
  { label: string; severity: "info" | "success" | "warning" | "danger" | null }
> = {
  [ProductCategoryId.MEDICINE]: { label: "Medicamento", severity: "info" },
  [ProductCategoryId.SUPPLY]: { label: "Suprimento", severity: "success" },
  [ProductCategoryId.EQUIPMENT]: { label: "Equipamento", severity: "warning" },
  [ProductCategoryId.CLEANING]: { label: "Limpeza", severity: "danger" },
};

export const ColumnsConfig = (
  openEdit: (product: IGetProductResponse) => void,
  openPurchase: (product: IGetProductResponse) => void,
): IColumnsConfig[] => {

  return [
    {
      id: PostProductKeys.SAP_CODE,
      header: "Código SAP",
      sortable: true,
      field: PostProductKeys.SAP_CODE,
      body: (rowData: IGetProductResponse) => (
        <CopyContent
          content={rowData[PostProductKeys.SAP_CODE]}
          label={rowData[PostProductKeys.SAP_CODE]}
        />
      ),
    },
    {
      id: PostProductKeys.NAME,
      field: PostProductKeys.NAME,
      header: "Produto",
      sortable: true,
    },
    {
      id: PostProductKeys.CATEGORY,
      header: "Categoria",
      field: PostProductKeys.CATEGORY,
      body: (rowData: IGetProductResponse) => {
        const catValue = rowData[PostProductKeys.CATEGORY];
        const cat = categoryMap[catValue];
        return <Tag value={cat?.label || "Outros"} severity={cat?.severity} />;
      },
    },
    {
      id: "qty",
      header: "Estoque",
      sortable: true,
      field: PostProductKeys.QUANTITY,
      body: (rowData: IGetProductResponse) => {
        const qty = rowData[PostProductKeys.QUANTITY];
        const minQty = rowData[PostProductKeys.MIN_QUANTITY] ?? 0;

        return (
          <span className={qty <= minQty ? "text-red-500 font-bold" : ""}>
            {qty} un
          </span>
        );
      },
    },
    {
      id: PostProductKeys.UNIT_VAL,
      header: "Valor Unit.",
      sortable: true,
      field: PostProductKeys.UNIT_VAL,
      body: (rowData: IGetProductResponse) => (
        <span>
          {Number(rowData[PostProductKeys.UNIT_VAL]).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      body: (rowData: IGetProductResponse) => (
        <div className="flex gap-2">
          <Button
            permission={[UserRole.ADMIN]}
            isIconButton
            icon={ButtonIcon.EDIT}
            className="p-button-rounded p-button-info p-button-text"
            onClick={() => openEdit(rowData)}
          />
          <Button
            isIconButton
            icon={ButtonIcon.BUY}
            className="p-button-rounded p-button-success p-button-text"
            onClick={() => openPurchase(rowData)}
          />
        </div>
      ),
    },
  ];
};
