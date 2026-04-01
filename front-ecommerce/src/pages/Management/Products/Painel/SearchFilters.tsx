import { BasicInputField } from "@/components/FormFields/BasicInputField";
import { SearchFilterHeader } from "@/components/SearchFilterHeader";
import { type THandleSetFieldProps } from "@/Interfaces/Common";
import {
  GetProductParamsKeys,
  type IGetProductParams,
} from "@/Interfaces/Products";
import { BasicSelectField } from "@/components/FormFields/BasicSelectField";
import { categoryOptions } from "@/constants/Routes/products";

interface Props {
  form: IGetProductParams;
  handleSetField: (event: THandleSetFieldProps) => void;
  onClear: () => void;
  onSubmit: () => void;
}

export const SearchFilters = ({
  form,
  handleSetField,
  onClear,
  onSubmit,
}: Props) => {
  return (
    <SearchFilterHeader onClear={onClear} onSearch={onSubmit}>
      <div className="col-12 md:col-3">
        <BasicInputField
          id={GetProductParamsKeys.NAME}
          name={GetProductParamsKeys.NAME}
          label="Nome do Produto"
          value={form[GetProductParamsKeys.NAME]}
          onChange={handleSetField}
          placeholder="Nome do produto"
        />
      </div>

      <div className="col-12 md:col-3">
        <BasicInputField
          id={GetProductParamsKeys.SAP_CODE}
          name={GetProductParamsKeys.SAP_CODE}
          label="Código SAP"
          value={form[GetProductParamsKeys.SAP_CODE]}
          onChange={handleSetField}
          placeholder="Código SAP"
        />
      </div>

      <div className="col-12 md:col-3">
        <BasicSelectField
          id={GetProductParamsKeys.CATEGORY}
          name={GetProductParamsKeys.CATEGORY}
          label="Categoria"
          options={categoryOptions}
          value={form[GetProductParamsKeys.CATEGORY]}
          handleSetField={handleSetField}
        />
      </div>

    </SearchFilterHeader>
  );
};
