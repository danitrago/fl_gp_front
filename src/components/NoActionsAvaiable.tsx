import React, { useContext } from "react";
import FormContext from "../contexts/formContext";
import Button from "../ui-components/Button";

type TNoActionsAvaiableProps = {
  prev: string;
};

const NoActionsAvaiable = (props: TNoActionsAvaiableProps) => {
  const { setSelectedStep } = useContext(FormContext);
  return (
    <div className="pt-6">
      <p className="text-center text-8xl mb-6 text-green-300">
        <i className="fa fa-check-circle animate-pulse"></i>
      </p>
      <h2 className="text-primary text-center font-bold text-xl">
        ¡Todo Al Día!
      </h2>
      <p className="text-center">
        No tienes acciones disponibles sobre esta solicitud.
      </p>
      <div className="flex justify-between mt-8">
        <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
      </div>
    </div>
  );
};

export default NoActionsAvaiable;
