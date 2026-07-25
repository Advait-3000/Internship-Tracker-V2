import { useSelector, useDispatch } from 'react-redux';
import { setNotifications, setLoading } from '../store/notificationSlice';
import { getNotificationsApi } from '../api/notification.api';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount, loading } = useSelector((state) => state.notification);

  const fetchNotifications = async () => {
    dispatch(setLoading(true));
    try {
      const data = await getNotificationsApi();
      dispatch(setNotifications(data));
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { notifications, unreadCount, loading, fetchNotifications };
};

export default useNotifications;
