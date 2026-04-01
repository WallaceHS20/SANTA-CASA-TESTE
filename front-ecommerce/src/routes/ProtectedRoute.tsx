import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserKeys, type UserRole } from "../Interfaces/Auth";
import { PageRoutesKeys } from "../Interfaces/Routes";
import { useAuthContext } from "../contexts/Auth";
import { useNotificationContext } from "../contexts/Notification";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { signed, user } = useAuthContext();
  const { showToast } = useNotificationContext();

  useEffect(() => {
    if (signed && user && !allowedRoles.includes(user[UserKeys.ROLE])) {
      showToast(
        "warn",
        "Acesso Negado",
        "Você não tem permissão para acessar esta área.",
      );
    }
  }, [signed, user, allowedRoles, showToast]);

  if (!signed) {
    return <Navigate to={PageRoutesKeys.LOGIN} replace />;
  }

  if (user && !allowedRoles.includes(user[UserKeys.ROLE])) {
    return <Navigate to={PageRoutesKeys.DASHBOARD} replace />;
  }

  return <Outlet />;
}
