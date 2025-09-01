import axios from "axios";
import { getSessionToken } from "@descope/react-sdk";

// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
});

// Add interceptor to include auth token
apiClient.interceptors.request.use(async (config) => {
  const token = getSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
