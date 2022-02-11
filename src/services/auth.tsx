import axios from "axios";
import { getApiUrl, headersAuth } from "../helpers";

export const getUserContract = (token: string) => {
  return axios
    .post(`${getApiUrl()}/api/list/verifyJwt`, {'data':'data'}, {
      headers: headersAuth,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error al autenticar usuario.");
      console.log(err);
    });
};
