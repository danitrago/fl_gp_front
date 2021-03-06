import React, { useEffect } from "react";
import { getRedirectUri } from "../helpers";

const useAthentication = () => {
  const getCode = () => {
    const Authorization_Endpoint = `https://aaz0175.my.idaptive.app/OAuth2/Authorize/GESTION_PROVEEDORES_TI_DEV`;
    const Response_Type = "code";
    const Client_Id = "42c59d10-d4c9-489b-a841-85f9c6c561ce";
    const Redirect_Uri = getRedirectUri() as string;
    const Scope = "openid profile email";
    // const State = "ThisIsMyStateValue";

    // let url = `${Authorization_Endpoint}?response_type=${Response_Type}&client_id=${Client_Id}&redirect_uri=${Redirect_Uri}&scope=${Scope}&state=${State}`;
    let url = `${Authorization_Endpoint}?response_type=${Response_Type}&client_id=${Client_Id}&redirect_uri=${Redirect_Uri}&scope=${Scope}`;

    window.location.href = url;
  };

  const getToken = (code: string) => {
    return new Promise((resolve, reject) => {
      const Token_Endpoint = `https://comfama.my.idaptive.app/OAuth2/Token/GESTION_PROVEEDORES_TI_DEV`;
      const Grant_Type = "authorization_code";
      const Code = code;
      const Redirect_Uri = getRedirectUri() as string;
      const Client_Id = "42c59d10-d4c9-489b-a841-85f9c6c561ce";
      const Client_Secret = "j6uQR-9jtDFGDa-NCzr7wcy-6eorpGM9-DRAmDK";
      const Scope = "openid profile email";

      let body = `grant_type=${Grant_Type}&code=${Code}&redirect_uri=${encodeURIComponent(
        Redirect_Uri
      )}&client_id=${Client_Id}&client_secret=${Client_Secret}&scope=${encodeURIComponent(
        Scope
      )}`;

      fetch(Token_Endpoint, {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then(async (response) => {
          let json = await response.json();
          console.log(json);
          window.sessionStorage.setItem("user-jwt", json.id_token);
          resolve(true);
          // window.location.href = getRedirectUri() as string;
          // return json;
        })
        .catch((error) => {
          console.log(error);
          reject(false);
        });
    });
  };

  const autenticate = () => {
    return new Promise((resolve, reject) => {
      const jwt = sessionStorage.getItem("user-jwt") || "";
      if (!jwt) {
        let urlString = window.location.href;
        var url = new URL(urlString);
        var responseType = url.searchParams.get("responseType");
        var code = url.searchParams.get("code");
        if (responseType && code) {
          getToken(code)
            .then(() => resolve(true))
            .catch(() => reject(false));
        } else {
          getCode();
        }
      } else {
        resolve(true);
      }
    });
  };

  return {
    getCode,
    getToken,
    autenticate,
  };
};

export default useAthentication;
