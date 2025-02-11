const AppointmentActions = ({ selectedSlot, onCreateAppointment }) => {
  return (
    <button
      onClick={onCreateAppointment}
      disabled={!selectedSlot}
      className={`px-4 py-2 mt-4 text-white transition duration-300 rounded-lg ${
        selectedSlot
          ? "bg-seaGreen hover:bg-navy"
          : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      Create Appointment
    </button>
  );
};

export default AppointmentActions;
