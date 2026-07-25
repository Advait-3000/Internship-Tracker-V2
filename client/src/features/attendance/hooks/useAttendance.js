import { useSelector, useDispatch } from 'react-redux';
import { setAttendanceRecords, setLoading, setError } from '../store/attendanceSlice';
import { getAttendanceApi } from '../api/attendance.api';

export const useAttendance = () => {
  const dispatch = useDispatch();
  const { attendanceRecords, loading, error } = useSelector((state) => state.attendance);

  const fetchAttendance = async (params) => {
    dispatch(setLoading(true));
    try {
      const data = await getAttendanceApi(params);
      dispatch(setAttendanceRecords(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { attendanceRecords, loading, error, fetchAttendance };
};

export default useAttendance;
