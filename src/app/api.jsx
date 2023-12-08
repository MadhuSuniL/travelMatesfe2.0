import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// Function to refresh the token
const refreshToken = async () => {
  // Implementing our token refresh logic here
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}travel-mates/token-refresh`,
      {
        refresh: localStorage.getItem("refreshToken"),
      }
    );
    const newAccessToken = response.data.accessToken;
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
      if (status === 402) {
        try {
          const newAccessToken = await refreshToken(); // Attempt to refresh the token
          if (newAccessToken) {
            // Update the stored access token
            localStorage.setItem("accessToken", newAccessToken);
            // Retry the original request with the new token
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(error.config);
          }
        } catch (refreshError) {
          // Token refresh failed, handle the error or redirect to the login page
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
