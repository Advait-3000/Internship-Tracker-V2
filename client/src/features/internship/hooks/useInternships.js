import { useSelector, useDispatch } from 'react-redux';
import { setInternships, setLoading, setError } from '../store/internshipSlice';
import { getInternshipsApi } from '../api/internship.api';


export const useInternships = () => {
  const dispatch = useDispatch();
  const { internships, selectedInternship, loading, error } = useSelector((state) => state.internship);

  const fetchInternships = async (filters) => {
    dispatch(setLoading(true));
    try {
      const data = await getInternshipsApi(filters);
      dispatch(setInternships(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    internships,
    selectedInternship,
    loading,
    error,
    fetchInternships,
  };
};

export default useInternships;
