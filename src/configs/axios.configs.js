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
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyNCIsIkhldEhhblN0cmluZyI6IjI1LzExLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2OTMzNDQwMDAwMCIsIm5iZiI6MTYzNzk0NjAwMCwiZXhwIjoxNjY5NDgyMDAwfQ.vwkhYBKLRzJB0Tm18qLCchebQxHvEsbsbUYBmlawj5s",
      Authorization: getAccessToken(),
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

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
    return Promise.reject(error);
  }
);
