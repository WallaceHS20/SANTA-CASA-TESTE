import { Dropdown, type DropdownProps } from 'primereact/dropdown';
import { Form } from "react-bootstrap";
import { ColTypeKey, type THandleSetFieldProps } from "../../Interfaces/Common";
import { Col } from "../Grid/Col";
import { Feedback } from "../Feedback";

interface Props extends Omit<DropdownProps, 'onChange'> {
  id: string;
  name: string;
  label: string;
  error?: string;
  colType?: ColTypeKey;
  handleSetField: (event: THandleSetFieldProps) => void
}

export const BasicSelectField = ({
  id, name, label, error, colType, options, value, handleSetField, placeholder, ...rest
}: Props) => {
  const uniqueId = `select-${id}`;

  return (
    <Col colType={colType || ColTypeKey.FORM}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor={uniqueId}>{label}</Form.Label>
        
        <Dropdown
          id={uniqueId}
          name={name}
          value={value}
          options={options}
          onChange={handleSetField}
          placeholder={placeholder || "Selecione..."}
          className={`w-full ${error ? 'p-invalid' : ''}`}
          {...rest}
        />

        <Feedback type="invalid" message={error} />
      </Form.Group>
    </Col>
  );
};