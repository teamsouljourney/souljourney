import axios from "axios";
import { useSelector } from "react-redux";
import i18n from "../i18n";

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

i18n.on("languageChanged", (lng) => {
  axiosPublic.defaults.headers["Accept-Language"] = lng;
});

const useAxios = () => {
  const token = useSelector((state) => state.auth.token);

  const axiosWithToken = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  // Interceptor to update headers dynamically
  axiosWithToken.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Token ${token}`;
    config.headers["Accept-Language"] = i18n.language;
    return config;
  });

  return axiosWithToken;
};

axiosPublic.defaults.headers["Accept-Language"] = i18n.language;

export default useAxios;
