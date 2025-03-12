import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AppointmentDetails from "./AppointmentDetails";
import AppointmentCancel from "./AppointmentCancel";
import AppointmentEdit from "./AppointmentEdit";

const AppointmentCard = () => {
  const { t } = useTranslation();
  const { isEditing } = useSelector((state) => state.calendar);

  return (
    <div className="max-w-md mx-auto mt-6 overflow-hidden bg-white dark:bg-background-lightdark dark:text-offWhite-dark shadow-md rounded-xl md:max-w-xl">
      <div className="p-6">
        <h3 className="text-lg font-bold ">
          {t("appointmentDetails")}
        </h3>
        <AppointmentDetails />

        {isEditing ? <AppointmentEdit /> : <AppointmentCancel />}
      </div>
    </div>
  );
};

export default AppointmentCard;
