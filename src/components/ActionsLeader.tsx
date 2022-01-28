import React, { useContext } from "react";
import FormContext from "../contexts/formContext";
import { updateFormData } from "../services/requests";
import Button from "../ui-components/Button";

type TActionsLeaderProps = {
  prev: string;
};

const ActionsLeader = (props: TActionsLeaderProps) => {
  const { toSubmitData, postFormData, setSelectedStep, requestId } =
    useContext(FormContext);
  if (toSubmitData?.caracterizacion?.crcf3_id_estado_solicitud === 4)
    return (
      <div className="pt-6">
        <p className="text-center text-8xl mb-6 text-green-300">
          <i className="fa fa-file-import animate-pulse"></i>
        </p>
        <h2 className="text-primary text-center font-bold text-xl">
          Enviar a Interventor
        </h2>
        <p className="text-center">
          Enviarás de nuevo los datos al Interventor para ser evaluados, ¿Estás
          segur@?
        </p>
        <div className="flex justify-between mt-8">
          <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
          <Button
            onClick={() =>
              updateFormData(
                requestId,
                (() => {
                  let dummie = { ...toSubmitData };
                  dummie.caracterizacion.crcf3_id_estado_solicitud = 1;
                  return dummie;
                })()
              )
            }
          >
            Enviar
          </Button>
        </div>
      </div>
    );
  return (
    <div className="pt-6">
      <p className="text-center text-8xl mb-6 text-green-300">
        <i className="fa fa-paper-plane animate-pulse"></i>
      </p>
      <h2 className="text-primary text-center font-bold text-xl">
        Enviar a Interventor
      </h2>
      <p className="text-center">
        Estás a punto de enviar todos los datos del formulario, ¿Estás segur@?
      </p>
      <div className="flex justify-between mt-8">
        <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
        <Button onClick={() => postFormData(toSubmitData)}>Enviar</Button>
      </div>
    </div>
  );
};

export default ActionsLeader;
