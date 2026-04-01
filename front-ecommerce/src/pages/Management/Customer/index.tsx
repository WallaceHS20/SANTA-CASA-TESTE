import { DataTable } from "@/components/DataTable";
import { Button, ButtonIcon } from "@/components/Button";
import { ColumnsConfig } from "./ColumnsConfig";
import { CustomerFormModal } from "./CustomerModal"; // Verifique se o caminho do import está certinho!
import { useCustomers } from "./useCustomers";

export default function CustomersPage() {
  const {
    data,
    page,
    limit,
    isLoading,
    onPageChange,
    onDelete,
    onSave,
    customerModal,
  } = useCustomers();

  return (
    <div className="p-4 flex flex-column h-full">
      <div className="flex justify-content-between align-items-center mb-4 bg-white p-3 border-round-xl shadow-1">
        <h4 className="m-0 text-primary font-bold">
          Gestão de Clientes ({data?.meta?.total || 0})
        </h4>
        <Button
          label="Novo Cliente"
          icon={ButtonIcon.ADD}
          onClick={() => customerModal.openModal()}
        />
      </div>

      <DataTable
        value={data?.data || []}
        columnsConfig={ColumnsConfig(customerModal.openModal, onDelete)}
        loading={isLoading}
        lazy
        paginator
        first={(page - 1) * limit}
        rows={limit}
        totalRecords={data?.meta?.total || 0}
        onPage={(e) => {
          onPageChange((e.page ?? 0) + 1, e.rows ?? 10);
        }}
      />

      <CustomerFormModal
        visible={customerModal.isOpen}
        onHide={customerModal.closeModal}
        isEditing={!!customerModal.editingCustomer}
        form={customerModal.form}
        formError={customerModal.formError}
        onChange={customerModal.handleSetField}
        onSave={onSave}
      />
    </div>
  );
}
