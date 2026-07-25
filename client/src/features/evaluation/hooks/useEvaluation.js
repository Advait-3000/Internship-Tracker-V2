import { useSelector, useDispatch } from 'react-redux';
import { setEvaluations, setLoading, setError } from '../store/evaluationSlice';
import { getEvaluationsApi } from '../api/evaluation.api';

export const useEvaluation = () => {
  const dispatch = useDispatch();
  const { evaluations, loading, error } = useSelector((state) => state.evaluation);

  const fetchEvaluations = async (params) => {
    dispatch(setLoading(true));
    try {
      const data = await getEvaluationsApi(params);
      dispatch(setEvaluations(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { evaluations, loading, error, fetchEvaluations };
};

export default useEvaluation;
