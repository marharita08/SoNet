import apiClient from "../config/axios";

export const insertComment = (comment) => {
  return apiClient.post("/comments", comment);
};

export const deleteComment = (id) => {
  return apiClient.delete(`/comments/${id}`);
};

export const updateComment = (comment) => {
  return apiClient.put(`/comments/${comment.comment_id}`, comment);
};
