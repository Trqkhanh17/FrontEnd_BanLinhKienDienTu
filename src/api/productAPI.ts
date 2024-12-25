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

export const listNewProduct = async () => {
  const res: AxiosResponse = await apiClient.get(`/product/new-product`);
  return res;
};
export const createProductAPI = async (product: any) => {
  const res: AxiosResponse = await apiClient.post(`/product/create`, product);
  return res;
}
export const updateProductAPI = async (product: any) => {
  const res: AxiosResponse = await apiClient.put(`/product/update`, product);
  return res;
} 
export const deleteProductAPI = async (product: any) => {
  const res: AxiosResponse = await apiClient.put(`/product/delete`,product);
  return res;
} 