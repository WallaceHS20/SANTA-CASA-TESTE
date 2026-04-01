import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";

interface Props {
  showToast: (
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string,
  ) => void;
  Loading: {
    show: (message?: string) => void;
    hide: () => void;
  };
}

const NotificationContext = createContext<Props>({} as Props);

interface NotificationProviderProps {
  children: ReactNode;
}

const defaultMessage = "Carregando...";

export function NotificationProvider({ children }: NotificationProviderProps) {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(defaultMessage); // Mudamos para State

  const Loading = {
    show: (msg?: string) => {
      setMessage(msg || defaultMessage);
      setLoading(true);
    },
    hide: () => {
      setLoading(false);
    },
  };

  const showToast = (severity: "success" | "info" | "warn" | "error", summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  return (
    <NotificationContext.Provider value={{ Loading, showToast }}>
      <Toast ref={toast} position="top-right" />
      
      <Dialog
        visible={loading}
        onHide={() => {}}
        closable={false}
        showHeader={false}
        // Removemos o estilo inline e usamos a classe customizada
        maskClassName="glass-morphism-mask" 
        pt={{
          root: { className: 'border-none bg-transparent shadow-none' },
          content: { className: 'bg-transparent p-0 overflow-hidden' }
        }}
      >
        <div className="flex flex-column align-items-center loading-container">
          <ProgressSpinner
            style={{ width: "60px", height: "60px" }}
            strokeWidth="4"
            fill="transparent"
            animationDuration=".8s"
          />
          <span className="text-white mt-4 font-medium text-xl tracking-wider uppercase">
            {message}
          </span>
        </div>
      </Dialog>

      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext deve ser usado dentro de um NotificationProvider",
    );
  }
  return context;
};
