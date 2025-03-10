import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentDetails from "./AppointmentDetails";
import AppointmentCancel from "./AppointmentCancel";
import AppointmentEdit from "./AppointmentEdit";

const AppointmentCard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isEditing } = useSelector((state) => state.calendar);
  const { singleAppointment } = useSelector((state) => state.appointments);
  const [showJoinButton, setShowJoinButton] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-6 overflow-hidden bg-white shadow-md rounded-xl md:max-w-xl">
      <div className="p-6">
        <h3 className="text-lg font-bold text-navy">
          {t("appointmentDetails")}
        </h3>
        <AppointmentDetails />

        <div className="flex flex-wrap gap-2 mt-4">
          {isEditing ? (
            <AppointmentEdit />
          ) : (
            <>
              <AppointmentCancel />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
