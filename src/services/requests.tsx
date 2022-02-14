import axios from "axios";
import { alertMsg, getApiUrl, headersAuth } from "../helpers";
import { IFieldsData } from "../types/form-fields";
// const ddlFile = require("../assets/ddl.json");
// const solicitudDemo = require("../assets/solicitud.json");
// const fetchedData = require("../assets/solicitudes-data.json");

export const getDdlOptions = () => {
  return axios
    .get(`${getApiUrl()}/api/list/ddl`, {
      headers: headersAuth(),
    })
    .then((res) => res.data);
};

export const getFormData = (id: string) => {
  return axios
    .get(`${getApiUrl()}/api/solicitudes/${id}`, {
      headers: headersAuth(),
    })
    .then((res) => res.data);
};

export const postFormData = (data: IFieldsData) => {
  return axios
    .post(`${getApiUrl()}/api/solicitudes`, data, {
      headers: headersAuth(),
    })
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
  return axios
    .patch(`${getApiUrl()}/api/solicitudes/${id}`, data, {
      headers: headersAuth(),
    })
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
    .get(`${getApiUrl()}/api/solicitudes/admin/${userId}`, {
      headers: headersAuth(),
    })
    .then((res) => res.data);
};

export const getMyRequests = (userId: number) => {
  return axios
    .get(`${getApiUrl()}/api/solicitudes/owner/${userId}`, {
      headers: headersAuth(),
    })
    .then((res) => res.data);
};

export const getMyPendings = (userId: number) => {
  return axios
    .get(`${getApiUrl()}/api/solicitudes-pendings`, {
      headers: headersAuth(),
    })
    .then((res) => res.data);
};
