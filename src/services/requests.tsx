import axios from "axios";
import { getApiUrl, processData } from "../helpers";
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
  console.log('Posting...');
  console.log(data);
  return axios
    .post(`${getApiUrl()}/api/solicitudes`, data)
    .then(() => alert("¡Hecho! Tu solicitud ha sido creada."))
    .catch(() => alert("Error al crear la solicitud."));
};

export const updateRequestStatus = (id: string, newStatus: number) => {
  let payload = {
    crcf3_id_estado_solicitud: newStatus,
  };
  return axios
    .patch(`${getApiUrl()}/api/solicitudes/${id}`, payload)
    .then(() => alert("¡Hecho! Tu solicitud ha sido modificada."))
    .catch(() => alert("Error al modificar la solicitud."));
};

export const updateFormData = (id: string, data: IFieldsData) => {
  console.log('Patching...');
  console.log(data);
  return axios
    .patch(`${getApiUrl()}/api/solicitudes/${id}`, processData(data))
    .then(() => alert("¡Hecho! Tu solicitud ha sido modificada."))
    .catch(() => alert("Error al modificar la solicitud."));
};

export const getMyRequests = () => {
  return axios
    .get(`${getApiUrl()}/api/solicitudes/owner/123-456-789`)
    .then((res) => res.data)
    .catch(() => fetchedData);
};
