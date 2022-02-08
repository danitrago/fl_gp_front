import React, { useContext } from "react";
import FormContext from "../contexts/formContext";
import Button from "../ui-components/Button";
import useInterventorActions from "../hooks/useInterventorActions";

type TActionsInterventorProps = {
  prev: string;
};

const ActionsInterventor = (props: TActionsInterventorProps) => {
  const { toSubmitData, postFormData, setSelectedStep, requestId } =
    useContext(FormContext);

  const { actionReject, actionReturn, actionAprove } = useInterventorActions();

  return (
    <div className="pt-6">
      <p className="text-center text-8xl mb-6 text-green-300">
        <i className="fa fa-briefcase animate-pulse"></i>
      </p>
      <h2 className="text-primary text-center font-bold text-xl">
        Gestionar Solicitud
      </h2>
      <p className="text-center">¿Qué deseas hacer con esta solicitud?</p>
      <div className="flex justify-center mt-5">
        <Button onClick={() => requestId && actionReject(requestId, 3)}>
          Rechazar
        </Button>
        <Button
          className="mx-2"
          onClick={() => requestId && actionReturn(requestId, 4)}
        >
          Devolver
        </Button>
        <Button onClick={() => requestId && actionAprove(requestId, 2)}>
          Enviar a Proveedor
        </Button>
      </div>
      <div className="flex justify-between mt-8 border-t pt-5">
        <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
      </div>
    </div>
  );
};

export default ActionsInterventor;
