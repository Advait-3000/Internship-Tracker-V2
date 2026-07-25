import { useSelector, useDispatch } from 'react-redux';
import { setReports, setLoading, setError } from '../store/reportsSlice';
import { getReportsListApi } from '../api/reports.api';

export const useReports = () => {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.reports);

  const fetchReports = async () => {
    dispatch(setLoading(true));
    try {
      const data = await getReportsListApi();
      dispatch(setReports(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { reports, loading, error, fetchReports };
};

export default useReports;
