import React, { useContext } from "react";
import FormContext from "../contexts/formContext";
import Button from "../ui-components/Button";

type TGoToEndProps = {
  endStep: string;
};

const GoToEnd = (props: TGoToEndProps) => {
  const { endStep } = props;
  const { setSelectedStep, selectedStep, disableFields } =
    useContext(FormContext);
  if (selectedStep === endStep || !disableFields) {
    return null;
  }
  return (
    <div className="fixed right-3 bottom-3">
      <Button className="shadow-xl opacity-40 hover:opacity-100" onClick={() => setSelectedStep(endStep)}>
        <i className="fa fa-arrow-right mr-2"></i> Final
      </Button>
    </div>
  );
};

export default GoToEnd;
