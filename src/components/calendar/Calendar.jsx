import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";

const Calendar = ({ handleDateSelect }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridWeek"
      selectable={true}
      select={(info) => handleDateSelect(info.startStr)}
      validRange={{ start: dayjs().format("YYYY-MM-DD") }}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      }}
      height="auto"
    />
  );
};

export default Calendar;
