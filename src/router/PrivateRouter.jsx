import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastErrorNotify } from "../helper/ToastNotify";
import { useEffect } from "react";

const PrivateRouter = () => {
    const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      toastErrorNotify("You need to log in first!");
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
export default PrivateRouter;
