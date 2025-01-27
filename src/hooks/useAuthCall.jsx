import useAxios, { axiosPublic } from './useAxios';
import { fetchFail, fetchStart, loginSuccess, registerSuccess } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify';

const useAuthCall = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const axiosWithToken = useAxios();

  //* register
  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("auth/signup", userInfo);
      console.log(data);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Registration successful! Please check your email to verify your account!");
      navigate("/auth/verify-email");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.message, "Oops! Something went wrong during registration");
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
      dispatch(fetchFail());
      toastErrorNotify(error.message, "Oops! Something went wrong during login!");
    }
  };


  return {register, login}
}

export default useAuthCall