import { useSelector } from "react-redux";
import { formatDateTime } from "../../helper/dateFormatter";

const AppointmentDetails = () => {
  const { singleAppointment } = useSelector((state) => state.appointments);

  return (
    <div className="mt-4 space-y-2 text-gray-700">
      <p>
        <strong>Client:</strong> {singleAppointment.userId.firstName}{" "}
        {singleAppointment.userId.lastName}
      </p>
      <p>
        <strong>Therapist:</strong> {singleAppointment.therapistId.firstName}{" "}
        {singleAppointment.therapistId.lastName}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {formatDateTime(singleAppointment.appointmentDate, "date")}
      </p>
      <p>
        <strong>Time:</strong>{" "}
        {formatDateTime(singleAppointment.startTime, "time")} -{" "}
        {formatDateTime(singleAppointment.endTime, "time")}
      </p>
      {singleAppointment.videoCallUrl && (
        <a
          href={singleAppointment.videoCallUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-indigo-600 hover:underline"
        >
          Join Meeting
        </a>
      )}
    </div>
  );
};

export default AppointmentDetails;
