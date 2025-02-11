import { useDispatch, useSelector } from "react-redux";
import { toastErrorNotify } from "../../helper/ToastNotify";
import dayjs from "dayjs";
import Calendar from "./Calendar";
import TimeSlotSelector from "./TimeSlotSelector";
import AppointmentActions from "./AppointmentActions";
import { setSelectedDate, setSelectedSlot } from "../../features/calendarSlice";

const AppointmentCalendar = () => {
  const dispatch = useDispatch();
  const { selectedDate, selectedSlot } = useSelector((state) => state.calendar);
  const { therapistTimeTable } = useSelector((state) => state.therapists);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour}:00 - ${hour + 1}:00`);
    }
    return slots;
  };

  const isSlotUnavailable = (date, slot) => {
    const slotStartTime = dayjs(
      `${date}T${slot.split(" ")[0]}:00`
    ).toISOString();
    return therapistTimeTable.some(
      (entry) => entry.startTime === slotStartTime || entry.unavailable
    );
  };

  const handleDateSelect = (date) => {
    const selectedDay = dayjs(date);
    const today = dayjs().startOf("day");

    if (selectedDay.isBefore(today)) {
      toastErrorNotify("You cannot select past dates.");
      return;
    }

    dispatch(setSelectedDate(date));
  };

  const handleSlotSelect = (slot) => {
    if (!isSlotUnavailable(selectedDate, slot)) {
      dispatch(setSelectedSlot(slot));
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-8 text-lg font-semibold text-navy">Booking Calendar</h2>
      <Calendar handleDateSelect={handleDateSelect} />
      {selectedDate && (
        <>
          <TimeSlotSelector
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSlotSelect={handleSlotSelect}
            generateTimeSlots={generateTimeSlots}
            isSlotUnavailable={isSlotUnavailable}
          />
          <AppointmentActions selectedSlot={selectedSlot} />
        </>
      )}
    </div>
  );
};

export default AppointmentCalendar;
