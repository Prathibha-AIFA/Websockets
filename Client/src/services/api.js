// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // uses .env variable
  headers: {
    "Content-Type": "application/json",
  },
});

export const notifyUser = (role, userId, message) => {
  return api.post(`/notify/${role}/${userId}`, { message });
};

export default api;
