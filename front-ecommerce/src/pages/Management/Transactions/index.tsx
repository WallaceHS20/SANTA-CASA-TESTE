import { DataTable } from "@/components/DataTable";
import { useTransactions } from "./useTransactions";
import { ColumnsConfig } from "./ColumnsConfig";
import { TransactionDetailModal } from "./TransactionDetailModal";

export default function TransactionsPage() {
  const {
    data,
    form,
    onPageChange,
    // 🎯 Estados do Modal que vêm do seu hook:
    isDetailOpen,
    closeDetails,
    selectedTransaction,
    openDetails,
  } = useTransactions();

  // Facilitadores para a paginação vindos do form
  const page = form.page ?? 1;
  const limit = form.limit ?? 10;

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4 bg-white p-3 border-round-xl shadow-1">
        <h4 className="m-0 text-primary font-bold">
          Histórico de Transações ({data?.meta?.total || 0})
        </h4>
      </div>

      <DataTable
        value={data?.data || []}
        // 🎯 Passando a função openDetails para as colunas!
        columnsConfig={ColumnsConfig(openDetails)}
        loading={!data}
        lazy
        paginator
        // Cálculo do 'first' baseado no padrão do PrimeReact (zero-indexed)
        first={(page - 1) * limit}
        rows={limit}
        totalRecords={data?.meta?.total || 0}
        onPage={(e) => {
          onPageChange((e.page ?? 0) + 1, e.rows ?? 10);
        }}
      />

      {/* 🎯 Modal de Detalhes com os estados corretos */}
      <TransactionDetailModal 
        visible={isDetailOpen} 
        onHide={closeDetails} 
        transaction={selectedTransaction} 
      />
    </div>
  );
}