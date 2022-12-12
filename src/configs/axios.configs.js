import axios from "axios";
import { userLocalService } from "../local-services/local-service";

const getAccessToken = () => {
  const currentUser = userLocalService.getUserInfor();
  if (currentUser) {
    return "Bearer " + currentUser.accessToken;
  }
  return "";
};

export const axiosClient = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNyIsIkhldEhhblN0cmluZyI6IjIzLzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDgwMDAwMDAwMCIsIm5iZiI6MTY1NzIxMzIwMCwiZXhwIjoxNjg0OTQ3NjAwfQ.uVmhasF9oy0mXFYvSl8tBIUY7ZRmZ-U0hLsBB75mkn8",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = getAccessToken();
  }
  return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response?.data);
  }
);
