import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedDate } from "../../features/calendarSlice";
import { useEffect } from "react";
import "../../styles/calendar-dark.css"

const Calendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDateSelect = (date) => {
    dispatch(setSelectedDate(date));
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedDate(null));
    };
  }, [navigate]);

  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridWeek"
      selectable={true}
      select={(info) => handleDateSelect(info.startStr)}
      validRange={{ start: todayFormatted }}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      }}
      hiddenDays={[0, 6]}
      height="auto"
    />
  );
};

export default Calendar;
