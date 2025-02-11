import { useState } from "react";
import { useSelector } from "react-redux";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { toastErrorNotify } from "../../helper/ToastNotify";
import dayjs from "dayjs";
import Calendar from "./Calendar";
import TimeSlotSelector from "./TimeSlotSelector";
import AppointmentActions from "./AppointmentActions";

const AppointmentCalendar = () => {
  const { createAppointment } = useAppointmentCall();
  const { currentUser } = useSelector((state) => state.auth);
  const { singleTherapist, therapistTimeTable } = useSelector(
    (state) => state.therapists
  );

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

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

    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    if (!isSlotUnavailable(selectedDate, slot)) {
      setSelectedSlot(slot);
    }
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
      userId: currentUser?._id,
      therapistId: singleTherapist?._id,
      appointmentDate: selectedDate,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

    createAppointment(appointmentData);
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
          <AppointmentActions
            selectedSlot={selectedSlot}
            onCreateAppointment={handleCreateAppointment}
          />
        </>
      )}
    </div>
  );
};

export default AppointmentCalendar;
