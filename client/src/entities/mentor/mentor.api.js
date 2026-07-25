import api from "@/shared/lib/axios";

export const getMentorDetailsApi = async (mentorId) => {
  const response = await api.get(`/mentors/${mentorId}`);
  return response.data;
};
