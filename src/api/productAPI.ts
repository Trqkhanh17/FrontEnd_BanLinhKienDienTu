import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const listProductAPI = async () => {
  const res: AxiosResponse = await apiClient.get(`/product/list-all`);
  return res;
};

export const getProductByIDAPI = async (proId: string) => {
  const res: AxiosResponse = await apiClient.get(`/product/${proId}`);
  return res;
};
