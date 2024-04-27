import apiClient from "../config/axios";

export const getRecommendations = async (id, country) => {
  return apiClient.get(`/recommendations/general/${id}?country=${country}`);
};
