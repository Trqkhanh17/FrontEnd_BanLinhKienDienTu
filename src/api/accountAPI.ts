import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const getAllAccount = async () => {
  const res: AxiosResponse = await apiClient.get("/account/list-all");
  return res;
};
