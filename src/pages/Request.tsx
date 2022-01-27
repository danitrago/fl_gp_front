import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActionsInterventor from "../components/ActionsInterventor";
import ActionsLeader from "../components/ActionsLeader";
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
import Button from "../ui-components/Button";
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

  const renderActions = () => {
    switch (toSubmitData?.caracterizacion?.crcf3_id_estado_solicitud) {
      case 1:
        return <ActionsInterventor prev="Historias" />;
      case 4:
        return <ActionsLeader prev="Historias" />;
      case undefined:
        return <ActionsLeader prev="Historias" />;
      default:
        return "Sin acciones disponibles";
    }
  };

  useEffect(() => {
    if (requestId) {
      Promise.all([getDdlOptions(), getFormData(requestId)])
        .then(([ddl, requestData]) => {
          setDdl(ddl);
          setToSubmitData(requestData);
        })
        .finally(() =>
          setTimeout(() => {
            setIsLoading(false);
          }, 800)
        );
    } else {
      Promise.all([getDdlOptions()])
        .then(([ddl]) => {
          setDdl(ddl);
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
            <small className="text-dark ml-3">
              <i className="fa fa-check-circle text-green-500"></i>{" "}
              <small>Estado: {toSubmitData.caracterizacion?.crcf3_id_tipo_solicitud}</small>
            </small>
            {/* {Math.random() > 0.5 ? (
              <small className="text-dark ml-3">
                <i className="fa fa-check-circle text-green-500"></i>{" "}
                <small>Completa</small>
              </small>
            ) : (
              <small className="text-dark ml-3">
                <i className="fa fa-exclamation-circle text-yellow-500"></i>{" "}
                <small>Incompleta</small>
              </small>
            )} */}
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
          requestId,
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
              />
            </WizardContent>
            {/* Step 2 */}
            <WizardContent title="Recursos" selectedStep={selectedStep}>
              {toSubmitData.caracterizacion?.crcf3_id_tipo_solicitud === 1 ? (
                <FormRecursos
                  querySelector="recursos"
                  next="Requerimientos"
                  prev="Caracterización"
                />
              ) : (
                <>
                  <p>No debes asignar recursos a esta solicitud</p>
                  <div className="flex justify-between pt-5">
                    <Button onClick={() => setSelectedStep("Caracterización")}>
                      Volver
                    </Button>
                    <Button onClick={() => setSelectedStep("Requerimientos")}>
                      Continuar
                    </Button>
                  </div>
                </>
              )}
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
              {renderActions()}
            </WizardContent>
          </Wizard>
        )}
      </FormContext.Provider>
    </Layout>
  );
};

export default Request;
