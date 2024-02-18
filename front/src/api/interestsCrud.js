import apiClient from "../config/axios";

export const getInterests = async () => {
  return apiClient.get("/interests");
};
