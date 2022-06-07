import { axiosClient } from "../configs/axios.configs";

export const loginUser = async (data) => {
  return await axiosClient.post("/Users/signin", data);
};

export const registerUser = async (data) => {
  return await axiosClient.post("/Users/signup", data);
};
