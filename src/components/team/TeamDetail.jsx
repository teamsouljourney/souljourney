import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useSelector } from "react-redux";
import AppointmentCalendar from "../calendar/appointmentCalendar";

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleTherapist, getTherapistTimeTable } = useTherapistCall();
  const { singleTherapist, loading, error } = useSelector(
    (state) => state.therapists
  );

  const [displayCalendar, setDisplayCalendar] = useState(false)

  useEffect(() => {
    getSingleTherapist(id);
    getTherapistTimeTable(id);
  }, [id]);

  if (loading) {
    return <div className="text-center text-navy">Loading...</div>;
  }

  if (error || !singleTherapist) {
    return <div className="text-center text-mauve">Therapist not found!</div>;
  }

  // console.log(singleTherapist);

  const {firstName, lastName, fullName, email, image, categoryId, feedbackId, description} = singleTherapist;
    
  // console.log(categoryId.name);
  

  return (
    <div className="flex flex-col gap-10 justify-center items-center p-5 mt-14 px-auto sm:p-10 md:p-16 bg-offWhite dark:bg-background-dark text-navy-dark dark:text-offWhite">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mx-auto w-full max-w-7xl p-8">
        {/* Profile Pic */}
        <div className="lg:col-span-3 flex justify-center">
          <img className="w-32 h-32 rounded-full border-4 border-seaGreen shadow-lg" src={image} alt={fullName} />
          
        </div>

        {/* Identity */}
        <div className="lg:col-span-6 flex flex-col text-center lg:text-left">
          <div className="text-2xl font-semibold text-navy">
            <a
              href="#"
              className="inline-block mb-2 text-lg font-semibold transition duration-500 ease-in-out hover:text-indigo-600"
            >
              {firstName} {lastName} {fullName}
            </a>
            <p className="flex flex-wrap justify-center lg:justify-start mt-2 gap-2">{categoryId.name}</p>
            <p className="text-sm">{email}</p>
            <p className="mt-5 text-xs">
              By{" "}
              <a
                href="#"
                className="text-xs text-indigo-600 transition duration-500 ease-in-out"
              >
                {firstName}
              </a>{" "}
              | in{" "}
              <a
                href="#"
                className="text-xs text-indigo-600 transition duration-500 ease-in-out"
              >
                {lastName}
              </a>
            </p>
          </div>
        </div>

        {/* Appointment button */}
        <div className="lg:col-span-3 flex justify-center lg:justify-end items-center">
          <button
            onClick={() => setDisplayCalendar(!displayCalendar)}
            className="px-6 py-3 text-lg leading-none text-white rounded-lg bg-gradient-to-r from-navy to-seaGreen hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark transition-transform duration-150 ease-in-out active:scale-95"
          >
            work with me
          </button>
        </div>
      </div>

      {/* Body */}
      <div>
        <p>Abut me</p>
        {description}
      </div>
      {/* GoBack */}
      <div className="p-6 pt-0 mt-8 text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 text-lg text-white rounded-lg bg-gradient-to-r from-navy to-seaGreen hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark transition-transform duration-150 ease-in-out active:scale-95"
        >
          Go Back
        </button>
      </div>

      {/* Appointment */}
      <div className={displayCalendar ? "min-h-[200px]" : "min-h-[100px]"}>
        {displayCalendar && (
          <div>
            <AppointmentCalendar />
          </div>
        )}
      </div>
      
      
    </div>
  );
};

export default TeamDetail;
