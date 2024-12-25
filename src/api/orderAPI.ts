import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";
import { retry } from "@reduxjs/toolkit/query";

export const createOrderAPI = async (data: any) => {
    const res: AxiosResponse = await apiClient.post("/order/create", data);
    return res;
}

export const createOrderDetailAPI = async (data: any) => {
    const res: AxiosResponse = await apiClient.post("/orderDetails/create", data);
    return res;
};

export const listOrderAPI = async () => {
    const res: AxiosResponse = await apiClient.get("/order/list-all");
    return res;
};

export const listOrderByIdAPI = async (cusId:string) => {
    const res: AxiosResponse = await apiClient.get(`/order/${cusId}`);
    return res;
};
export const rejectedOrderAPI = async (orderId:string)=>{
    const res: AxiosResponse = await apiClient.put("/order/delete",orderId);
    return res;
}
export const getOrderByOrderIdAPI = async (orderId:any)=>{
    const res:AxiosResponse = await apiClient.get(`/getorderbyid/${orderId}`);
    return res; 
}

export const updateStatus = async (data:any)=>{
    const res: AxiosResponse = await apiClient.put("/order/update",data);
    return res;
}