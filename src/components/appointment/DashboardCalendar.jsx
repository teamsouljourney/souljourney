import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { useSelector } from "react-redux";

const DashboardCalendar = () => {
  const { getSingleAppointment } = useAppointmentCall();

  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );

  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  const handleEventClick = (info) => {
    getSingleAppointment(info.event?._def.publicId);
  };

  const formattedEvents = currentUserAppointments?.map((appointment) => ({
    id: appointment._id,
    title: currentUser?.isTherapist
      ? `${appointment.userId.firstName} ${appointment.userId.lastName}`
      : `${appointment.therapistId.firstName} ${appointment.therapistId.lastName}`,
    start: appointment.startTime,
    end: appointment.endTime,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={formattedEvents}
      eventClick={handleEventClick}
      validRange={{ start: todayFormatted }}
      editable={true}
      selectable={true}
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

export default DashboardCalendar;
