import axiosInstance from "./axios";

export const setSession = (authToken) => {
  if (!authToken) return;
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  localStorage.setItem("authToken", authToken);
};

export const clearSession = async () => {
  axiosInstance.defaults.headers.common.Authorization = ``;
  localStorage.removeItem("authToken");
};

export const getSession = () => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    console.log("TOKEN SET");
  }
  return authToken;
};
