import { TransactionResponseKeys, TransactionTypeId, type IGetTransactionResponse } from "@/Interfaces/Transactions";
import { Button, ButtonVariant } from "@/components/Button";
import type { IColumnsConfig } from "@/components/DataTable";
import { Tag } from "primereact/tag";

// 🎯 Agora a função recebe o 'openDetails' como parâmetro!
export const ColumnsConfig = (openDetails: (data: IGetTransactionResponse) => void): IColumnsConfig[] => {
  return [
    {
      id: "actions",
      header: "Ações", // Mudei para Ações para ficar padrão
      body: (rowData: IGetTransactionResponse) => (
        <Button 
          icon="pi pi-eye" 
          variant={ButtonVariant.GHOST} 
          onClick={() => openDetails(rowData)} 
          isIconButton
        />
      )
    },
    {
      id: TransactionResponseKeys.ID,
      field: TransactionResponseKeys.ID,
      header: "ID",
      sortable: true,
    },
    {
      id: TransactionResponseKeys.TYPE,
      field: TransactionResponseKeys.TYPE,
      header: "Tipo",
      body: (rowData: any) => {
        const isEntry = rowData[TransactionResponseKeys.TYPE] === TransactionTypeId.ENTRY;
        return (
          <Tag 
            value={isEntry ? "Entrada" : "Saída"} 
            severity={isEntry ? "success" : "danger"} 
          />
        );
      }
    },
    {
      id: TransactionResponseKeys.DESCRIPTION,
      field: TransactionResponseKeys.DESCRIPTION,
      header: "Descrição",
    },
    {
      id: TransactionResponseKeys.TOTAL_AMOUNT,
      field: TransactionResponseKeys.TOTAL_AMOUNT,
      header: "Valor Total",
      body: (rowData: any) => (
        <span className="font-bold text-primary">
          {Number(rowData[TransactionResponseKeys.TOTAL_AMOUNT]).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      ),
    },
    {
      id: TransactionResponseKeys.CREATED_AT,
      field: TransactionResponseKeys.CREATED_AT,
      header: "Data",
      body: (rowData: any) => (
        <span>
          {new Date(rowData[TransactionResponseKeys.CREATED_AT]).toLocaleDateString("pt-BR", {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'
          })}
        </span>
      ),
    }
  ];
};