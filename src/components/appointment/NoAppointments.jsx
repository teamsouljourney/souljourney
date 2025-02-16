import { useNavigate } from "react-router-dom";

const NoAppointments = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 text-center">
      <p className="mb-4 text-lg font-semibold text-navy">
        You have no scheduled appointments.
      </p>
      <button
        onClick={() => navigate("/therapists")}
        className="px-2 py-1 text-sm transition duration-300 rounded-lg sm:text-base text-offWhite bg-seaGreen hover:bg-navy"
      >
        Book an Appointment
      </button>
    </div>
  );
};

export default NoAppointments;
