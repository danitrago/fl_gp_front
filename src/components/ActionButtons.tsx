import React, { useContext } from "react";
import FormContext from "../contexts/formContext";
import Button from "../ui-components/Button";

type TActionButtonsProps = {
  prev?: string;
  submitAllGroups?: () => void;
};

const ActionButtons = (props: TActionButtonsProps) => {
  const { setSelectedStep } = useContext(FormContext);
  return (
    <div
      data-role="action-panel"
      className="w-full mt-3 pt-3 flex justify-between"
    >
      {props.prev ? (
        <Button onClick={() => setSelectedStep(props.prev)}>Anterior</Button>
      ) : (
        <div></div>
      )}
      {props.submitAllGroups ? (
        <Button onClick={props.submitAllGroups}>
          Continuar <i className="fa fa-arrow-right ml-2"></i>
        </Button>
      ) : (
        <Button type="submit">
          Continuar <i className="fa fa-arrow-right ml-2"></i>
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
