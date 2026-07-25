import api from "@/shared/lib/axios";

export const getEvaluationsApi = async (params) => {
  const response = await api.get("/evaluations", { params });
  return response.data;
};

export const submitEvaluationApi = async (data) => {
  const response = await api.post("/evaluations", data);
  return response.data;
};
