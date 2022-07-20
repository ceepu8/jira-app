import { axiosClient } from "../configs/axios.configs";

export const insertComment = (data) => {
  return axiosClient.post("/Comment/insertComment", data);
};

export const getAllComment = (taskId) => {
  return axiosClient.get(`/Comment/getAll?taskId=${taskId}`);
};

export const deleteComment = (commentId) => {
  return axiosClient.delete(`/Comment/deleteComment?idComment=${commentId}`);
};

export const updateComment = (data) => {
  const { commentId, contentComment } = data;
  return axiosClient.put(
    `/Comment/updateComment?id=${commentId}&contentComment=${contentComment}`
  );
};
