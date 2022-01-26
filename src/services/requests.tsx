import axios from "axios";
import { getApiUrl } from "../helpers";
import { IFieldsData } from "../types/form-fields";
const ddlFile = require("../assets/ddl.json");
const solicitudDemo = require("../assets/solicitud.json");
const fetchedData = require("../assets/solicitudes-data.json");

export const getDdlOptions = () => {
  return axios
    .get(`${getApiUrl()}/api/list/ddl-fl-gp`)
    .then((res) => res.data)
    .catch(() => ddlFile);
};

export const getFormData = (id: string) => {
  return axios
    .get(`${getApiUrl()}/api/solicitudes/${id}`)
    .then((res) => res.data)
    .catch(() => solicitudDemo);
};

export const postFormData = (data: IFieldsData) => {
  return axios
    .post(`${getApiUrl()}/api/solicitudes`, data) 
    .then(() => alert("¡Hecho! Tu solicitud ha sido creada."))
    .catch(() => alert("Error al crear la solicitud."));
};

export const updateFormData = (data: IFieldsData) => {
  return axios
    .put(`${getApiUrl()}/api/fl-gp-solicitudes`, data)
    .then(() => alert("¡Hecho! Tu solicitud ha sido modificada."))
    .catch(() => alert("Error al modificar la solicitud."));
};

export const getMyRequests = () => {
  return axios
    .get(`${getApiUrl()}/api/get-my-requests`)
    .then((res) => res.data)
    .catch(() => fetchedData);
};
