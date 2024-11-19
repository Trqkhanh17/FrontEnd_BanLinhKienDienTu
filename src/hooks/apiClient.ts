import axios from "axios";
import { getCookie } from "../utils";

const token = getCookie("token")

export const apiClient = axios.create(
    {
        baseURL:import.meta.env.ORIGIN_URL,
        headers:{
            Authorization:"Bearer " + token ? token :""
        }
    }
)