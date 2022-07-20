import { axiosClient } from "../configs/axios.configs";

export const getAllProject = () => {
  return axiosClient.get("/Project/getAllProject");
};

export const getDetailProject = (projectDetailId) => {
  return axiosClient.get(`/Project/getProjectDetail?id=${projectDetailId}`);
};

export const createProject = (data) => {
  return axiosClient.post("/Project/createProjectAuthorize", data);
};

export const updateProject = (data) => {
  return axiosClient.put(`/Project/updateProject?projectId=${data.id}`, data);
};

export const deleteProject = (projectId) => {
  return axiosClient.delete(`/Project/deleteProject?projectId=${projectId}`);
};

export const removeMemberProject = (data) => {
  console.log(data);
  return axiosClient.post("/Project/removeUserFromProject", data);
};

export const addMemberProject = (data) => {
  return axiosClient.post("/Project/assignUserProject", data);
};
