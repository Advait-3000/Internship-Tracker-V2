import api from "@/shared/lib/axios";

export const getAttendanceApi = async (params) => {
  const response = await api.get("/attendance", { params });
  return response.data;
};

export const markAttendanceApi = async (data) => {
  const response = await api.post("/attendance", data);
  return response.data;
};
