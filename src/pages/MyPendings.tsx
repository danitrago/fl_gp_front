import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyTable from "../components/EmptyTable";
import UserContext from "../contexts/userContext";
import { alertMsg, formatDate } from "../helpers";
import { getMyPendings } from "../services/requests";
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
        Header: "Interventor",
        accessor: "crcf3_id_interventor_contrato",
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
        Header: "Fecha L??mite",
        accessor: "crcf3_fecha_limite",
      },
      {
        Header: "M??dulo/Funcionalidad",
        accessor: "crcf3_modulo_funcionalidad",
      },
      {
        Header: "Complejidad",
        accessor: "crcf3_id_complejidad",
      },
      {
        Header: "Creaci??n",
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
    Promise.all([getMyPendings(userId)])
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
          "??Ups!",
          "Hubo un error trayendo los datos, intenta m??s tarde.",
          "error"
        );
      });
  }, []);

  return (
    <Layout>
      <Title variant="h1">Mis Pendientes</Title>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="animate__animated animate__fadeIn">
          {requestsList.length > 0 ? (
            <>
              <p className="mb-5">
                Las siguientes son solicitudes que requieren tu atenci??n.
              </p>
              <Table columns={columns} data={data} />
            </>
          ) : (
            <EmptyTable />
          )}
        </div>
      )}
    </Layout>
  );
};

export default MyPendings;
