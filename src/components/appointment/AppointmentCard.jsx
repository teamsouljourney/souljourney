import { useSelector } from "react-redux";
import { formatDateTime } from "../../helper/dateFormatter";
import useAppointmentCall from "../../hooks/useAppointmentCall";

const AppointmentCard = () => {
  const { updateAppointment, deleteAppointment } = useAppointmentCall();
  const { singleAppointment } = useSelector((state) => state.appointments);
  const { currentUser } = useSelector((state) => state.auth);

  const handleEdit = () => {
    const updatedData = {
      appointmentDate: singleAppointment.appointmentDate,
      startTime: singleAppointment.startTime,
      endTime: singleAppointment.endTime,
    };

    updateAppointment(singleAppointment._id, updatedData);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      deleteAppointment(singleAppointment._id, currentUser._id);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 overflow-hidden bg-white shadow-md rounded-xl md:max-w-xl">
      <div className="p-6">
        <h3 className="text-lg font-bold text-navy">Appointment Details</h3>
        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            <strong>Client:</strong> {singleAppointment.userId.firstName}{" "}
            {singleAppointment.userId.lastName}
          </p>
          <p>
            <strong>Therapist:</strong>{" "}
            {singleAppointment.therapistId.firstName}{" "}
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

        {/* Butonlar */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Edit Appointment
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
