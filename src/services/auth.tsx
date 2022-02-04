import axios from "axios";
import { getApiUrl } from "../helpers";

export const getUserContract = (token: string) => {
  return axios
    .post(`${getApiUrl()}/api/list/verifyJwt`, {
      token: token,
    })
    .then((res) => res.data)
    // .catch(() => {
    //   // return {
    //   //   userId: 1,
    //   //   user: "Daniel Molina",
    //   //   email: "danielfmolina@comfama.com.co",
    //   //   role: "leader",
    //   // };
    //   return {
    //     userId: 2,
    //     user: "Ana María",
    //     email: "danielfmolina@comfama.com.co",
    //     role: "controller",
    //   };
    // });
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
