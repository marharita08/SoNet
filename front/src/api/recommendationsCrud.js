import apiClient from "../config/axios";

export const getRecommendations = async (id) => {
  return apiClient.get(`/recommendations/general/${id}`);
};
