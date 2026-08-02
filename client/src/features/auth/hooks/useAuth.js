import { useSelector, useDispatch } from 'react-redux';
import { setCredentials, logout } from '../store/authSlice';
import { loginApi, registerApi } from '../api/auth.api';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    try {
      const data = await loginApi(credentials);
      dispatch(setCredentials(data));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerApi(userData);
      dispatch(setCredentials(data));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const bypassLogin = (role = "student") => {
    const mockUser = {
      id: `dev-${role}-100`,
      name: `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: `${role}@dev.local`,
      role: role,
    };
    const data = {
      user: mockUser,
      token: `dev-bypass-token-${role}-${Date.now()}`,
    };
    dispatch(setCredentials(data));
    return data;
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
    bypassLogin,
    logout: handleLogout,
  };
};

export default useAuth;
