import type { JSX } from "react";
import { Form, InputGroup, type FormControlProps } from "react-bootstrap";
import { ColTypeKey } from "../../Interfaces/Common";
import { Col } from "../Grid/Col";
import { Feedback } from "../Feedback";

export interface Props extends FormControlProps {
  id: string;
  name: string;
  label: string | JSX.Element;
  value?: string | number;
  placeholder?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  feedbackClassName?: string;
  isOptional?: boolean;
  leftIcon?: React.ReactNode;
  colType?: ColTypeKey;
}

export const BasicInputField = ({
  name,
  value,
  label,
  id,
  error,
  success,
  placeholder,
  className,
  labelClassName,
  inputClassName,
  feedbackClassName,
  colType,
  disabled = false,
  isOptional,
  leftIcon,
  ...rest
}: Props) => {
  const uniqueId = `field-${id}`;
  const feedbackMessage = !!success ? success : !!error ? error : undefined;

  const inputControl = (
    <Form.Control
      id={uniqueId}
      name={name}
      value={value}
      placeholder={placeholder}
      isValid={!!success}
      isInvalid={!!error}
      disabled={disabled}
      className={inputClassName}
      {...rest}
    />
  );

  return (
   <Col colType={colType || ColTypeKey.FORM} {...rest}>
      <Form.Group className={className}>
        <Form.Label htmlFor={uniqueId} className={labelClassName}>
          {label} {isOptional && <span className="text-muted">(Opcional)</span>}
        </Form.Label>

        {leftIcon ? (
          <InputGroup className="bg-transparent">
            <InputGroup.Text>{leftIcon}</InputGroup.Text>
            {inputControl}
          </InputGroup>
        ) : (
          inputControl
        )}

        <Feedback
          type={!!success ? "valid" : !!error ? "invalid" : "info"}
          className={feedbackClassName}
          message={feedbackMessage}
        />
      </Form.Group>
    </Col>
  );
};
