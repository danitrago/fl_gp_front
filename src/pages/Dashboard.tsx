import React, { useContext } from "react";
import DashButtonBig from "../components/DashButtonBig";
import UserContext from "../contexts/userContext";
import DashboardTemplate from "../templates/DashboardTemplate";
import Title from "../ui-components/Title/Title";

const Dashboard = () => {
  const { role } = useContext(UserContext);
  const options = [
    {
      id: 1,
      label: "Nueva Solicitud",
      link: "/request",
      icon: "plus-circle",
      roles: ["Líder"],
    },
    {
      id: 2,
      label: "Mis Solicitudes",
      link: "/my-requests",
      icon: "list",
      roles: ["Líder"],
    },
    {
      id: 3,
      label: "Mis Pendientes",
      link: "/my-tasks",
      icon: "briefcase",
      roles: ["Líder", "Interventor"],
    },
    {
      id: 4,
      label: "Solicitudes",
      link: "/requests-center",
      icon: "list",
      roles: ["Administrador"],
    },
    {
      id: 5,
      label: "Usuarios",
      link: "https://comfamaadm.sharepoint.com/sites/FL_001_GestindeProveedoresTI/Lists/Usuarios/AllItems.aspx",
      icon: "users",
      roles: ["Administrador"],
      external: true,
    },
  ];
  const optionsByRole = (userRole: string) => {
    return options.filter((option) => option.roles.includes(userRole));
  };

  return (
    <DashboardTemplate>
      <div className="animate__animated animate__fadeIn grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center pr-10">
          <Title variant="h2">Bienvenido al,</Title>
          <Title variant="h1" color="dark">
            Flujo de gestión solicitudes, recursos y/o servicios Contratos
            Tecnología
          </Title>
          <p>
            Permite solicitar y administrar de forma centralizada las
            solicitudes de recursos y cotizaciones a proveedores de tecnología.
          </p>
        </div>

        <div className="my-4 grid gap-4 grid-cols-2 lg:grid-cols-3">
          {optionsByRole(role).map((option) => (
            <DashButtonBig
              key={option.id}
              label={option.label}
              link={option.link}
              icon={option.icon}
              external={option.external}
            />
          ))}
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default Dashboard;
