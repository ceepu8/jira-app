import { axiosClient } from "../configs/axios.configs";

export const createTask = (data) => {
  return axiosClient.post("/Project/createTask", data);
};

export const getTaskDetail = (taskId) => {
  return axiosClient.get(`/Project/getTaskDetail?id=${taskId}`);
};

export const updateTaskStatus = (data) => {
  return axiosClient.put(`/Project/updateStatus`, data);
};
