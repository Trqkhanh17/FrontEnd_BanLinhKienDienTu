import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const getListStatistics = async () => {
    const res:AxiosResponse = await apiClient.get("/stats-order");
    return res;
};
export const getDailyStatsAPI = async (dateInput:string) => {
    const res:AxiosResponse = await apiClient.post("/stats-daily",{date:dateInput});
    return res;
};