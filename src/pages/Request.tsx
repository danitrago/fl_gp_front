import axios from "axios";
import React, { useEffect, useState } from "react";
import FormCaracterizacion from "../components/FormCaracterizacion";
import FormHistorias from "../components/FormHistorias";
import FormRecursos from "../components/FormRecursos";
import FormRequerimientos from "../components/FormRequerimientos";
import FormContext from "../context/formContext";
import { IFieldsData } from "../interfaces/form-fields";
import { Wizard, WizardContent } from "../ui-components/Wizard";
const ddlFile = require("../assets/ddl.json");

// export type TMainData = {
//   caracterizacion: {
//     [key: string]: number | string;
//     ticket: string;
//     descripcion: string;
//   };
//   recursos: {
//     id: number;
//     tipo: string;
//     cantidad: number;
//   }[];
// };

const demoData: any = {
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
      crcf3_cantidad_consultores: "3",
      crcf3_porcentaje_dedicacion: "3",
      crcf3_tiempo_requerido: "43",
      crcf3_observaciones: "gdf",
      crcf3_group_id_front: "1641911004719",
    },
    {
      crcf3_guid_tipo_consultor: "b5ee0ab2-44d8-475b-a4b6-838665d87f05",
      crcf3_guid_seniority: "d707fb44-e1f9-4497-a4ff-b1b3090b544a",
      crcf3_cantidad_consultores: "43",
      crcf3_porcentaje_dedicacion: "43",
      crcf3_tiempo_requerido: "564",
      crcf3_observaciones: "gfdg",
      crcf3_group_id_front: "1641911029931",
    },
  ],
  requerimientos: [
    {
      crcf3_guid_tipo_requisito: "c340af98-a2c8-4f56-ba03-e2b3befce603",
      crcf3_titulo: "gfd",
      crcf3_group_id_front: "1641911004722",
    },
  ],
  historias: [
    {
      crcf3_titulo: "gfdgfd",
      crcf3_criterio: "1fds\n2fdsgfd\n3gfgdf",
      crcf3_group_id_front: "1641911004723",
    },
  ],
};

const Request = () => {
  // console.log("render Request");
  const [selectedStep, setSelectedStep] = useState<string>("Caracterización");
  const [toSubmitData, setToSubmitData] = useState({});
  const [ddl, setDdl] = useState(ddlFile);

  const getDdlOptions: () => void = () => {
    axios
      .get(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_API_DEVELOP
            : process.env.REACT_APP_API_PRODUCTION
        }/api/ddl-fl-gp`
      )
      .then((response) => {
        setDdl(response.data);
      })
      .catch((e) => {
        // alert("Error al cargar las opciones");
        console.log(e);
      });
  };

  const postFormData = () => {
    console.log("Posting:");
    console.log(toSubmitData);
    axios
      .post(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_API_DEVELOP
            : process.env.REACT_APP_API_PRODUCTION
        }/api/fl-gp-solicitudes`,
        toSubmitData
      )
      .then((response) => {
        console.log(response);
        alert("¡Hecho! Tu solicitud ha sido creada.");
      })
      .catch((e) => {
        console.log(e);
        alert("Error al crear la solicitud.");
      });
  };

  useEffect(() => {
    getDdlOptions();
    setTimeout(() => {
      if (demoData) {
        console.log("data fetched");
        setToSubmitData(demoData);
      }
    }, 3000);
  }, []);

  return (
    <FormContext.Provider
      value={{ toSubmitData, setToSubmitData, ddl, postFormData }}
    >
      <div>
        <Wizard selectedStep={selectedStep}>
          {/* Step 1 */}
          <WizardContent title="Caracterización">
            <FormCaracterizacion
              querySelector="caracterizacion"
              submitCallback={() => setSelectedStep("Recursos")}
            />
          </WizardContent>
          {/* Step 2 */}
          <WizardContent title="Recursos">
            <FormRecursos
              title="Recursos"
              subTitle="Has seleccionado el tipo de solicitud (Recurso), por favor describe los
            detalles de el/los recursos."
              querySelector="recursos"
              submitCallback={() => setSelectedStep("Requerimientos")}
            />
          </WizardContent>
          {/* Step 3 */}
          <WizardContent title="Requerimientos">
            <FormRequerimientos
              title="Requerimientos"
              querySelector="requerimientos"
              submitCallback={() => setSelectedStep("Historias")}
            />
          </WizardContent>
          {/* Step 4 */}
          <WizardContent title="Historias">
            <FormHistorias
              title="Historias"
              querySelector="historias"
              submitCallback={() => setSelectedStep("Enviar")}
            />
          </WizardContent>
          {/* Step 5 */}
          <WizardContent title="Enviar">
            <button onClick={postFormData}>Enviar Todo</button>
          </WizardContent>
        </Wizard>
      </div>
    </FormContext.Provider>
  );
};

export default Request;
