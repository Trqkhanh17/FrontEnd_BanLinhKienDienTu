import axios from "axios";
import { getCookie } from "../utils";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ORIGIN_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});
