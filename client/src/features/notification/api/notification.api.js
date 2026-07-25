import api from "@/shared/lib/axios";

export const getNotificationsApi = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

export const markNotificationReadApi = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};
