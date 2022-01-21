import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { IFieldsData } from "../types/form-fields";
import { IDdl } from "../types/global";
import Spinner from "../ui-components/Spinner";
import Table from "../ui-components/Table";
import Title from "../ui-components/Title/Title";
const ddlFile = require("../assets/ddl.json");

const demoData: IFieldsData = {
  caracterizacion: {
    crcf3_guid_tipo_solicitud: "3ca21c8b-62df-4598-904b-eb0c2481356f",
    crcf3_guid_interventor_contrato: "6ec4853b-e332-466e-b7c0-99c80831be4f",
    crcf3_guid_tipo_necesidad: "76f41ba3-f349-4e3c-ae77-8c378d9365f9",
    crcf3_numero_ticket_servicio: "hgf",
    crcf3_fecha_limite: "2022-01-13",
    crcf3_modulo_funcionalidad: "fsd",
    crcf3_guid_complejidad: "508e2c25-9191-464d-9b37-e78fc268a2ba",
    crcf3_situacionactual: "fds",
    crcf3_justificacion: "fds",
    crcf3_descripcion_necesidad: "fds",
    crcf3_prerrequisitos: "fsd",
  },
  recursos: [
    {
      crcf3_guid_tipo_consultor: "7768d2ba-4739-4d8f-8007-2e316231666e",
      crcf3_guid_seniority: "5a6dad49-b5bd-450e-9d2b-25c3a7c7218a",
      crcf3_cantidad_consultores: 3,
      crcf3_porcentaje_dedicacion: 3,
      crcf3_tiempo_requerido: 43,
      crcf3_observaciones: "gdf",
      crcf3_group_id_front: 1641911004719,
    },
    {
      crcf3_guid_tipo_consultor: "b5ee0ab2-44d8-475b-a4b6-838665d87f05",
      crcf3_guid_seniority: "d707fb44-e1f9-4497-a4ff-b1b3090b544a",
      crcf3_cantidad_consultores: 43,
      crcf3_porcentaje_dedicacion: 43,
      crcf3_tiempo_requerido: 564,
      crcf3_observaciones: "gfdg",
      crcf3_group_id_front: 1641911029931,
    },
  ],
  requerimientos: [
    {
      crcf3_guid_tipo_requisito: "c340af98-a2c8-4f56-ba03-e2b3befce603",
      crcf3_titulo: "gfd",
      crcf3_group_id_front: 1641911004722,
    },
  ],
  historias: [
    {
      crcf3_titulo: "gfdgfd",
      crcf3_criterio: "1fds\n2fdsgfd\n3gfgdf",
      crcf3_group_id_front: 1641911004723,
    },
  ],
};

const MyRequests = () => {
  const [ddl, setDdl] = useState<IDdl[]>(ddlFile);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchedData = [
    {
      col1: "Hello",
      col2: "World",
    },
    {
      col1: "react-table",
      col2: "rocks",
    },
    {
      col1: "whatever",
      col2: "you want",
    },
  ];

  const data = React.useMemo(() => {
    return fetchedData.map((item) => {
      return {
        ...item,
        col1: (
          <Link to={`/request/${item.col1}`} className="text-primary">
            {item.col1}
          </Link>
        ),
      };
    });
  }, []);

  const columns: any = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
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
            }/api/ddl-fl-gp`
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((e) => {
            // alert("Error al cargar las opciones");
            console.log(e);
            resolve(ddlFile);
          });
      }, 1000);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getRequests()]).then((values: any) => {
      setDdl(values[0]);
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
