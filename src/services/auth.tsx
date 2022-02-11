import axios from "axios";
import { getApiUrl } from "../helpers";

let headers = {
  Authorization: `Bearer ${window.sessionStorage.getItem("user-jwt")}`,
  "Content-Type": "application/json",
};

export const getUserContract = (token: string) => {
  return axios
    .post(`${getApiUrl()}/api/list/verifyJwt`, {
      token: token,
    }, {
      headers: headers,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error al autenticar usuario.");
      console.log(err);
    });
};
