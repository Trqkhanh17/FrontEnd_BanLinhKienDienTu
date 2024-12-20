import axios from "axios";
import { getCookie } from "../utils";

const token = getCookie("token");

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ORIGIN_URL,
  headers: {
    Authorization: token ? "Bearer " + token : "",
  },
  withCredentials: true,
});
