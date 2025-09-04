import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error(`❌ API Error: ${errorMessage}`);
    
    return Promise.reject({
      ...error,
      message: errorMessage,
      status: error.response?.status,
    });
  }
);

export default axiosInstance;