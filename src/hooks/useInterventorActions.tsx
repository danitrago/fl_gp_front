import swal from "sweetalert";
import { updateFormData } from "../services/requests";

const useInterventorActions = () => {
  const actionReject = (id: string, newStats: number) => {
    swal({
      text: "Por favor describe el motivo de rechazo.",
      content: "input",
      buttons: ["Cancelar", "Rechazar"],
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
  const actionReturn = (id: string, newStats: number) => {
    swal({
      text: "Por favor describe el motivo de devolución al líder.",
      content: "input",
      buttons: ["Cancelar", "Devolver"],
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
          swal("", "Por favor justifica el motivo de devolución.", "warning");
        }
      }
    });
  };
  const actionAprove = (id: string, newStats: number) => {
    let proveedor: any = null;
    let select = document.createElement("select");
    select.addEventListener("change", (e: any) => (proveedor = e.target.value));
    select.className = "w-full border bg-gray-100 rounded mb-1 p-2 h-11";
    select.innerHTML = `<option value="">Seleccionar proveedor...</option><option value="jaja">Demo</option>`;
    swal({
      text: "Por favor elige un proveedor.",
      content: select,
      buttons: ["Cancelar", "Enviar a proveedor"],
    } as any).then(() => {
      if (proveedor) {
        let payload = {
          caracterizacion: {
            crcf3_id_estado_solicitud: newStats,
          },
        };
        updateFormData(id, payload);
      } else {
        swal("", "Por favor selecciona un proveedor.", "warning");
      }
    });
  };

  return {
    actionReject,
    actionReturn,
    actionAprove,
  };
};

export default useInterventorActions;
