import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
client.interceptors.request.use(
  (config) => {
    // Get the Firebase token from cookies
    const token = Cookies.get("firebase-token");

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Optional: You can handle token refresh here if needed
      // or redirect to login page
      window.location.href = "/auth/signin";
    }
    return Promise.reject(error);
  }
);

export default client;
