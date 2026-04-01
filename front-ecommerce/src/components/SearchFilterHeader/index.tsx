import type { ReactNode } from "react";
import { Button, ButtonIcon, ButtonSeverity, ButtonVariant } from "../Button";

interface SearchFilterHeaderProps {
  children: ReactNode;
  onSearch: () => void;
  onClear: () => void;
}

export const SearchFilterHeader = ({
  children,
  onSearch,
  onClear,
}: SearchFilterHeaderProps) => {
  return (
    <div className="bg-white p-4 border-round-xl shadow-1 mb-4">
      <div className="grid">{children}</div>

      <div className="flex flex-column md:flex-row md:justify-content-end gap-2 mt-4">
        <Button
          label="Limpar Filtros"
          icon={ButtonIcon.DELETE}
          severity={ButtonSeverity.DANGER}
          variant={ButtonVariant.OUTLINED}
          onClick={onClear}
          className="w-full md:w-auto"
        />

        <Button
          label="Pesquisar"
          icon={ButtonIcon.SEARCH}
          severity={ButtonSeverity.PRIMARY}
          onClick={onSearch}
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
};
