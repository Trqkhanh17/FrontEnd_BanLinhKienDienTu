import { apiClient } from "../hooks/apiClient";

export const getCookie = (cname: string) => {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const deleteCookie = (cname: string) => {
  setCookie(cname, "", 0);
};

export const setSession = (
  key: string,
  initialValue: [] | string | number | object
) => {
  sessionStorage.setItem(key, JSON.stringify(initialValue));
};

export const getSession = (key: string) => {
  const result = JSON.parse(sessionStorage.getItem(key) + "");
  return result;
};

export const removeSession = (key: string) => {
  sessionStorage.removeItem(key);
};

export const uploadFileAPI = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post("/uploadfile",formData)
  return response
};
