import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const PrivateRouter = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { auth } = useSelector((state) => state.auth);

    const isAuthenticated = auth?.currentUser;

    if (!isAuthenticated) {
        navigate("/login", { state: { from: location } });
        toastErrorNotify("You must be logged in to access this page.");
        return null; 
    }else{
        toastSuccessNotify("You are logged in.");
        return <Outlet/>
    }
};

export default PrivateRouter;
