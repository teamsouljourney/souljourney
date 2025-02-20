import axios from "axios";
import i18n from "../i18n";  

const api = axios.create({
  baseURL: "https://your-backend.com/api",
});

api.interceptors.request.use((config) => {
  const language = i18n.language || "en"; 
  config.headers["Accept-Language"] = language;  
  return config;
});

export default api;