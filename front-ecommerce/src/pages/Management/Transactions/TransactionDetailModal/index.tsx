import { Dialog } from 'primereact/dialog';
import { Masks } from '@/utils/Masks';
import { CustomerResponseKeys, TransactionResponseKeys, type IGetTransactionResponse } from '@/Interfaces/Transactions';

interface Props {
  visible: boolean;
  onHide: () => void;
  transaction: IGetTransactionResponse | null;
}

export const TransactionDetailModal = ({ visible, onHide, transaction }: Props) => {
  if (!transaction) return null;

  const steps = [
    { label: 'Pedido', icon: 'pi pi-shopping-cart', status: 'done' },
    { label: 'Processando', icon: 'pi pi-cog', status: 'done' },
    { label: 'Em Trânsito', icon: 'pi pi-truck', status: 'active' },
    { label: 'Entregue', icon: 'pi pi-check-circle', status: 'waiting' },
  ];

  return (
    <Dialog 
      header={`Detalhes da Transação #${transaction[TransactionResponseKeys.ID]}`} 
      visible={visible} 
      onHide={onHide}
      style={{ width: '50vw' }}
      modal
      dismissableMask
    >
      {/* 🚚 STATUS DE ENTREGA COM CSS CUSTOMIZADO */}
      <div className="p-4 mb-4 border-round-xl border-1 surface-border surface-card">
        <span className="text-center block font-bold text-600 mb-4 uppercase text-xs tracking-widest">
          Acompanhamento do Pedido
        </span>

        <div className="freight-tracker">
          <div className="freight-line"></div>
          
          {steps.map((step, index) => (
            <div key={index} className={`step-item ${step.status}`}>
              <div className="step-circle">
                <i className={step.icon}></i>
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ajuste no Valor Total para usar classe padrão */}
      <div className="grid">
        {/* ... (resto do seu código de colunas) ... */}
        
        <div className="col-12 mt-4 flex justify-content-between align-items-center bg-blue-50 p-4 border-round-lg">
          <span className="text-xl font-bold text-blue-700">VALOR TOTAL:</span>
          <span className="text-3xl font-bold text-blue-800">
            {Masks.currency(transaction[TransactionResponseKeys.TOTAL_AMOUNT])}
          </span>
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6">
          <label className="text-sm text-500 font-bold block mb-1">Cliente / Destinatário</label>
          <span className="text-900 font-medium block">
            {transaction[TransactionResponseKeys.CUSTOMER]?.[CustomerResponseKeys.CUSTOMER_NAME] || 'Consumidor Final'}
          </span>
        </div>
        <div className="col-12 md:col-6">
          <label className="text-sm text-500 font-bold block mb-1">Data da Operação</label>
          <span className="text-900 font-medium block">
             {new Date(transaction[TransactionResponseKeys.CREATED_AT]).toLocaleString('pt-BR')}
          </span>
        </div>

        <div className="col-12 mt-4">
          <label className="text-sm text-500 font-bold block mb-2 uppercase">Itens do Pedido</label>
          <div className="border-1 border-200 border-round-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-sm text-700">Produto</th>
                  <th className="p-3 text-sm text-700 text-center">Qtd</th>
                  <th className="p-3 text-sm text-700 text-right">Unitário</th>
                  <th className="p-3 text-sm text-700 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>

                {transaction.items?.map((item: any, idx: number) => (
                  <tr key={idx} className="border-top-1 border-200">
                    <td className="p-3 text-sm text-800">{item.product.product_name}</td>
                    <td className="p-3 text-sm text-800 text-center">{item.quantity}</td>
                    <td className="p-3 text-sm text-800 text-right">{Masks.currency(item.unit_price)}</td>
                    <td className="p-3 text-sm font-bold text-800 text-right">
                      {Masks.currency(item.quantity * item.unit_price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-12 mt-4 flex justify-content-between align-items-center bg-primary-faded p-3 border-round-lg">
          <span className="text-xl font-bold text-primary">VALOR TOTAL:</span>
          <span className="text-3xl font-bold text-primary">
            {Masks.currency(transaction[TransactionResponseKeys.TOTAL_AMOUNT])}
          </span>
        </div>
      </div>
    </Dialog>
  );
};