import { getTokenFromCookie, removeAllFromCookie } from "@/app/helper/cookies";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = getTokenFromCookie("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      const access = getTokenFromCookie("access");
      if (access) {
        config.headers['X-Access-Token'] = access;
      }
    }
    
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
    if (error.response?.status === 401) {
      console.error('🔐 Unauthorized - redirecting to login');
      removeAllFromCookie();
      
      if (typeof window !== 'undefined') {
        window.location.href = "/login";
      }
    }
    
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