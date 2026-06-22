import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const getListStock = async()=>{
    const res:AxiosResponse = await apiClient.get("/stock/list-all");
    return res;
}
export const createStock = async(data:any)=>{
    const res:AxiosResponse = await apiClient.post("/stock/create",data);
    return res;
}
export const updateStock = async(data:any)=>{
    const res:AxiosResponse = await apiClient.put("/stock/update",data);
    return res;
}
export const exportStock = async(data:any)=>{
    const res:AxiosResponse = await apiClient.put("/stock/export",data);
    return res;
}
export const getListStockByproId = async(pro_id:any)=>{
    const res:AxiosResponse = await apiClient.get(`/stock/getStockByproId/${pro_id}`);
    return res;
}
export const deleteStock = async(stock_id:any)=>{
    const res:AxiosResponse = await apiClient.delete("/stock/delete", {
        data: { stock_id },
    });
    return res;
}
export const findStockAPI = async(pro_name:string)=>{
    const res:AxiosResponse = await apiClient.get("/stock/find", {
        params: { pro_name },
    });
    return res;
}
