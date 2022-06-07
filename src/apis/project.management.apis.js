import { axiosClient } from "../configs/axios.configs";

export const getAllProject = () => {
  return axiosClient.get("/Project/getAllProject");
};

export const getDetailProject = (projectDetailId) => {
  return axiosClient.get(`/Project/getProjectDetail?id=${projectDetailId}`);
};

export const deleteProject = (projectId) => {
  return axiosClient.delete(`/Project/deleteProject?projectId=${projectId}`);
};
