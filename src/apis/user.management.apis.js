import { axiosClient } from "../configs/axios.configs";

export const loginUser = (data) => {
  return axiosClient.post("/Users/signin", data);
};

export const registerUser = (data) => {
  return axiosClient.post("/Users/signup", data);
};

export const updateUserInfo = (data) => {
  return axiosClient.put("/Users/editUser", data);
};

export const getAllUser = () => {
  return axiosClient.get("/Users/getUser");
};

export const getUser = (keyword) => {
  return axiosClient.get(`Users/getUser?keyword=${keyword}`);
};
