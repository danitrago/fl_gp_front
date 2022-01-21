import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashButtonBig from "../components/DashButtonBig";
import DashboardTemplate from "../templates/DashboardTemplate";
import Layout from "../templates/PageTemplate";
import Spinner from "../ui-components/Spinner";
import Table from "../ui-components/Table";
import Title from "../ui-components/Title/Title";
const fetchedData = require("../assets/solicitudes-data.json");

const Dashboard = () => {
  // const [ddl, setDdl] = useState<IDdl[]>(ddlFile);
  const [requestsList, setRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRequests: () => void = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get(
            `${
              process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_API_DEVELOP
                : process.env.REACT_APP_API_PRODUCTION
            }/api/get-requests-xxx`
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((e) => {
            // alert("Error al cargar las opciones");
            console.log(e);
            resolve(fetchedData);
          });
      }, 1000);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getRequests()]).then((values: any) => {
      setRequestsList(values[0]);
      setIsLoading(false);
    });
  }, []);

  return (
    <DashboardTemplate>
      {isLoading ? (
        <Spinner />
      ) : (
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
            <DashButtonBig
              label="Nueva Solicitud"
              link="/request"
              icon="plus-circle"
            />
            <DashButtonBig
              label="Mis Solicitudes"
              link="/my-requests"
              icon="list"
            />
            <DashButtonBig
              label="Mis Pendientes"
              link="/pendings"
              icon="briefcase"
            />
          </div>
        </div>
      )}
    </DashboardTemplate>
  );
};

export default Dashboard;
