import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const getListOrderDetailAPI = async (id: number) => {
    const res: AxiosResponse = await apiClient.get(`/orderDetails/${id}`);
    return res;
}

export const getAllOrderDetailsAPI = async () => {
    const res: AxiosResponse = await apiClient.get(`/orderDetails`);
    return res;
}

export const updateOrderDetailAPI = async (data: any) => {
    const res: AxiosResponse = await apiClient.put(`/orderDetails/update`, data);
    return res;
}
