import { useNavigate } from "react-router-dom";
import authSuccess from "../assets/images/authSuccess.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { loginSuccess } from "../features/authSlice";

function AuthSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getDataFromUrl = async () => {
      const queryParams = new URLSearchParams(location.search);
      const userParam = queryParams.get("user");

      if (!userParam) {
        toastSuccessNotify("Invalid data received.");
        navigate("/auth/login");
        return;
      }

      const parsedData = JSON.parse(decodeURIComponent(userParam));

      if (!parsedData) {
        toastErrorNotify(
          "Invalid user information received. Please log in again."
        );
        navigate("/auth/login");
        return;
      }

      dispatch(loginSuccess(parsedData));

      setTimeout(() => {
        toastSuccessNotify(parsedData.message);
        navigate("/");
      }, 3000);
    };
    getDataFromUrl();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen gap-1 p-20 md:gap-4 sm:p-10 bg-offWhite">
      <div
        className="w-full bg-center bg-no-repeat bg-contain h-[40vh] md:h-[50vh] sm:h-[60vh]"
        style={{ backgroundImage: `url(${authSuccess})` }}
      ></div>
      <p className="text-xl font-semibold text-navy-dark">Redirecting ...</p>
    </div>
  );
}

export default AuthSuccess;
