import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

const refreshToken = async () => {
   try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}travel-mates/token-refresh`,
      {
        refresh: localStorage.getItem("refreshToken"),
      }
    );
    const newAccessToken = response.data.access;
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

// Add a response interceptor to handle 401 errors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        try {
          const newAccessToken = await refreshToken(); 
          if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(error.config);
          }
          else{
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location.href = '/login';
          }
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
