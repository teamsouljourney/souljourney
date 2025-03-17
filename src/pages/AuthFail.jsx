import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authFail from "../assets/images/verificationFail.png";
import { useTranslation } from "react-i18next";

const AuthFail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center min-h-screen gap-1 p-10 md:gap-4 bg-offWhite">
      <div
        className="w-full bg-center bg-no-repeat bg-contain h-[40vh] md:h-[50vh] sm:h-[60vh]"
        style={{ backgroundImage: `url(${authFail})` }}
      ></div>
      <p className="text-xl font-semibold text-navy-dark">
        {t("AuthFail")} {/* Authentication Failed! Redirecting to Homepage... */}
      </p>
    </div>
  );
};

export default AuthFail;
