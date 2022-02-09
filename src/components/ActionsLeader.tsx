import React, { useContext } from "react";
import swal from "sweetalert";
import FormContext from "../contexts/formContext";
import useLeaderActions from "../hooks/useLeaderActions";
import { updateFormData } from "../services/requests";
import Button from "../ui-components/Button";

type TActionsLeaderProps = {
  prev: string;
};

const ActionsLeader = (props: TActionsLeaderProps) => {
  const { toSubmitData, postFormData, setSelectedStep, requestId } =
    useContext(FormContext);

  const { actionReject, actionAprove } = useLeaderActions();

  const updateRequestStatus = () => {
    let dummie = { ...toSubmitData };
    if (dummie.caracterizacion) {
      dummie.caracterizacion.crcf3_id_estado_solicitud = 1;
    }
    return dummie;
  };

  const actionCancel = (id: string, newStats: number) => {
    swal({
      text: "Por favor describe el motivo de la cancelación de la solicitud.",
      content: "input",
      buttons: ["Volver", "Cancelar solicitud"],
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
          swal(
            "",
            "Por favor justifica el motivo de la cancelación.",
            "warning"
          );
        }
      }
    });
  };

  // STATUS 0
  if (toSubmitData?.caracterizacion?.crcf3_id_estado_solicitud === 0) {
    return (
      <div className="pt-6">
        <p className="text-center text-8xl mb-6 text-green-300">
          <i className="fa fa-paper-plane animate-pulse"></i>
        </p>
        <h2 className="text-primary text-center font-bold text-xl">
          Enviar a Interventor
        </h2>
        <p className="text-center">
          Estás a punto de enviar todos los datos del formulario, ¿Estás segur@?
        </p>
        <div className="flex justify-between mt-8">
          <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
          <Button onClick={() => postFormData(toSubmitData)}>Enviar</Button>
        </div>
      </div>
    );
  }

  // STATUS 4
  if (toSubmitData?.caracterizacion?.crcf3_id_estado_solicitud === 4) {
    return (
      <div className="pt-6">
        <p className="text-center text-8xl mb-6 text-green-300">
          <i className="fa fa-file-import animate-pulse"></i>
        </p>
        <h2 className="text-primary text-center font-bold text-xl">
          Enviar a Interventor
        </h2>
        <p className="text-center">
          Enviarás de nuevo los datos al Interventor para ser evaluados, ¿Estás
          segur@?
        </p>
        <div className="flex justify-between mt-8">
          <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
          <Button
            onClick={() => {
              if (requestId) {
                updateFormData(requestId, updateRequestStatus());
              }
            }}
          >
            Enviar
          </Button>
        </div>
      </div>
    );
  }

  // STATUS 2 VALIDATING PROVIDER
  if (toSubmitData?.caracterizacion?.crcf3_id_estado_solicitud === 2) {
    return (
      <div className="pt-6">
        <p className="text-center text-8xl mb-6 text-green-300">
          <i className="fa fa-handshake animate-pulse"></i>
        </p>
        <h2 className="text-primary text-center font-bold text-xl">
          Validar Propuesta del Proveedor
        </h2>
        <p className="text-center">
          Según tu criterio, puedes aprobar o no, la respuesta del proveedor.
        </p>
        <div className="flex justify-center mt-5">
          <Button onClick={() => requestId && actionReject(requestId, 7)}>
            No Aprobar
          </Button>
          <Button
            className="mx-2"
            onClick={() => requestId && actionAprove(requestId, 5)}
          >
            Aprobar
          </Button>
        </div>
        <div className="flex justify-between mt-8 border-t pt-5">
          <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
        </div>
      </div>
    );
  }

  // OTHER STATUS - Only can cancel the request
  return (
    <div className="pt-6">
      <p className="text-center text-8xl mb-6 text-green-300">
        <i className="fa fa-check-circle animate-pulse"></i>
      </p>
      <h2 className="text-primary text-center font-bold text-xl">
        ¡Todo Al Día!
      </h2>
      <p className="text-center">
        No tienes acciones disponibles sobre esta solicitud.{" "}
        <a
          href="#"
          onClick={() => requestId && actionCancel(requestId, 9)}
          className="text-primary"
        >
          Pero, puedes cancelarla
        </a>
        .
      </p>
      <div className="flex justify-between mt-8">
        <Button onClick={() => setSelectedStep(props.prev)}>Volver</Button>
      </div>
    </div>
  );
};

export default ActionsLeader;
