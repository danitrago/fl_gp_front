import axios from "axios";
import { alertMsg, getApiUrl } from "../helpers";
import { IFieldsData } from "../types/form-fields";
// const ddlFile = require("../assets/ddl.json");
// const solicitudDemo = require("../assets/solicitud.json");
// const fetchedData = require("../assets/solicitudes-data.json");

export const getDdlOptions = () => {
  return axios.get(`${getApiUrl()}/api/list/ddl`).then((res) => res.data);
};

export const getFormData = (id: string) => {
  return axios
    .get(`${getApiUrl()}/api/solicitudes/${id}`)
    .then((res) => res.data);
  // .catch((err) => {
  //   // alert("No tienes permisos para ver esta información.");
  //   // window.location.href = "/FlujoGestionTI";
  //   return solicitudDemo;
  // });
};

export const postFormData = (data: IFieldsData) => {
  // console.log("Posting...");
  // console.log(data);
  return axios
    .post(`${getApiUrl()}/api/solicitudes`, data)
    .then(() => {
      alertMsg("¡Hecho!", "Tu solicitud ha sido creada.", "success");
      setTimeout(() => {
        window.location.href = process.env.PUBLIC_URL;
      }, 2000);
    })
    .catch(() =>
      alertMsg(
        "¡Ups!",
        "Error al crear la solicitud, intenta de nuevo más tarde.",
        "error"
      )
    );
};

export const updateRequestStatus = (id: string, newStatus: number) => {
  let payload = {
    caracterizacion: {
      crcf3_id_estado_solicitud: newStatus,
    },
  };
  return axios
    .patch(`${getApiUrl()}/api/solicitudes/${id}`, payload)
    .then(() => {
      alertMsg("¡Hecho!", "La solicitud ha sido actualizada.", "success");
      setTimeout(() => {
        window.location.href = process.env.PUBLIC_URL;
      }, 2000);
    })
    .catch(() =>
      alertMsg(
        "¡Ups!",
        "Error al actualizar la solicitud, intenta de nuevo más tarde.",
        "error"
      )
    );
};

export const updateFormData = (id: string, data: IFieldsData) => {
  // console.log("Patching...");
  // console.log(data);
  return axios
    .patch(`${getApiUrl()}/api/solicitudes/${id}`, data)
    .then(() => alert("¡Hecho! Tu solicitud ha sido modificada."))
    .catch(() => alert("Error al modificar la solicitud."));
};

export const getMyRequests = (userId: number) => {
  return axios
    .get(`${getApiUrl()}/api/solicitudes/owner/${userId}`)
    .then((res) => res.data);
};
