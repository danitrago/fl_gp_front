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

export const updateFormData = (id: string, data: any) => {
  // console.log("Patching...");
  // console.log(data);
  return axios
    .patch(`${getApiUrl()}/api/solicitudes/${id}`, data)
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

export const getAllRequests = (userId: number) => {
  return axios
    .get(`${getApiUrl()}/api/solicitudes/admin/${userId}`)
    .then((res) => res.data);
};

export const getMyRequests = (userId: number) => {
  return axios
    .get(`${getApiUrl()}/api/solicitudes/owner/${userId}`)
    .then((res) => res.data);
};

export const getMyPendings = (userId: number) => {
  return axios
    .get(`${getApiUrl()}/api/solicitudes-pendings`, {
      headers: {
        authorization:
          `Bearer ${window.sessionStorage.getItem("user-jwt")?.toString()}` || ''
      },
    })
    .then((res) => res.data);
};
