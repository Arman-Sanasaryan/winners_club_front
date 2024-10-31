import axios from "axios";
import {
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser,
} from "./authService";

const axiosInstance = axios.create({
  baseURL: "https://www.clcweb.pro",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const user = getCurrentUser();
    if (user && user.access_token) {
      config.headers["Authorization"] = `Bearer ${user.access_token}`;
    }
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
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const user = getCurrentUser();
      if (user && user.refresh_token) {
        try {
          const response = await axios.post("www.clcweb.pro/auth/refresh", {
            refresh_token: user.refresh_token,
          });
          const newAccessToken = response.data.access_token;
          const newRefreshToken = response.data.refresh_token;

          setCurrentUser({
            ...user,
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
          });
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token expired:", refreshError);
          removeCurrentUser();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
