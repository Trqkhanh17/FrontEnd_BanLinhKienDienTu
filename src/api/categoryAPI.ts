import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const listCategoryAPI = async () => {
  const res: AxiosResponse = await apiClient.get(`/category/list-all`);
  return res;
};
export const addCategoryAPI = async (data: any) => {
  const res: AxiosResponse = await apiClient.post(`/category/create`, data);
  return res;
};
export const deleteCategoryAPI = async(cate_id:any)=>{
  const res: AxiosResponse = await apiClient.delete(`/category/delete`, {
    data: { cate_id },
  });
  return res;
}
export const updateCategoryAPI = async(data:any)=>{
  const res: AxiosResponse = await apiClient.put(`/category/update`,data);
  return res;
}
export const findCategoryAPI = async(cate_name:string)=>{
  const res: AxiosResponse = await apiClient.get(`/category/find`, {
    params: { cate_name },
  });
  return res;
}
export const getCategoryByIdAPI = async(cateId:string | number)=>{
  const res: AxiosResponse = await apiClient.get(`/category/${cateId}`);
  return res;
}
