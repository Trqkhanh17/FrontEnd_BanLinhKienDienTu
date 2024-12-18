import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const getListOrderDetailAPI = async (id: number) => {
    const res: AxiosResponse = await apiClient.post(`/orderDetails/${id}`);
    return res;
}