import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const getAllStaff = async () => {
  const res: AxiosResponse = await apiClient.get("/staff/list-all");
  return res;
};
