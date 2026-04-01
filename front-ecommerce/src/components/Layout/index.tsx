import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { getVisibleRoutes } from "@/constants/Routes/routes";
import { UserKeys, UserRole } from "@/Interfaces/Auth";
import { Button, ButtonVariant, ButtonSeverity } from "@/components/Button";
import { useAuthContext } from "@/contexts/Auth";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar"; // Usado para o menu mobile

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  const userRole = user?.[UserKeys.ROLE] || UserRole.CUSTOMER;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuSections = getVisibleRoutes(userRole);

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };

  // Extraí a renderização dos links para reutilizar no desktop e mobile
  const renderNavLinks = () => (
    <nav className="p-3 flex flex-column gap-4">
      {menuSections.map((sectionConfig) => (
        <div key={sectionConfig.section}>
          <span className="text-xs text-500 font-bold uppercase ml-2 mb-2 block">
            {sectionConfig.section}
          </span>
          <div className="flex flex-column gap-2">
            {sectionConfig.routes.map((route: any) => {
              const isActive = location.pathname === route.path;
              return (
                <button
                  key={route.path}
                  onClick={() => {
                    navigate(route.path);
                    setMobileMenuOpen(false); // Fecha o menu mobile ao clicar
                  }}
                  className={`p-3 border-round-md border-none cursor-pointer text-left font-medium transition-colors transition-duration-200 flex align-items-center gap-3
                    ${isActive 
                      ? 'bg-primary text-primary' 
                      : 'bg-transparent text-700 hover:bg-gray-200'
                    }`}
                >
                  <i className={`${route.icon} text-lg`}></i>
                  {route.title}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* 🟢 SIDEBAR DESKTOP (Some no mobile: hidden md:flex) */}
      <aside className="hidden md:flex flex-column w-18rem bg-white shadow-2 justify-content-between z-2">
        <div>
          <div className="p-4 flex align-items-center justify-content-center border-bottom-1 border-300">
            <h2 className="m-0 text-primary font-bold">
              E-Pharma
            </h2>
          </div>
          {renderNavLinks()}
        </div>
        <div className="p-3 border-top-1 border-300">
          <Button 
            label="Sair" 
            icon="pi pi-sign-out" 
            variant={ButtonVariant.OUTLINED}
            severity={ButtonSeverity.DANGER}
            className="w-full"
            onClick={handleLogout}
          />
        </div>
      </aside>

      {/* 🟢 SIDEBAR MOBILE (PrimeReact Sidebar) */}
      <Sidebar 
        visible={mobileMenuOpen} 
        onHide={() => setMobileMenuOpen(false)} 
        className="p-0"
      >
        <div className="flex flex-column h-full justify-content-between">
            <div>
              <div className="p-4 border-bottom-1 border-300">
                <h2 className="m-0 text-primary font-bold">
                  E-Pharma
                </h2>
              </div>
              {renderNavLinks()}
            </div>
            <div className="p-3 border-top-1 border-300">
              <Button 
                label="Sair" 
                icon="pi pi-sign-out" 
                variant={ButtonVariant.OUTLINED}
                severity={ButtonSeverity.DANGER}
                className="w-full"
                onClick={handleLogout}
              />
            </div>
        </div>
      </Sidebar>

      {/* 🟢 ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-column overflow-hidden w-full">
        
        {/* TOPBAR */}
        <header className="bg-white p-3 shadow-1 flex justify-content-between md:justify-content-end align-items-center h-4rem z-1">
           {/* Botão Hambúrguer (Só aparece no mobile: flex md:hidden) */}
           <div className="flex md:hidden">
             <Button 
               icon="pi pi-bars" 
               onClick={() => setMobileMenuOpen(true)}
               isIconButton
             />
           </div>

           <div className="flex align-items-center gap-2">
              <span className="pi pi-user text-primary bg-blue-50 p-2 border-round-circle"></span>
              <span className="font-medium text-700 hidden sm:block">
                Olá, {user?.name || "Usuário"}
              </span>
           </div>
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 overflow-auto p-2 md:p-4">
          <Outlet />
        </div>
      </main>

    </div>
  );
};