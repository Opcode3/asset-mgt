import axios from "axios";
import { useAuthStore } from "../store/authStore";

// Create axios instance with base configuration
export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://asset-mgt-api.onrender.com/api",
  timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// export const apiFormData = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto logout if 401 response
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
