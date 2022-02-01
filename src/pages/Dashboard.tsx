import React, { useContext } from "react";
import DashButtonBig from "../components/DashButtonBig";
import UserContext from "../contexts/userContext";
import DashboardTemplate from "../templates/DashboardTemplate";
import Title from "../ui-components/Title/Title";

const Dashboard = () => {
  const { role } = useContext(UserContext);
  const options = [
    {
      label: "Nueva Solicitud",
      link: "/request",
      icon: "plus-circle",
      roles: ["leader"],
    },
    {
      label: "Mis Solicitudes",
      link: "/my-requests",
      icon: "list",
      roles: ["leader"],
    },
    {
      label: "Mis Pendientes",
      link: "/pendings",
      icon: "briefcase",
      roles: ["controller"],
    },
    {
      label: "Lista Interventores",
      link: "https://comfamaadm.sharepoint.com/sites/AutoFLujos/Lists/FL_GL_004_Lista_Interventor/AllItems.aspx?viewpath=%2Fsites%2FAutoFLujos%2FLists%2FFL%5FGL%5F004%5FLista%5FInterventor%2FAllItems%2Easpx",
      icon: "users",
      roles: ["admin"],
      external: true,
    },
  ];
  const optionsByRole = (userRole: string) => {
    return options.filter((option) => option.roles.includes(userRole));
  };

  return (
    <DashboardTemplate>
      <div className="animate__animated animate__fadeIn grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <Title variant="h2">Bienvenido al,</Title>
          <Title variant="h1" color="dark">
            Flujo de Gestión de Proveedores
          </Title>
          <p>
            Anim anim esse eu in labore irure nostrud dolore. Officia eiusmod
            laboris nostrud nisi adipisicing consectetur cillum mollit culpa
            anim ex. Enim nulla esse Lorem exercitation ut enim. Pariatur sint
            voluptate sit ex excepteur laboris qui amet ex culpa.
          </p>
        </div>

        <div className="my-4 grid gap-4 grid-cols-2 lg:grid-cols-3">
          {optionsByRole(role).map((option) => (
            <DashButtonBig
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
