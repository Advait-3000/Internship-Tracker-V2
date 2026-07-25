import api from "@/shared/lib/axios";

export const getFacultyDetailsApi = async (facultyId) => {
  const response = await api.get(`/faculty/${facultyId}`);
  return response.data;
};
