import React, { useContext } from "react";
import ActionsInterventor from "../components/ActionsInterventor";
import ActionsLeader from "../components/ActionsLeader";
import NoActionsAvaiable from "../components/NoActionsAvaiable";
import FormContext from "../contexts/formContext";
import UserContext from "../contexts/userContext";

const RenderActions = () => {
  const { userId, role } = useContext(UserContext);
  const { toSubmitData } = useContext(FormContext);

  let rolesInteractions: any = {
    leader: {
      selector: "crcf3_id_solicitante_lider",
      statusOn: [0, 4],
      component: <ActionsLeader prev="historias" />,
    },
    controller: {
      selector: "crcf3_id_interventor_contrato",
      statusOn: [1],
      component: <ActionsInterventor prev="historias" />,
    },
  };

  const showOptions = () => {
    const selector = rolesInteractions[role].selector;
    const idParticipant = toSubmitData.caracterizacion?.[selector];
    const isRequestInStatus = rolesInteractions[role].statusOn.includes(
      toSubmitData.caracterizacion?.crcf3_id_estado_solicitud
    );
    if (idParticipant === userId && isRequestInStatus) {
      return rolesInteractions[role].component;
    }
    return <NoActionsAvaiable prev="Historias" />;
  };

  return showOptions();
};

export default RenderActions;
