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

  const {  firstName, lastName, fullName, email, image, categoryId, feedbackId, description,  } = singleTherapist;
    
  // console.log(categoryId.name);
  

  return (
    <div className="flex flex-col p-5 mt-14 mx-auto sm:p-10 md:p-16 bg-offWhite dark:bg-background-dark text-navy-dark dark:text-offWhite">
      {/* Header */}
      <div className="flex flex-row flex-wrap items-start justify-center mt-12 mx-auto rounded">
        {/* Profile Pic */}
        <div>
          <img className="w-[150px] h-[150px] rounded-full" src={image} alt={fullName} />
          
        </div>

        {/* Identity */}
        <div>
          <div className="relative px-10 pt-5 pb-16 m-10 -mt-16 ">
            <a
              href="#"
              className="inline-block mb-2 text-lg font-semibold transition duration-500 ease-in-out hover:text-indigo-600"
            >
              {firstName} {lastName} {fullName}
            </a>
            <p className="text-sm">{categoryId.name}</p>
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
        <div>
        <button
          onClick={() => setDisplayCalendar(!displayCalendar)}
          className="px-6 py-3 text-lg text-white rounded-lg bg-gradient-to-r from-navy to-seaGreen hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark"
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
          className="px-6 py-3 text-lg text-white rounded-lg bg-gradient-to-r from-navy to-seaGreen hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark"
        >
          Go Back
        </button>
      </div>

      {/* Appointment */}
      {displayCalendar && (
        <div>
        <AppointmentCalendar />
      </div>
      )}
      
    </div>
  );
};

export default TeamDetail;
