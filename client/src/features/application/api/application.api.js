import api from "@/shared/lib/axios";

export const getApplicationsApi = async (params) => {
  const response = await api.get("/applications", { params });
  return response.data;
};

export const submitApplicationApi = async (data) => {
  const response = await api.post("/applications", data);
  return response.data;
};

export const updateApplicationStatusApi = async (id, status) => {
  const response = await api.patch(`/applications/${id}/status`, { status });
  return response.data;
};
