import { useDispatch, useSelector } from "react-redux";
import { setEditStatus, setSelectedSlot } from "../../features/calendarSlice";
import TimeSlotSelector from "../calendar/TimeSlotSelector";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { toastErrorNotify } from "../../helper/ToastNotify";

const AppointmentEdit = () => {
  const dispatch = useDispatch();
  const { updateAppointment } = useAppointmentCall();

  const { singleAppointment } = useSelector((state) => state.appointments);
  const { selectedDate, selectedSlot } = useSelector((state) => state.calendar);
  const { currentUser } = useSelector((state) => state.auth);

  const handleSave = () => {
    if (!selectedSlot) {
      toastErrorNotify("Please select a time slot.");
      return;
    }

    const startTime = new Date(
      `${selectedDate}T${selectedSlot.split(" ")[0]}:00`
    );

    const endTime = new Date(startTime.getTime() + 50 * 60 * 1000);

    const updatedData = {
      userId: singleAppointment?.userId._id,
      therapistId: singleAppointment?.therapistId._id,
      appointmentDate: selectedDate,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

    updateAppointment(singleAppointment._id, updatedData, currentUser._id);
  };

  return (
    <div>
      <TimeSlotSelector />
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSave}
          className="px-2 py-1 text-sm transition duration-300 rounded-lg sm:text-base text-offWhite bg-seaGreen hover:bg-navy"
        >
          Save Changes
        </button>
        <button
          onClick={() => {
            dispatch(setEditStatus(false));
            dispatch(setSelectedSlot(null));
          }}
          className="px-2 py-1 text-sm text-white transition duration-300 rounded-lg sm:text-base bg-mauve hover:bg-mauve-dark"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentEdit;
