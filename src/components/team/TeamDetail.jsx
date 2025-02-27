import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useSelector } from "react-redux";
import AppointmentCalendar from "../calendar/appointmentCalendar";
import Button from "../button/Button";
import TeamDetailHeader from "./TeamDetailHeader";
import TeamDetailBody from "./TeamDetailBody";
import { useTranslation } from "react-i18next";

const TeamDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleTherapist, getTherapistTimeTable } = useTherapistCall();
  const { singleTherapist, loading, error } = useSelector(
    (state) => state.therapists
  );
  const { currentUser } = useSelector((state) => state.auth);

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

        <TeamDetailHeader singleTherapist={singleTherapist} currentUser={currentUser} toggleCalendar={toggleCalendar} />
        
      </div>
      
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

        <TeamDetailBody currentUser={currentUser} singleTherapist={singleTherapist} id={id}/>
        
      </div>
      {/* GoBack */}
      <div className="p-6 pt-0 mt-8 text-center w-full">
        <Button onClick={() => navigate("/therapists")} type="type22">
          Go Back {/* {t("goBack")} */}
        </Button>
      </div>
      {/* Appointment */}
      {displayCalendar && currentUser && (
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
