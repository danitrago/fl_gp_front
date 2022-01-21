import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import Spinner from "../ui-components/Spinner";
import Table from "../ui-components/Table";
import Title from "../ui-components/Title/Title";
const fetchedData = require("../assets/solicitudes-data.json");

const MyRequests = () => {
  // const [ddl, setDdl] = useState<IDdl[]>(ddlFile);
  const [requestsList, setRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const data = React.useMemo(() => {
    return requestsList.map((item: any) => {
      return {
        ...item,
        crcf3_guid_tipo_solicitud: (
          <Link to={`/request/${item.id}`} target="_blank" className="text-primary">
            {item.crcf3_guid_tipo_solicitud}
          </Link>
        ),
      };
    });
  }, [requestsList]);

  const columns: any = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Tipo",
        accessor: "crcf3_guid_tipo_solicitud",
      },
      {
        Header: "Interventor",
        accessor: "crcf3_guid_interventor_contrato",
      },
      {
        Header: "Tipo Necesidad",
        accessor: "crcf3_guid_tipo_necesidad",
      },
      {
        Header: "Ticket Servicio",
        accessor: "crcf3_numero_ticket_servicio",
      },
      {
        Header: "Fecha Límite",
        accessor: "crcf3_fecha_limite",
      },
      {
        Header: "Módulo/Funcionalidad",
        accessor: "crcf3_modulo_funcionalidad",
      },
      {
        Header: "Complejidad",
        accessor: "crcf3_guid_complejidad",
      },
    ],
    []
  );

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
    <Layout>
      <Title variant="h1">Mis Solicitudes</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="animate__animated animate__fadeIn">
          <Table columns={columns} data={data} />
        </div>
      )}
    </Layout>
  );
};

export default MyRequests;
