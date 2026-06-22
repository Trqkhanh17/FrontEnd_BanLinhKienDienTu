import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const listGalleryAPI = async () => {
  const res: AxiosResponse = await apiClient.get("/gallery/list-all");
  return res;
};

export const createGalleryAPI = async (data: any) => {
  const res: AxiosResponse = await apiClient.post("/gallery/create", data);
  return res;
};

export const updateGalleryAPI = async (data: any) => {
  const res: AxiosResponse = await apiClient.put("/gallery/update", data);
  return res;
};

export const deleteGalleryAPI = async (gal_id: string | number) => {
  const res: AxiosResponse = await apiClient.delete("/gallery/delete", {
    data: { gal_id },
  });
  return res;
};

export const getGalleryByIdAPI = async (galId: string | number) => {
  const res: AxiosResponse = await apiClient.get(`/gallery/getGalleryById/${galId}`);
  return res;
};
