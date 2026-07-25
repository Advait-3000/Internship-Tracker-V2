import api from "@/shared/lib/axios";

export const getStudentDetailsApi = async (studentId) => {
  const response = await api.get(`/students/${studentId}`);
  return response.data;
};
