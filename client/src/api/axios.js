import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual backend URL later
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests if needed
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config before request is sent (e.g., attach tokens)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors like 401 Unauthorized
    return Promise.reject(error);
  }
);

export default axiosInstance;
