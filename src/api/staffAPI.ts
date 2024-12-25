import { AxiosResponse } from "axios";
import { apiClient } from "../hooks/apiClient";

export const getAllStaff = async () => {
  const res: AxiosResponse = await apiClient.get("/staff/list-all");
  return res;
};

export const createStaff = async (data:any)=>{
  const res: AxiosResponse = await apiClient.post('/sign-up-staff',data);
  return res;
}
export const getStaffById = async (staff_id:any)=>{
  const res: AxiosResponse = await apiClient.get(`/staff/${staff_id}`);
  return res;
};