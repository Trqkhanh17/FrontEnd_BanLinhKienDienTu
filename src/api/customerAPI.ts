import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const updateProfileAPI = async (data: any) => {
  const res: AxiosResponse = await apiClient.put("/customer/update", data);
  return res;
}
export interface updateProfile {
  cus_email: string,
  cus_name: string,
  cus_address: string,
  cus_birthday: string,
  cus_phone: string,
}
export const listCustomerAPI = async () => {
  const res: AxiosResponse = await apiClient.get("/customer");
  return res;
};