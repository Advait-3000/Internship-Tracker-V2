import api from "@/shared/lib/axios";

export const getCompanyDetailsApi = async (companyId) => {
  const response = await api.get(`/companies/${companyId}`);
  return response.data;
};
