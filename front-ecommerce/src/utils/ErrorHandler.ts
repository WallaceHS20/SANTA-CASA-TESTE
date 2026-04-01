import { useNotificationContext } from "@/contexts/Notification";

export function useError() {
  const { showToast } = useNotificationContext();

  const handleError = (title: string, error: any) => {
    const data = error?.response?.data;
    
    const backendMessage = data?.error || data?.message;
    
    const message = Array.isArray(backendMessage) 
      ? backendMessage[0] 
      : backendMessage || error?.message || "Erro inesperado no servidor";

    showToast("error", title, message);
  };

  return { handleError };
}