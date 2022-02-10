import axios from "axios";
import { getApiUrl } from "../helpers";

export const getUserContract = (token: string) => {
  console.log("Getting Contract");
  return axios
    .post(`${getApiUrl()}/api/list/verifyJwt`, {
      token: token,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error al autenticar usuario.");
      console.log(err);
    });
};
