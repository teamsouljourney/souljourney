import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NoAppointments = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mt-8 text-center">
      <p className="mb-4 text-lg font-semibold text-navy">
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
