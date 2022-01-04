import axios from "axios";
import React, { useEffect, useState } from "react";
import FormCaracterizacion from "../components/FormCaracterizacion";
import FormHistorias from "../components/FormHistorias";
import FormRecursos from "../components/FormRecursos";
import FormRequerimientos from "../components/FormRequerimientos";
import { IFieldsData } from "../interfaces/form-fields";
import Wizard, { WizardContent } from "../ui-components/Wizard";
const ddlFile = require("../assets/ddl.json");

const Request = () => {
  const [selectedStep, setSelectedStep] = useState<string>("Caracterización");
  const [toSubmitData, setToSubmitData] = useState<IFieldsData>(
    {} as IFieldsData
  );

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

  const postData: () => void = () => {
    console.log("send data");
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
  }, []);

  return (
    <div>
      {toSubmitData && console.log(toSubmitData)}
      <Wizard selectedStep={selectedStep}>
        {/* Step 1 */}
        <WizardContent title="Caracterización">
          <FormCaracterizacion
            setToSubmitData={setToSubmitData}
            setSelectedStep={setSelectedStep}
            ddlOptions={ddl}
          />
        </WizardContent>
        {/* Step 2 */}
        <WizardContent title="Recursos">
          <FormRecursos
            setToSubmitData={setToSubmitData}
            setSelectedStep={setSelectedStep}
            ddlOptions={ddl}
          />
        </WizardContent>
        {/* Step 3 */}
        <WizardContent title="Requerimientos">
          <FormRequerimientos
            setToSubmitData={setToSubmitData}
            setSelectedStep={setSelectedStep}
            ddlOptions={ddl}
          />
        </WizardContent>
        {/* Step 4 */}
        <WizardContent title="Historias">
          <FormHistorias
            setToSubmitData={setToSubmitData}
            setSelectedStep={setSelectedStep}
            postData={postData}
          />
        </WizardContent>
      </Wizard>
    </div>
  );
};

export default Request;
