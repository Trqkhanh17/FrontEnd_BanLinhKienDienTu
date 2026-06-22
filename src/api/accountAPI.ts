import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const getAllAccount = async () => {
  const res: AxiosResponse = await apiClient.get("/account/list-all");
  return res;
};

export const findAccountByEmailAPI = async (acc_email: string) => {
  const res: AxiosResponse = await apiClient.get("/account/find-by-email", {
    params: { acc_email },
  });
  return res;
};

export const getAccountByEmailAPI = async (acc_email: string) => {
  const res: AxiosResponse = await apiClient.get("/account/getaccount-by-email", {
    params: { acc_email },
  });
  return res;
};

export const changePasswordAPI = async (data: any) => {
  const res: AxiosResponse = await apiClient.put("/account/change-password", data);
  return res;
};
