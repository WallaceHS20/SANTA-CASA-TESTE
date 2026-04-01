import { DataTable } from "@/components/DataTable";
import { useTransactions } from "./useTransactions";
import { ColumnsConfig } from "./ColumnsConfig";

export default function TransactionsPage() {
  const { data, page, limit, onPageChange } = useTransactions();

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4 bg-white p-3 border-round-xl shadow-1">
        <h4 className="m-0 text-primary font-bold">
          Histórico de Transações ({data?.meta?.total || 0})
        </h4>
      </div>

      <DataTable
        value={data?.data || []}
        columnsConfig={ColumnsConfig()}
        loading={!data}
        lazy
        paginator
        first={(page - 1) * limit}
        rows={limit}
        totalRecords={data?.meta?.total || 0}
        onPage={(e) => {
          onPageChange((e.page ?? 0) + 1, e.rows ?? 10);
        }}
      />
    </div>
  );
}
