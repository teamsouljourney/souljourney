import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useAppointmentCall from "../hooks/useAppointmentCall";
import AppointmentCard from "../components/appointment/AppointmentCard";

const Appointment = () => {
  const { getUserAppointments, getSingleAppointment } = useAppointmentCall();
  const { currentUserAppointments, singleAppointment } = useSelector(
    (state) => state.appointments
  );
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    currentUser?._id && getUserAppointments(currentUser?._id);
  }, [currentUser?._id]);

  const formattedEvents = currentUserAppointments?.map((appointment) => ({
    id: appointment._id,
    title: `${appointment.userId.firstName} ${appointment.userId.lastName}`,
    start: appointment.startTime,
    end: appointment.endTime,
  }));

  const handleEventClick = (info) => {
    getSingleAppointment(info.event?._def.publicId);
  };

  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Appointments</h2>
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

      {singleAppointment && <AppointmentCard />}
    </div>
  );
};

export default Appointment;
