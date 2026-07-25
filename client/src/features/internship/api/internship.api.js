import api from "@/shared/lib/axios";

export const getInternshipsApi = async (params) => {
  const response = await api.get("/internships", { params });
  return response.data;
};

export const getInternshipByIdApi = async (id) => {
  const response = await api.get(`/internships/${id}`);
  return response.data;
};

export const createInternshipApi = async (data) => {
  const response = await api.post("/internships", data);
  return response.data;
};

export const updateInternshipApi = async (id, data) => {
  const response = await api.put(`/internships/${id}`, data);
  return response.data;
};

export const deleteInternshipApi = async (id) => {
  const response = await api.delete(`/internships/${id}`);
  return response.data;
};
