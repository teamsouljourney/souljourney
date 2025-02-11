import { useSelector } from "react-redux";
import { toastErrorNotify } from "../../helper/ToastNotify";
import useAppointmentCall from "../../hooks/useAppointmentCall";

const AppointmentActions = ({ selectedSlot }) => {
  const { createAppointment } = useAppointmentCall();
  const { currentUser } = useSelector((state) => state.auth);
  const { selectedDate } = useSelector((state) => state.calendar);
  const { singleTherapist } = useSelector((state) => state.therapists);

  const handleCreateAppointment = () => {
    if (!selectedSlot) {
      toastErrorNotify("Please select a time slot.");
      return;
    }

    const startTime = new Date(
      `${selectedDate}T${selectedSlot.split(" ")[0]}:00`
    );
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const appointmentData = {
      userId: currentUser?._id,
      therapistId: singleTherapist?._id,
      appointmentDate: selectedDate,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

    createAppointment(appointmentData);
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={handleCreateAppointment}
        className="px-4 py-2 text-white rounded-md bg-seaGreen"
      >
        Create Appointment
      </button>
    </div>
  );
};

export default AppointmentActions;
