import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes"; 
import { NotificationProvider } from "./contexts/Notification";
import { AuthProvider } from "./contexts/Auth";

import "bootstrap/dist/css/bootstrap.min.css"; 
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css"; 
import "primeflex/primeflex.css"; 
import "./styles/global.css"; 

createRoot(document.getElementById("root")!).render(
  <NotificationProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </NotificationProvider>,
);
