import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const sendMailOrderAPI = async (order: any) => {
    const res:AxiosResponse = await apiClient.post(`/sendMailOrder`, order);
    return res;
};