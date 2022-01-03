import axios from "axios";
import React, { useEffect, useState } from "react";
import FormCaracterizacion, {
  IFieldsCaracterizacion,
} from "../components/FormCaracterizacion";
import FormHistorias from "../components/FormHistorias";
import FormRecursos from "../components/FormRecursos";
import FormRequerimientos from "../components/FormRequerimientos";
import { IFieldsHistorias } from "../components/GroupHistorias";
import { IFieldsRecursos } from "../components/GroupRecursos";
import { IFieldsRequerimientos } from "../components/GroupRequerimientos";
import Wizard, { WizardContent } from "../ui-components/Wizard";
const ddlFile = require("../assets/ddl.json");

export interface IFieldsData {
  caracterizacion?: IFieldsCaracterizacion;
  recursos?: IFieldsRecursos;
  requerimientos?: IFieldsRequerimientos;
  historias?: IFieldsHistorias;
}

const Request = () => {
  const [selectedStep, setSelectedStep] = useState<string>("Caracterización");
  const [toSubmitData, setToSubmitData] = useState<IFieldsData | null>(null);

  const [ddl, setDdl] = useState(ddlFile);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/fl-gp-solicitudes")
      .then((response) => {
        setDdl(response.data);
      })
      .catch((e) => {
        alert("Error al cargar las opciones");
        // setDdl(ddlFile);
      });
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
            ddl={ddl}
          />
        </WizardContent>
        {/* Step 2 */}
        <WizardContent title="Recursos">
          <FormRecursos
            setToSubmitData={setToSubmitData}
            setSelectedStep={setSelectedStep}
          />
        </WizardContent>
        {/* Step 3 */}
        <WizardContent title="Requerimientos">
          <FormRequerimientos
            setToSubmitData={setToSubmitData}
            setSelectedStep={setSelectedStep}
          />
        </WizardContent>
        {/* Step 4 */}
        <WizardContent title="Historias">
          <FormHistorias
            setToSubmitData={setToSubmitData}
            setSelectedStep={setSelectedStep}
          />
        </WizardContent>
      </Wizard>
    </div>
  );
};

export default Request;
