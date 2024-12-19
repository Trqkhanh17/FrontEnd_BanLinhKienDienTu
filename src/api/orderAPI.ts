import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const createOrderAPI = async (data: any) => {
    const res: AxiosResponse = await apiClient.post("/order/create", data);
    return res;
}

export const createOrderDetailAPI = async (data: any) => {
    const res: AxiosResponse = await apiClient.post("/orderDetails/create", data);
    return res;
};

export const listOrderAPI = async () => {
    const res: AxiosResponse = await apiClient.get("/order");
    return res;
};

export const listOrderByIdAPI = async (cusId:string) => {
    const res: AxiosResponse = await apiClient.get(`/order/${cusId}`);
    return res;
};