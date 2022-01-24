import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SendData from "../components/SendData";
import FormContext from "../contexts/formContext";
import FormCaracterizacion from "../forms/FormCaracterizacion";
import FormHistorias from "../forms/FormHistorias";
import FormRecursos from "../forms/FormRecursos";
import FormRequerimientos from "../forms/FormRequerimientos";
import { getDdlOptions, getFormData, postFormData } from "../services/requests";
import Layout from "../templates/PageTemplate";
import { IFieldsData } from "../types/form-fields";
import { IDdl } from "../types/global";
import Spinner from "../ui-components/Spinner";
import Title from "../ui-components/Title/Title";
import { Wizard, WizardContent } from "../ui-components/Wizard";

const Request = () => {
  // console.log("render Request");
  const [selectedStep, setSelectedStep] = useState<string>("Caracterización");
  const [toSubmitData, setToSubmitData] = useState<IFieldsData>(
    {} as IFieldsData
  );
  const [ddl, setDdl] = useState<IDdl[]>([] as IDdl[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let { requestId } = useParams();

  useEffect(() => {
    if (requestId) {
      Promise.all([getDdlOptions(), getFormData(requestId)])
        .then((values: any) => {
          setDdl(values[0]);
          setToSubmitData(values[1]);
        })
        .finally(() =>
          setTimeout(() => {
            setIsLoading(false);
          }, 800)
        );
    } else {
      Promise.all([getDdlOptions()])
        .then((values: any) => {
          setDdl(values[0]);
        })
        .finally(() =>
          setTimeout(() => {
            setIsLoading(false);
          }, 800)
        );
    }
  }, []);

  return (
    <Layout>
      <Title variant="h1">
        {requestId ? (
          <>
            Editar Solicitud
            {Math.random() > 0.5 ? (
              <small className="text-dark ml-3">
                <i className="fa fa-check-circle text-green-500"></i>{" "}
                <small>Completa</small>
              </small>
            ) : (
              <small className="text-dark ml-3">
                <i className="fa fa-exclamation-circle text-yellow-500"></i>{" "}
                <small>Incompleta</small>
              </small>
            )}
          </>
        ) : (
          "Nueva Solicitud"
        )}
      </Title>
      <FormContext.Provider
        value={{
          toSubmitData,
          setToSubmitData,
          ddl,
          postFormData,
          setSelectedStep,
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Wizard
            selectedStep={selectedStep}
            offsetTop={120}
            className="animate__animated animate__fadeIn"
          >
            {/* Step 1 */}
            <WizardContent title="Caracterización" selectedStep={selectedStep}>
              <FormCaracterizacion
                querySelector="caracterizacion"
                next="Recursos"
                // prev="Recursos"
              />
            </WizardContent>
            {/* Step 2 */}
            <WizardContent title="Recursos" selectedStep={selectedStep}>
              <FormRecursos
                querySelector="recursos"
                next="Requerimientos"
                prev="Caracterización"
              />
            </WizardContent>
            {/* Step 3 */}
            <WizardContent title="Requerimientos" selectedStep={selectedStep}>
              <FormRequerimientos
                querySelector="requerimientos"
                next="Historias"
                prev="Recursos"
              />
            </WizardContent>
            {/* Step 4 */}
            <WizardContent title="Historias" selectedStep={selectedStep}>
              <FormHistorias
                querySelector="historias"
                next="Enviar"
                prev="Requerimientos"
              />
            </WizardContent>
            {/* Step 5 */}
            <WizardContent title="Enviar" selectedStep={selectedStep}>
              <SendData prev="Historias" />
            </WizardContent>
          </Wizard>
        )}
      </FormContext.Provider>
    </Layout>
  );
};

export default Request;
