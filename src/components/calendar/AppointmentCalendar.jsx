import Calendar from "./Calendar";
import TimeSlotSelector from "./TimeSlotSelector";
import AppointmentActions from "./AppointmentActions";
import { useSelector } from "react-redux";

const AppointmentCalendar = () => {
  const { selectedDate } = useSelector((state) => state.calendar);

  return (
    <div className="p-4">
      <h2 className="mb-8 text-lg font-semibold text-navy">Booking Calendar</h2>
      <Calendar />
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
