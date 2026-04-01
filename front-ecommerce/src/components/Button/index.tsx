import {
  Button as BsButton,
  type ButtonProps as BsButtonProps,
} from "react-bootstrap";
import { useAuthContext } from "@/contexts/Auth";
import { UserKeys, type UserRole } from "@/Interfaces/Auth";

export enum ButtonSeverity {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
  DARK = "dark",
  LIGHT = "light",
}

export enum ButtonVariant {
  SOLID = "solid",
  OUTLINED = "outlined",
  LINK = "link",
  GHOST = "ghost", // Equivalente ao 'text' do Prime
}

export enum ButtonIcon {
  LOGIN = "pi pi-sign-in",
  LOGOUT = "pi pi-sign-out",
  SAVE = "pi pi-check",
  DELETE = "pi pi-trash",
  EDIT = "pi pi-pencil",
  ADD = "pi pi-plus",
  SEARCH = "pi pi-search",
  COPY = "pi pi-copy",
  BUY = "pi pi-shopping-cart"
}

interface CustomButtonProps extends Omit<BsButtonProps, "variant"> {
  label?: string;
  icon?: ButtonIcon | string;
  severity?: ButtonSeverity;
  variant?: ButtonVariant;
  permission?: UserRole[];
  isIconButton?: boolean;
}

export function Button({
  label,
  icon,
  severity = ButtonSeverity.PRIMARY,
  variant = ButtonVariant.SOLID,
  permission,
  isIconButton = false,
  className = "",
  children,
  ...props
}: CustomButtonProps) {
  const { user } = useAuthContext();

  if (permission && user && !permission.includes(user[UserKeys.ROLE])) {
    return null;
  }

  const getVariant = () => {
    if (variant === ButtonVariant.LINK) return "link";
    if (variant === ButtonVariant.GHOST) return "ghost"; // Criaremos classe CSS se necessário

    const prefix = variant === ButtonVariant.OUTLINED ? "outline-" : "";
    return `${prefix}${severity}`;
  };

  return (
    <BsButton
      variant={variant === ButtonVariant.GHOST ? undefined : getVariant()}
      className={`
        ${className} 
        ${variant === ButtonVariant.GHOST ? "bg-transparent border-none shadow-none p-1 text-primary" : "shadow-sm"}
        ${isIconButton ? "rounded-circle p-2 d-flex align-items-center justify-content-center" : "font-bold"}
        d-inline-flex align-items-center gap-2
      `}
      {...props}
    >
      {icon && (
        <i
          className={icon}
          style={{ fontSize: isIconButton ? "1.2rem" : "1rem" }}
        />
      )}

      {!isIconButton && (label || children)}
    </BsButton>
  );
}
