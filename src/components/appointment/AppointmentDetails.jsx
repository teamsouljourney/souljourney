import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../helper/dateFormatter";

const AppointmentDetails = () => {
  const { t } = useTranslation();
  const { singleAppointment } = useSelector((state) => state.appointments);

  return (
    <div className="mt-4 space-y-2">
      <p>
        <strong>{t("client")}:</strong> {singleAppointment?.userId?.firstName}{" "}
        {singleAppointment?.userId?.lastName}
      </p>
      <p>
        <strong>{t("therapist")}:</strong>{" "}
        {singleAppointment?.therapistId?.firstName}{" "}
        {singleAppointment?.therapistId.lastName}
      </p>
      <p>
        <strong>{t("date")}:</strong>{" "}
        {formatDateTime(singleAppointment?.appointmentDate, "date")}
      </p>
      <p>
        <strong>{t("time")}:</strong>{" "}
        {formatDateTime(singleAppointment?.startTime, "time")} -{" "}
        {formatDateTime(singleAppointment?.endTime, "time")}
      </p>
    </div>
  );
};

export default AppointmentDetails;
