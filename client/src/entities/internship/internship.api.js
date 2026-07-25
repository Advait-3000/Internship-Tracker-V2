import api from "@/shared/lib/axios";

export const getEntityInternshipApi = async (id) => {
  const response = await api.get(`/internships/${id}`);
  return response.data;
};
