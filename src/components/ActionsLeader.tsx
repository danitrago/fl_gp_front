import React, { useContext } from "react";
import FormContext from "../contexts/formContext";
import Button from "../ui-components/Button";
import sendImg from "../assets/send.jpg";
import { updateFormData } from "../services/requests";

type TActionsLeaderProps = {
  prev: string;
};

const ActionsLeader = (props: TActionsLeaderProps) => {
  const { toSubmitData, postFormData, setSelectedStep } =
    useContext(FormContext);
  if (toSubmitData.caracterizacion.crcf3_id_estado_solicitud === 4)
    return (
      <div className="pt-5">
        {/* <img
          src={sendImg}
          alt="Enviar formulario"
          className="w-1/5 mx-auto mb-5"
        /> */}
        <h2 className="text-primary text-center font-bold text-xl">
          Enviar para revisión
        </h2>
        <p className="text-center">
          Enviarás de nuevo los datos al Interventor para ser evaluados.
        </p>
        <div className="flex justify-between mt-8">
          <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
          <Button
            onClick={() =>
              updateFormData(
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
    <div className="pt-5">
      <img
        src={sendImg}
        alt="Enviar formulario"
        className="w-1/5 mx-auto mb-5"
      />
      <h2 className="text-primary text-center font-bold text-xl">
        Enviar Datos
      </h2>
      <p className="text-center">
        Estás a punto de enviar todos los datos del formulario, ¿Estás seguro?
      </p>
      <div className="flex justify-between mt-8">
        <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
        <Button onClick={() => postFormData(toSubmitData)}>Enviar</Button>
      </div>
    </div>
  );
};

export default ActionsLeader;
