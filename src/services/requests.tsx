import axios from "axios";
import { getApiUrl } from "../helpers";
const fetchedData = require("../assets/solicitudes-data.json");

export const getMyRequests = () => {
  return axios
    .get(`${getApiUrl()}/api/get-requests-xxx`)
    .then((res) => res.data)
    .catch(() => fetchedData);
};
