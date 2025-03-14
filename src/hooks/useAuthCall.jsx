import useAxios, { axiosPublic } from "./useAxios";
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
      toastSuccessNotify(
        "Registration successful! Please check your email to verify your account!"
      );
      navigate("/auth/verify-email");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Oops! Something went wrong during registration"
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
      toastSuccessNotify("You have successfully logged in!");
      navigate("/");
    } catch (error) {
      // console.log(error);      
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Oops! Something went wrong during login!"
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
      toastSuccessNotify("You have successfully logged out!");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Oops! Something went wrong during logout."
      );
    }
  };

  //* forgot password
  const forgotPassword = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("auth/forgotPassword", userInfo);
      toastSuccessNotify("Password reset link sent successfully!");
      navigate(`/auth/reset-password/${data.jwtResetToken}`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Oops! Something went wrong during password reset request."
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
      toastSuccessNotify("Password reset successful!");
      navigate("/login");
    } catch (error) {
      toastErrorNotify(
        error.response.data.message,
        "Failed to reset password. Please try again."
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
