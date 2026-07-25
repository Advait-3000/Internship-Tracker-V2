import api from "@/shared/lib/axios";

export const getEntityApplicationApi = async (id) => {
  const response = await api.get(`/applications/${id}`);
  return response.data;
};
