import { useNotificationContext } from "@/contexts/Notification";
import { Button, ButtonIcon, ButtonVariant } from "../Button"; // Assumindo que você tem essas definições
import { Tooltip } from "primereact/tooltip";

interface CopyContentProps {
  content: string;
  label?: string;
}

export const CopyContent = ({ content, label }: CopyContentProps) => {
  const { showToast } = useNotificationContext();
  const tooltipId = `copy-tip-${content.replace(/\s+/g, "-")}`;
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(content);
      showToast("info", "Copiado", `Conteúdo: ${content}`);
    } catch (err) {
      showToast("error", "Erro", "Não foi possível copiar.");
    }
  };

  return (
    <div className="flex align-items-center gap-2">
      {label && <span className="font-mono text-sm">{label}</span>}

      {/* Tooltip isolado */}
      <Tooltip target={`.${tooltipId}`} content="Copiar" position="top" />

      {/* O Ícone Simples */}
      <i
        className={`${tooltipId} pi pi-copy cursor-pointer text-primary hover:text-blue-800 transition-colors transition-duration-200 p-1`}
        onClick={handleCopy}
        style={{ fontSize: "1.1rem" }}
      />
    </div>
  );
};
