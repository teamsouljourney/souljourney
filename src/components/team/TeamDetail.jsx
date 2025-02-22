import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useSelector } from "react-redux";
import AppointmentCalendar from "../calendar/appointmentCalendar";
import Button from "../button/Button";
import TeamDetailHeader from "./TeamDetailHeader";
import TeamDetailBody from "./TeamDetailBody";

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleTherapist, getTherapistTimeTable } = useTherapistCall();
  const { singleTherapist, loading, error } = useSelector(
    (state) => state.therapists
  );

  const [displayCalendar, setDisplayCalendar] = useState(false);

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

  const toggleCalendar = (show) => {
    setDisplayCalendar(show);
  };

  const handleOutSideClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleCalendar(false);
    }
  };  

  return (
    <div className="container max-w-none min-h-screen flex flex-col justify-center items-center gap-2 py-3 bg-offWhite dark:bg-background-darker text-navy-dark dark:text-offWhite-dark">
      {/* Header */}
      <div className="w-full bg-offWhite-dark dark:bg-background-dark pt-12">

        <TeamDetailHeader singleTherapist={singleTherapist} />
        
      </div>
      {/* Decorative Wave Border */}
      {/* <div className="w-full h-24 relative overflow-hidden">
        <div
          className="absolute inset-0 w-full h-24"
          style={{
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%234DA1A9' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </div> */}
      {/* Tab Navigation */}
      {/* <div className="w-full bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button className="py-4 px-1 border-b-2 border-seaGreen text-seaGreen font-medium">About me</button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-seaGreen hover:border-seaGreen font-medium">
              Professional experience
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-seaGreen hover:border-seaGreen font-medium">
              Credentials information
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-seaGreen hover:border-seaGreen font-medium">
              Reviews
            </button>
          </div>
        </div>
      </div> */}

      {/* Body */}
      <div className="w-full px-4">

        <TeamDetailBody singleTherapist={singleTherapist} id={id}/>
        
      </div>
      {/* GoBack */}
      <div className="p-6 pt-0 mt-8 text-center w-full">
        <Button onClick={() => navigate(-1)} type="type22">
          Go Back
        </Button>
      </div>
      {/* Appointment */}
      {displayCalendar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleOutSideClick}
        >
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <AppointmentCalendar />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetail;
