import useAxios, { axiosPublic } from "./useAxios";
import { useTranslation } from "react-i18next";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthCall = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();

  //* register
  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("auth/signup", userInfo);
      // console.log(data);
      dispatch(registerSuccess(data));
      toastSuccessNotify(t("authCall.registerSuccess"));
      navigate("/auth/verify-email");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("authCall.registerFailed")
      );
    }
  };

  //* login
  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("auth/login", userInfo);
      // console.log(data);
      dispatch(loginSuccess(data));
      toastSuccessNotify(t("authCall.loginSuccess"));
      navigate("/");
    } catch (error) {
      // console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("authCall.loginFailed")
      );
    }
  };

  //* Google login and register
  const signInWithGoogle = async () => {
    window.open(`${BASE_URL}auth/google`, "_self");
  };

  //* logout
  const logout = async () => {
    dispatch(fetchStart());
    try {
      navigate("/");
      await axiosWithToken.get("auth/logout");
      dispatch(logoutSuccess());
      toastSuccessNotify(t("authCall.logoutSuccess"));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("authCall.logoutFailed")
      );
    }
  };

  //* forgot password
  const forgotPassword = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("auth/forgotPassword", userInfo);
      toastSuccessNotify(t("authCall.forgotPasswordSuccess"));
      navigate(`/auth/reset-password/${data.jwtResetToken}`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("authCall.forgotPasswordFailed")
      );
    }
  };

  //* reset password
  const resetPassword = async (token, passwords) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.patch(
        `auth/reset-password/${token}`,
        passwords
      );
      // console.log(data);
      toastSuccessNotify(t("authCall.resetPasswordSuccess"));
      navigate("/login");
    } catch (error) {
      toastErrorNotify(
        error.response.data.message || t("authCall.resetPasswordFailed")
      );
    }
  };

  return {
    register,
    login,
    signInWithGoogle,
    logout,
    forgotPassword,
    resetPassword,
  };
};

export default useAuthCall;
