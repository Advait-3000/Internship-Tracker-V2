import api from "@/shared/lib/axios";

export const generateReportApi = async (params) => {
  const response = await api.post("/reports/generate", params);
  return response.data;
};

export const getReportsListApi = async () => {
  const response = await api.get("/reports");
  return response.data;
};
