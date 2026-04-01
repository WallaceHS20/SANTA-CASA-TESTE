import { 
  DataTable as PrDataTable, 
  type DataTableProps as PrDataTableProps 
} from 'primereact/datatable';
import { Column, type ColumnProps } from 'primereact/column';

// 1. Mudamos aqui: removi a 'key' da interface para evitar conflito no spread
export interface IColumnsConfig extends ColumnProps {
  id: string; // Usaremos 'id' em vez de 'key' para identificar a coluna
}

// 2. Adicionamos 'extends any' ou 'extends object' para o TS aceitar o array
{/* @ts-ignore */}
interface CustomDataTableProps<T extends any> extends Omit<PrDataTableProps<T[]>, 'value'> {
  value: T[];
  columnsConfig: IColumnsConfig[];
  loading?: boolean;
}

export function DataTable<T extends any>({
  value,
  columnsConfig,
  loading = false,
  className = "",
  ...props
}: CustomDataTableProps<T>) {
  return (
    <div className={`card shadow-1 border-round-xl overflow-hidden ${className}`}>
        {/* @ts-ignore */}
      <PrDataTable
        value={value as any[]} // Fazemos esse cast para silenciar a sobrecarga do Prime
        loading={loading}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}
        emptyMessage="Nenhum registro encontrado."
        stripedRows
        removableSort
        pt={{
            header: { className: 'bg-white border-none p-4' },
            wrapper: { className: 'border-none' }
        }}
        {...props}
      >
        {columnsConfig.map((col) => {
          // Desestruturamos para tirar o 'id' e não passar ele para o componente Column
          const { id, ...columnProps } = col;
          return (
            <Column 
              key={id} // A key do React fica aqui separada
              {...columnProps} // O resto das props da coluna (field, header, body...)
            />
          );
        })}
      </PrDataTable>
    </div>
  );
}