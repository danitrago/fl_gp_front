import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActionsInterventor from "../components/ActionsInterventor";
import ActionsLeader from "../components/ActionsLeader";
import UnnecessaryStep from "../components/UnnecessaryStep";
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
  const [selectedStep, setSelectedStep] = useState<string>("Enviar");
  // const [selectedStep, setSelectedStep] = useState<string>("Caracterización");
  const [toSubmitData, setToSubmitData] = useState<IFieldsData>({
    caracterizacion: {
      crcf3_id_estado_solicitud: 0,
    },
  } as IFieldsData);
  const [ddl, setDdl] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let { requestId } = useParams();

  const renderActions = () => {
    switch (toSubmitData?.caracterizacion?.crcf3_id_estado_solicitud) {
      case 1:
        return <ActionsInterventor prev="Historias" />;
      case 4:
        return <ActionsLeader prev="Historias" />;
      case 0:
        return <ActionsLeader prev="Historias" />;
      default:
        return "Sin acciones disponibles";
    }
  };

  const renderState = (statusId: number) => {
    if (statusId) {
      return (
        <small>
          {
            ddl?.estadoSolicitud?.filter((item: any) => item.id === statusId)[0]
              .label
          }
        </small>
      );
    }
    return null;
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
            Detalle de Solicitud
            <span className="text-dark ml-2 text-lg">
              ({renderState(
                toSubmitData.caracterizacion?.crcf3_id_estado_solicitud || 0
              )})
            </span>
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
              {toSubmitData.caracterizacion?.crcf3_id_tipo_solicitud == 1 ? (
                <FormRecursos
                  querySelector="recursos"
                  next="Requerimientos"
                  prev="Caracterización"
                />
              ) : (
                <UnnecessaryStep
                  msg="No es necesario que asignes recursos"
                  prev="Caracterización"
                  next="Requerimientos"
                />
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
