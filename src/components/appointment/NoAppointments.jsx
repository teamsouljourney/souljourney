import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const NoAppointments = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loading } = useSelector((state) => state.appointments);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-offWhite dark:bg-background-darker">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-seaGreen"></div>
      </div>
    );
  }

  return (
    <div className="mt-8 text-center">
      <p className="mb-4 text-lg font-semibold text-navy dark:text-offWhite-dark">
        {t("noAppointmentsMessage")}
      </p>
      <button
        onClick={() => navigate("/therapists")}
        className="px-2 py-1 text-sm transition duration-300 rounded-lg sm:text-base text-offWhite bg-seaGreen hover:bg-navy"
      >
        {t("bookAppointmentButton")}
      </button>
    </div>
  );
};

export default NoAppointments;
