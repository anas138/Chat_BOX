import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Create an Axios instance with default configuration

export const instance = () => {};
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Base URL for all requests
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.stringify(
      localStorage?.getItem("access-token")
    )}`,
  },
});

export const getRequest = async <T>(route: string): Promise<T | undefined> => {
  try {
    const response = await axiosInstance.get(route);
    return response.data;
  } catch (error) {}
};

export const postRequest = async (route: string, data: any) => {
  try {
    const response = await axiosInstance.post(route, data);
    return response.data;
  } catch (error) {}
};
