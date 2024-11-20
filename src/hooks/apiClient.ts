import axios from "axios";
import { getCookie } from "../utils";

const token = getCookie("token");
console.log(import.meta.env.VITE_ORIGIN_URL);

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ORIGIN_URL,
  headers: {
    Authorization: "Bearer " + token ? token : "",
  },
  withCredentials: true,
});
