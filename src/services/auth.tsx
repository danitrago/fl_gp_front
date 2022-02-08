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
      console.log("11111111111111111111111111111111111");
      console.log(err);
    });
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
