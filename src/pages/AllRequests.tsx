import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExportTableButton from "../components/ExportTableButton";
import UserContext from "../contexts/userContext";
import { alertMsg, formatDate, processDataToDownload } from "../helpers";
import { getAllRequests, getMyRequests } from "../services/requests";
import Layout from "../templates/PageTemplate";
import Spinner from "../ui-components/Spinner";
import Table from "../ui-components/Table";
import Title from "../ui-components/Title/Title";

const AllRequests = () => {
  // const [ddl, setDdl] = useState<IDdl[]>(ddlFile);
  const [requestsList, setRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userId } = useContext(UserContext);

  const data = React.useMemo(() => {
    return requestsList.map((item: any) => {
      return {
        ...item,
        open: (
          <Link
            to={`/request/${item.crcf3_fl_gp_008_solicitudid}`}
            title="Ver solicitud"
            // target="_blank"
            className="text-primary"
          >
            <i className="fa fa-external-link-square-alt -mr-3"></i>
          </Link>
        ),
        open2: (
          <Link
            to={`/request/${item.crcf3_fl_gp_008_solicitudid}`}
            title="Ver solicitud"
            // target="_blank"
            className="text-primary"
          >
            <i className="fa fa-external-link-square-alt -ml-3"></i>
          </Link>
        ),
        crcf3_fecha_limite: formatDate(item.crcf3_fecha_limite),
        createdon: formatDate(item.createdon),
      };
    });
  }, [requestsList]);

  const columns: any = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "open",
      },
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
      {
        Header: "Solicitante",
        accessor: "crcf3_id_solicitante_lider",
      },
      {
        Header: "Interventor",
        accessor: "crcf3_id_interventor_contrato",
      },
      {
        Header: "Proveedor",
        accessor: "crcf3_id_proveedor",
      },
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
      //   {
      //     Header: "Módulo/Funcionalidad",
      //     accessor: "crcf3_modulo_funcionalidad",
      //   },
      {
        Header: "Complejidad",
        accessor: "crcf3_id_complejidad",
      },
      {
        Header: "Creación",
        accessor: "createdon",
      },
      {
        Header: "",
        accessor: "open2",
      },
    ],
    []
  );

  useEffect(() => {
    Promise.all([getAllRequests(userId)])
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
      <Title variant="h1">Centro de Solicitudes</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="animate__animated animate__fadeIn">
          <Table columns={columns} data={data} />
          <ExportTableButton data={processDataToDownload(requestsList)} />
        </div>
      )}
    </Layout>
  );
};

export default AllRequests;
