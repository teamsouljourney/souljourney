import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import TimeSlotSelector from "./TimeSlotSelector";
import AppointmentActions from "./AppointmentActions";
import { setSelectedDate } from "../../features/calendarSlice";

const AppointmentCalendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedDate } = useSelector((state) => state.calendar);

  useEffect(() => {
    return () => {
      dispatch(setSelectedDate(null));
    };
  }, [navigate]);

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
