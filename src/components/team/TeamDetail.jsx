import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useSelector } from "react-redux";
import AppointmentCalendar from "../calendar/appointmentCalendar";
import useAppointmentCall from "../../hooks/useAppointmentCall";

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAllAppointments } = useAppointmentCall();
  const { getSingleTherapist } = useTherapistCall();
  const { singleTherapist, loading, error } = useSelector(
    (state) => state.therapists
  );
  const { appointments } = useSelector((state) => state.appointments);

  console.log(appointments);

  useEffect(() => {
    getAllAppointments();
    getSingleTherapist(id);
  }, [id]);

  if (loading) {
    return <div className="text-center text-navy">Loading...</div>;
  }

  if (error || !singleTherapist) {
    return <div className="text-center text-mauve">Therapist not found!</div>;
  }

  return (
    <div className="max-w-screen-xl p-5 mx-auto sm:p-10 md:p-16 bg-offWhite">
      <div className="flex flex-col max-w-xl mx-auto overflow-hidden rounded">
        <a href="#">
          <img
            className="w-full"
            src={singleTherapist.image}
            alt={singleTherapist.name}
          />
        </a>
        <div className="relative px-10 pt-5 pb-16 m-10 -mt-16 bg-white">
          <a
            href="#"
            className="inline-block mb-2 text-lg font-semibold transition duration-500 ease-in-out hover:text-indigo-600"
          >
            {singleTherapist.name}
          </a>
          <p className="text-sm text-gray-500">{singleTherapist.description}</p>
          <p className="mt-5 text-xs text-gray-600">
            By{" "}
            <a
              href="#"
              className="text-xs text-indigo-600 transition duration-500 ease-in-out"
            >
              {singleTherapist.name}
            </a>{" "}
            | in{" "}
            <a
              href="#"
              className="text-xs text-indigo-600 transition duration-500 ease-in-out"
            >
              {singleTherapist.name}
            </a>
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 mt-8 text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 text-lg text-white rounded-lg bg-gradient-to-r from-navy to-seaGreen hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark"
        >
          Go Back
        </button>
      </div>
      <AppointmentCalendar />
    </div>
  );
};

export default TeamDetail;
