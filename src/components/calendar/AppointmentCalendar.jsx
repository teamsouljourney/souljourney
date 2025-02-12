import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Calendar";
import TimeSlotSelector from "./TimeSlotSelector";
import AppointmentActions from "./AppointmentActions";
import { setSelectedDate } from "../../features/calendarSlice";

const AppointmentCalendar = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.calendar);

  const handleDateSelect = (date) => {
    dispatch(setSelectedDate(date));
  };

  return (
    <div className="p-4">
      <h2 className="mb-8 text-lg font-semibold text-navy">Booking Calendar</h2>
      <Calendar handleDateSelect={handleDateSelect} />
      {selectedDate && (
        <>
          <TimeSlotSelector />
          <AppointmentActions />
        </>
      )}
    </div>
  );
};

export default AppointmentCalendar;
