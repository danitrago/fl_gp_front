import axios from "axios";
import { getApiUrl } from "../helpers";

export const getUserContract = (token: string) => {
  return axios
    .get(`${getApiUrl()}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch(() => {
      // return {
      //   userId: 6,
      //   user: "Daniel Molina",
      //   email: "danielfmolina@comfama.com.co",
      //   role: "controller", 
      // };
      return {
        userId: 1,
        user: "Daniel Molina",
        email: "danielfmolina@comfama.com.co",
        role: "leader", 
      };
    });
};

// export const postFormData = (data: IFieldsData) => {
//   return axios
//     .post(`${getApiUrl()}/api/fl-gp-solicitudes`, data)
//     .then(() => alert("¡Hecho! Tu solicitud ha sido creada."))
//     .catch(() => alert("Error al crear la solicitud."));
// };

// export const updateFormData = (data: IFieldsData) => {
//   return axios
//     .put(`${getApiUrl()}/api/fl-gp-solicitudes`, data)
//     .then(() => alert("¡Hecho! Tu solicitud ha sido modificada."))
//     .catch(() => alert("Error al modificar la solicitud."));
// };

// export const getMyRequests = () => {
//   return axios
//     .get(`${getApiUrl()}/api/get-my-requests`)
//     .then((res) => res.data)
//     .catch(() => fetchedData);
// };
