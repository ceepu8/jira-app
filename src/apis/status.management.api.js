import { axiosClient } from "../configs/axios.configs";

export const getStatus = () => {
  return axiosClient.get("/Status/getAll");
};
