import api from "@/shared/lib/axios";

export const getUserProfileApi = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUserProfileApi = async (userId, data) => {
  const response = await api.put(`/users/${userId}`, data);
  return response.data;
};
