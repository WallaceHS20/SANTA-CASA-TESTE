import { UserRole } from "../../Interfaces/Auth";
import {
  BaseRouteKey,
  PageRoutesKeys,
  SectionKeys,
  type IRouteDefinition,
} from "../../Interfaces/Routes";

type SystemRoutesMap = {
  [key in SectionKeys]: Record<string, IRouteDefinition>;
};

export const getVisibleRoutes = (role: UserRole) => {
  const sections = [SectionKeys.MANAGEMENT, SectionKeys.TRANSACTIONS];

  return sections
    .map((section) => {
      const routes = Object.values(SYSTEM_ROUTES[section]).filter(
        (route) =>
          route[BaseRouteKey.ROLE].includes(role) && route[BaseRouteKey.ICON],
      );

      return { section, routes };
    })
    .filter((s) => s.routes.length > 0);
};

export const SYSTEM_ROUTES: SystemRoutesMap = {
  [SectionKeys.AUTH]: {
    LOGIN: {
      path: PageRoutesKeys.LOGIN,
      title: "Entrar no Sistema",
      role: [UserRole.ADMIN, UserRole.CUSTOMER],
    },
  },

  [SectionKeys.MANAGEMENT]: {
    DASHBOARD: {
      path: PageRoutesKeys.DASHBOARD,
      title: "Gestão de Produtos",
      role: [UserRole.ADMIN, UserRole.CUSTOMER],
      icon: "pi pi-home",
    },
    CUSTOMERS: {
      path: PageRoutesKeys.CUSTOMER_LIST,
      title: "Clientes Hospitalares",
      role: [UserRole.ADMIN,],
      icon: "pi pi-users",
    },
  },

  [SectionKeys.TRANSACTIONS]: {
    HISTORY: {
      path: PageRoutesKeys.TRANSACTION_LIST,
      title: "Histórico de Vendas",
      role: [UserRole.ADMIN, UserRole.CUSTOMER],
      icon: "pi pi-list",
    },
  },
};
