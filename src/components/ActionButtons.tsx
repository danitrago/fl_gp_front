import React, { useContext } from "react";
import FormContext from "../context/formContext";
import Button from "../ui-components/Button";

const ActionButtons = (props: any) => {
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
        <Button onClick={props.submitAllGroups}>Continuar</Button>
      ) : (
        <Button type="submit">Continuar</Button>
      )}
    </div>
  );
};

export default ActionButtons;
