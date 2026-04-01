import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { SearchFilters } from "./SearchFilters";
import { useForm } from "./useForm";
import { ColumnsConfig } from "./ColumnsConfig";
import { ProductCardView } from "./ProductCardView";
import {
  Button,
  ButtonSeverity,
  ButtonVariant,
  ButtonIcon,
} from "@/components/Button";
import { ProductFormModal } from "./ProductModal";
import { PurchaseFormModal } from "./PurchaseFormModal";

export default function PainelShop() {
  const {
    form,
    handleSetField,
    onClear,
    onSubmit,
    data,
    onPageChange,
    isOpen,
    editingProduct,
    openAdd,
    openEdit,
    close,
    onSave,
    isPurchaseOpen,
    selectedProduct,
    purchaseForm,
    handleSetPurchaseField,
    closePurchase,
    onConfirmPurchase,
    openPurchase
  } = useForm();

  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  return (
    <div className="p-4">
      <div className="flex justify-content-end mb-3">
        <Button
          label="Novo Produto"
          icon={ButtonIcon.ADD}
          severity={ButtonSeverity.SUCCESS}
          onClick={openAdd}
        />
      </div>

      <SearchFilters
        form={form}
        handleSetField={handleSetField}
        onClear={onClear}
        onSubmit={onSubmit}
      />

      <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 border-round-xl shadow-1">
        <h5 className="m-0 text-secondary">
          Resultados ({data?.meta?.total || 0})
        </h5>

        <div className="d-flex gap-2">
          <Button
            icon="pi pi-table"
            variant={
              viewMode === "table"
                ? ButtonVariant.SOLID
                : ButtonVariant.OUTLINED
            }
            severity={ButtonSeverity.PRIMARY}
            onClick={() => setViewMode("table")}
            isIconButton
          />
          <Button
            icon="pi pi-th-large"
            variant={
              viewMode === "cards"
                ? ButtonVariant.SOLID
                : ButtonVariant.OUTLINED
            }
            severity={ButtonSeverity.PRIMARY}
            onClick={() => setViewMode("cards")}
            isIconButton
          />
        </div>
      </div>

      {data &&
        (viewMode === "table" ? (
          <DataTable
            value={data?.data || []}
            columnsConfig={ColumnsConfig(openEdit, openPurchase)}
            loading={!data}
            lazy
            paginator
            first={((form.page ?? 1) - 1) * (form.limit ?? 10)}
            rows={form.limit ?? 10}
            totalRecords={data?.meta?.total || 0}
            onPage={(e) => {
              onPageChange((e.page ?? 0) + 1, e.rows ?? 10);
            }}
          />
        ) : (
          <ProductCardView
            products={data.data}
            onEdit={openEdit}
            openPurchase={openPurchase}
          />
        ))}

      <ProductFormModal
        visible={isOpen}
        product={editingProduct}
        onHide={close}
        onSave={onSave}
      />

      <PurchaseFormModal
        visible={isPurchaseOpen}
        product={selectedProduct}
        form={purchaseForm}
        onChange={handleSetPurchaseField}
        onConfirm={onConfirmPurchase}
        onHide={closePurchase}
      />
    </div>
  );
}
