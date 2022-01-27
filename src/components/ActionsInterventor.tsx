import React, { useContext } from "react";
import FormContext from "../contexts/formContext";
import Button from "../ui-components/Button";
import sendImg from "../assets/send.jpg";
import { updateRequestStatus } from "../services/requests";

type TActionsInterventorProps = {
  prev: string;
};

const ActionsInterventor = (props: TActionsInterventorProps) => {
  const { toSubmitData, postFormData, setSelectedStep, requestId } =
    useContext(FormContext);
  return (
    <div className="pt-5">
      {/* <img src={sendImg} alt="Enviar formulario" className="w-1/5 mx-auto mb-5" /> */}
      <h2 className="text-primary text-center font-bold text-xl">
        Gestionar Solicitud
      </h2>
      <p className="text-center">
        Por favor indica qué deseas hacer con esta solicitud:
      </p>
      <div className="flex justify-between mt-8">
        <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
        <Button onClick={() => updateRequestStatus(requestId, 3)}>
          Rechazar
        </Button>
        <Button onClick={() => updateRequestStatus(requestId, 4)}>
          Devolver por Incompleta
        </Button>
        <Button onClick={() => updateRequestStatus(requestId, 2)}>
          Enviar a Proveedor
        </Button>
      </div>
    </div>
  );
};

export default ActionsInterventor;
