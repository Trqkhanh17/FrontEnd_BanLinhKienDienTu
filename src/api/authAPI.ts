import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const loginAPI = async (email: string, password: string) => {
  const res: AxiosResponse = await apiClient.post(`/login`, {
    acc_email: email,
    password: password,
  });
  return res;
};

export interface Register {
  acc_email: string;
  password: string;
  cus_name: string;
  cus_address: string;
  cus_phone: string;
  cus_birthday: string;
}

export const registerAPI = async (data: Register) => {
  const res: AxiosResponse = await apiClient.post("/sign-up-customer", data);
  return res;
};

export const getProfileAPI = async () => {
  const res: AxiosResponse = await apiClient.get("/get-profile");
  return res;
};
