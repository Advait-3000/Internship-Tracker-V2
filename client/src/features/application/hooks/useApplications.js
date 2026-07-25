import { useSelector, useDispatch } from 'react-redux';
import { setApplications, setLoading, setError } from '../store/applicationSlice';
import { getApplicationsApi } from '../api/application.api';

export const useApplications = () => {
  const dispatch = useDispatch();
  const { applications, loading, error } = useSelector((state) => state.application);

  const fetchApplications = async (params) => {
    dispatch(setLoading(true));
    try {
      const data = await getApplicationsApi(params);
      dispatch(setApplications(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { applications, loading, error, fetchApplications };
};

export default useApplications;
