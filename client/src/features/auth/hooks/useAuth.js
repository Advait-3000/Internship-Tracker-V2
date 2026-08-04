import { useSelector, useDispatch } from 'react-redux';
import { setCredentials, logout } from '../store/authSlice';
import { loginApi, registerApi } from '../api/auth.api';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, token: accessToken }));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerApi(userData);
      // Backend register does not return a token, just the user object
      const user = response.data;
      dispatch(setCredentials({ user, token: null }));
      return { user };
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: handleLogout,
  };
};

export default useAuth;
