import axios from "axios";
import { getCookie } from "../utils";

export const API_BASE_URL = (import.meta.env.VITE_ORIGIN_URL || "http://localhost:8000/api/v1").replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else delete config.headers.Authorization;
  return config;
});
