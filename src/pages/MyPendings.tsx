import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import { alertMsg } from "../helpers";
import { getMyRequests } from "../services/requests";
import Layout from "../templates/PageTemplate";
import Spinner from "../ui-components/Spinner";
import Table from "../ui-components/Table";
import Title from "../ui-components/Title/Title";

const MyPendings = () => {
  // const [ddl, setDdl] = useState<IDdl[]>(ddlFile);
  const [requestsList, setRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userId } = useContext(UserContext);

  const data = React.useMemo(() => {
    return requestsList.map((item: any) => {
      return {
        ...item,
        crcf3_id_tipo_solicitud: (
          <Link
            to={`/request/${item.crcf3_fl_gp_008_solicitudid}`}
            target="_blank"
            className="text-primary"
          >
            {item.crcf3_id_tipo_solicitud}
          </Link>
        ),
        // crcf3_id_estado_solicitud:
        //   Math.random() > 0.5 ? (
        //     <span>
        //       <i className="fa fa-check-circle text-green-500"></i>{" "}
        //       <small>Completa</small>
        //     </span>
        //   ) : (
        //     <span>
        //       <i className="fa fa-exclamation-circle text-yellow-500"></i>{" "}
        //       <small>Incompleta</small>
        //     </span>
        //   ),
      };
    });
  }, [requestsList]);

  const columns: any = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "crcf3_id_solicitud",
      },
      {
        Header: "Tipo",
        accessor: "crcf3_id_tipo_solicitud",
      },
      {
        Header: "Estado",
        accessor: "crcf3_id_estado_solicitud",
      },
    //   {
    //     Header: "Interventor",
    //     accessor: "crcf3_id_interventor_contrato",
    //   },
      {
        Header: "Tipo Necesidad",
        accessor: "crcf3_id_tipo_necesidad",
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
        accessor: "crcf3_id_complejidad",
      },
    ],
    []
  );

  useEffect(() => {
    Promise.all([getMyRequests(userId)])
      .then(([myRequestsList]) => {
        setRequestsList(myRequestsList);
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 800)
      )
      .catch(() => {
        alertMsg(
          "¡Ups!",
          "Hubo un error trayendo los datos, intenta más tarde.",
          "error"
        );
      });
  }, []);

  return (
    <Layout>
      <Title variant="h1">Mis Pendientes</Title>
      <p className="mb-5">Las siguientes son solicitudes que requieren tu atención.</p>
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

export default MyPendings;