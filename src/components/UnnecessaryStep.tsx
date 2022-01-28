import React, { useContext } from "react";
import FormContext from "../contexts/formContext";
import Button from "../ui-components/Button";

type TUnnecessaryStepProps = {
  msg: string;
  prev?: string;
  next?: string;
};

const UnnecessaryStep = (props: TUnnecessaryStepProps) => {
  const { msg, prev, next } = props;
  const { setSelectedStep } = useContext(FormContext);

  return (
    <div className="pt-5">
      <p className="text-center text-8xl mb-5 text-green-300">
        <i className="fa fa-check-circle animate-pulse"></i>
      </p>
      <p className="text-center text-xl text-gray-600">"{msg}".</p>
      {prev || next ? (
        <div className="flex justify-between pt-5">
          {prev && (
            <Button onClick={() => setSelectedStep(prev)}>Volver</Button>
          )}
          {next && (
            <Button onClick={() => setSelectedStep(next)}>Continuar</Button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UnnecessaryStep;
