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

  console.log(singleTherapist);

  const {firstName, lastName, fullName, email, image, categoryId, feedbackId, description} = singleTherapist;
    
  console.log(categoryId);

  const therapistCategories = categoryId

  

  return (
    <div className="container max-w-none min-h-screen flex flex-col justify-center items-center gap-10 mt-14 py-3 bg-offWhite dark:bg-background-dark text-navy-dark dark:text-offWhite">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mx-auto w-full max-w-7xl p-8 mt-10">
        {/* Profile Pic */}
        <div className="lg:col-span-3 flex justify-center">
          <img className="w-44 h-44 rounded-full border-4 border-seaGreen shadow-lg" src={image} alt={fullName} />          
        </div>

        {/* Identity */}
        <div className="lg:col-span-6 flex flex-col text-center lg:text-left">
          <div className="text-2xl font-semibold">
            {/* Name */}
            <div className="text-4xl font-semibold">
              {firstName} {lastName} {fullName}
              <p className="text-sm">{email}</p>
            </div>
            {/* Categories */}
            <div className="flex sm:flex-wrap lg:flex-nowrap justify-center lg:justify-start mt-4 gap-2 text-lg">
              {therapistCategories.map((category) => <span key={category._id}>{category.name}</span> )}
            </div>
            {/* Services */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center mt-2 gap-x-6">
              
              <div className="flex flex-row items-center  justify-center lg:justify-start gap-2">                
                <span
                  style={{
                    maskImage: `url(/assets/sidebar/videoCall2.svg)`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    width: "30px",
                    height: "30px",
                  }}
                  className="inline-flex justify-center items-center  bg-navy-light "
                ></span>
                
                <span className="text-[1.25rem] font-semibold">
                  Video Call
                </span>
              </div>
              <div className="flex flex-row items-center  justify-center lg:justify-start gap-2">                
                <span
                  style={{
                    maskImage: `url(/assets/sidebar/chat2.svg)`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    width: "30px",
                    height: "30px",
                  }}
                  className="inline-flex justify-center items-center  bg-navy-light "
                ></span>
                
                <span className="text-[1.25rem] font-semibold">
                  Live Chat
                </span>
              </div>
              
            </div>
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
        <div>
          <p>Abut me</p>
          {description}
        </div>
        <div>
          <p>Reviews</p>
          {feedbackId.comment}
        </div>
        

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
          <AppointmentCalendar />
        )}
      </div>
      
      
    </div>
  );
};

export default TeamDetail;
