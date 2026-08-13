import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const getListStatistics = async () => {
    const res:AxiosResponse = await apiClient.get("/stats-overall");
    return res;
};
export const getDailyStatsAPI = async (dateInput:string) => {
    const res:AxiosResponse = await apiClient.post("/stats-daily",{date:dateInput});
    return res;
};
export const getMonthlyStatsAPI = async () => {
    const res:AxiosResponse = await apiClient.get("/stats-monthly");
    return res;
};
export const getYearlyStatsAPI = async () => {
    const res:AxiosResponse = await apiClient.get("/stats-yearly");
    return res;
};
