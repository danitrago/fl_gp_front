import { useContext } from "react";
import swal from "sweetalert";
import FormContext from "../contexts/formContext";
import { updateFormData } from "../services/requests";
import { IDdl } from "../types/global";

const useInterventorActions = () => {
  const { ddl } = useContext(FormContext);
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
    select.innerHTML = `<option value="">Seleccionar proveedor...</option>${ddl.proveedores.map(
      (prov: IDdl) => {
        return `<option value="${prov.id}">${prov.label}</option>`;
      }
    )}`;
    swal({
      text: "Por favor elige un proveedor.",
      content: select,
      buttons: ["Cancelar", "Enviar a proveedor"],
    } as any).then(() => {
      if (proveedor) {
        let payload = {
          caracterizacion: {
            crcf3_id_estado_solicitud: newStats,
            crcf3_id_proveedor: proveedor,
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
