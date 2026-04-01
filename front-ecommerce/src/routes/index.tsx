import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { SYSTEM_ROUTES } from "../constants/Routes/routes";
import { BaseRouteKey, PageRoutesKeys, SectionKeys } from "../Interfaces/Routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "@/components/Layout";

const PageLoader = () => (
  <div className="flex justify-content-center align-items-center h-full p-4">
    <i className="pi pi-spin pi-spinner text-primary text-4xl"></i>
  </div>
);

const Loadable = (Component: React.LazyExoticComponent<any>) => (props: any) => (
  <Suspense fallback={<PageLoader />}>
    <Component {...props} />
  </Suspense>
);

const Login = Loadable(lazy(() => import('@/pages/Login')));
const ProductsPainel = Loadable(lazy(() => import('@/pages/Management/Products/Painel')));
const TransactionList = Loadable(lazy(() => import('@/pages/Management/Transactions')));
const CustomerList = Loadable(lazy(() => import('@/pages/Management/Customer')));

export const router = createBrowserRouter([
  {
    path: PageRoutesKeys.LOGIN,
    element: <Login />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        element: (
          <ProtectedRoute
            allowedRoles={SYSTEM_ROUTES[SectionKeys.MANAGEMENT].DASHBOARD[BaseRouteKey.ROLE]}
          />
        ),
        children: [
          { 
            path: PageRoutesKeys.DASHBOARD, 
            element: <ProductsPainel /> 
          },
        ],
      },
      {
        element: (
          <ProtectedRoute
            allowedRoles={SYSTEM_ROUTES[SectionKeys.MANAGEMENT].CUSTOMERS[BaseRouteKey.ROLE]}
          />
        ),
        children: [
          {
            path: PageRoutesKeys.CUSTOMER_LIST,
            element: <CustomerList/>,
          },
        ],
      },
      {
        element: (
          <ProtectedRoute
            allowedRoles={SYSTEM_ROUTES[SectionKeys.TRANSACTIONS].HISTORY[BaseRouteKey.ROLE]}
          />
        ),
        children: [
          {
            path: PageRoutesKeys.TRANSACTION_LIST,
            element: <TransactionList />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={PageRoutesKeys.DASHBOARD} replace />,
  },
]);