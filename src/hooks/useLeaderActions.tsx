import { useContext } from "react";
import swal from "sweetalert";
import FormContext from "../contexts/formContext";
import { updateFormData } from "../services/requests";
import { IDdl } from "../types/global";

const useLeaderActions = () => {
  const actionReject = (id: string, newStats: number) => {
    swal({
      text: "Por favor describe el motivo de la desaprobación.",
      content: "input",
      buttons: ["Cancelar", "Desaprobar"],
    } as any).then((comment) => {
      if (typeof comment === "string") {
        if (comment.trim().length > 0) {
          let payload = {
            caracterizacion: {
              crcf3_id_estado_solicitud: newStats,
            },
            comentarios: comment,
          };
          updateFormData(id, payload);
        } else {
          swal("", "Por favor justifica el motivo de rechazo.", "warning");
        }
      }
    });
  };

  const actionAprove = (id: string, newStats: number) => {
    swal({
      title: "¿Aprobar Propuesta?",
      text: "Estás a punto de aprobar la propuesta del proveedor.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    } as any).then((willDelete) => {
      if (willDelete) {
        let payload = {
          caracterizacion: {
            crcf3_id_estado_solicitud: newStats,
          },
        };
        updateFormData(id, payload);
      }
    });
  };

  return {
    actionReject,
    actionAprove,
  };
};

export default useLeaderActions;
