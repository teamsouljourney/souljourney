import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AppointmentHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <h1 className="text-2xl font-semibold tracking-tight text-navy dark:text-offWhite">
        {t("appointmentsTitle")}
      </h1>
      <button
        onClick={() => navigate("/therapists")}
        className="flex items-center justify-center w-full px-4 py-2 text-sm transition duration-300 rounded-lg sm:text-base text-offWhite bg-seaGreen hover:bg-navy sm:w-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        {t("bookAppointmentButton")}
      </button>
    </div>
  );
};

export default AppointmentHeader;
