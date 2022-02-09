import React, { useContext } from "react";
import ActionsInterventor from "../components/ActionsInterventor";
import ActionsLeader from "../components/ActionsLeader";
import NoActionsAvaiable from "../components/NoActionsAvaiable";
import FormContext from "../contexts/formContext";
import UserContext from "../contexts/userContext";
import { rolesMatrix } from "../types/global";

const RenderActions = () => {
  const { userId, role } = useContext(UserContext);
  const { toSubmitData } = useContext(FormContext);

  let rolesInteractions: rolesMatrix = {
    Líder: {
      selector: "crcf3_id_solicitante_lider",
      // statusOn: [0, 4],
      statusOn: [0, 2, 4, 6, 8],
      component: <ActionsLeader prev="Historias" />,
    },
    Interventor: {
      selector: "crcf3_id_interventor_contrato",
      statusOn: [1],
      component: <ActionsInterventor prev="Historias" />,
    },
  };

  const showOptions = () => {
    const selector: string = rolesInteractions[role].selector;
    const idParticipant: any = toSubmitData.caracterizacion?.[selector];
    const isRequestInStatus: boolean = rolesInteractions[
      role
    ].statusOn.includes(
      toSubmitData.caracterizacion?.crcf3_id_estado_solicitud || 0
    );

    if (idParticipant === userId && isRequestInStatus) {
      return rolesInteractions[role].component; // print actions by role
    }

    return <NoActionsAvaiable prev="Historias" />; // print NO actions avaiable
  };

  return showOptions();
};

export default RenderActions;
