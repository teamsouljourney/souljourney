import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { toastErrorNotify } from "../../helper/ToastNotify";

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const { createAppointment } = useAppointmentCall();

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour}:00 - ${hour + 1}:00`);
    }
    return slots;
  };

  const handleDateSelect = (info) => {
    setSelectedDate(info.startStr);
    setTimeSlots(generateTimeSlots());
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleCreateAppointment = () => {
    if (!selectedSlot) {
      toastErrorNotify("Please select a time slot.");
      return;
    }

    const startTime = new Date(
      `${selectedDate}T${selectedSlot.split(" ")[0]}:00`
    );
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const appointmentData = {
      userId: "user-id",
      therapistId: "therapist-id",
      appointmentDate: selectedDate,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

    createAppointment(appointmentData);
  };

  return (
    <div className="p-4">
      <h2 className="mb-8 text-lg font-semibold text-navy">Booking Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        select={handleDateSelect}
        selectable={true}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        height="auto"
      />

      {selectedDate && (
        <div className="p-4 mt-4 border rounded bg-offWhite">
          <h3 className="font-semibold text-mauve text-md">
            Selected Date: {selectedDate}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleSlotClick(slot)}
                className={`px-[.5rem] py-[.3rem] rounded-lg ${
                  selectedSlot === slot
                    ? "bg-seaGreen text-white"
                    : "bg-navy text-white"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          <button
            onClick={handleCreateAppointment}
            className="px-4 py-2 mt-4 text-white transition duration-300 rounded-lg bg-seaGreen hover:bg-navy"
          >
            Create Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
