import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastErrorNotify } from "../helper/ToastNotify";

const PrivateRouter = () => {
    const navigate = useNavigate();

    const currentUser  = useSelector((state) => state.auth.currentUser );


    if (!currentUser) {
        navigate("/login", { state: { from: location } });
        toastErrorNotify("You must be logged in to access this page.");
        return null; 
    }else{
        return <Outlet/>
    }
};

export default PrivateRouter;
