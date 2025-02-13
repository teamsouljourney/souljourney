import { useDispatch, useSelector } from "react-redux";
import { setEditStatus, setSelectedSlot } from "../../features/calendarSlice";
import TimeSlotSelector from "../calendar/TimeSlotSelector";
import useAppointmentCall from "../../hooks/useAppointmentCall";

const AppointmentEdit = () => {
  const dispatch = useDispatch();
  const { updateAppointment } = useAppointmentCall();

  const { singleAppointment } = useSelector((state) => state.appointments);
  const { selectedSlot } = useSelector((state) => state.calendar);

  const handleSave = () => {
    if (!selectedSlot) return;

    const updatedData = {
      appointmentDate: singleAppointment.appointmentDate,
      startTime: selectedSlot.split(" - ")[0],
      endTime: selectedSlot.split(" - ")[1],
    };

    updateAppointment(singleAppointment._id, updatedData);
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
