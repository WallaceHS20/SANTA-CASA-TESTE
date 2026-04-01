import { useState, type JSX } from "react";
import {
  Form,
  InputGroup,
  Button,
  type FormControlProps,
} from "react-bootstrap";
import { ColTypeKey } from "../../Interfaces/Common";
import { Col } from "../Grid/Col";
import { Feedback } from "../Feedback";

export interface PasswordProps extends FormControlProps {
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

export const PasswordInputField = ({
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
}: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const uniqueId = `password-field-${id}`;
  const feedbackMessage = !!success ? success : !!error ? error : undefined;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Col colType={colType || ColTypeKey.FORM}>
      <Form.Group className={className}>
        <Form.Label htmlFor={uniqueId} className={labelClassName}>
          {label} {isOptional && <span className="text-muted">(Opcional)</span>}
        </Form.Label>

        <InputGroup className="bg-transparent">
          {leftIcon && <InputGroup.Text>{leftIcon}</InputGroup.Text>}

          <Form.Control
            {...rest}
            id={uniqueId}
            name={name}
            type={showPassword ? "text" : "password"}
            value={value}
            placeholder={placeholder}
            isValid={!!success}
            isInvalid={!!error}
            disabled={disabled}
            className={`${inputClassName} border-end-0`}
          />

          <Button
            variant="outline-secondary"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            className="bg-white border-start-0 py-0 px-3"
            style={{
              borderColor: !!error
                ? "#dc3545"
                : !!success
                  ? "#198754"
                  : "#dee2e6",
              zIndex: 4,
            }}
          >
            <i
              className={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
              style={{ fontSize: "1.1rem" }}
            ></i>
          </Button>
        </InputGroup>

        <Feedback
          type={!!success ? "valid" : !!error ? "invalid" : "info"}
          className={feedbackClassName}
          message={feedbackMessage}
        />
      </Form.Group>
    </Col>
  );
};
