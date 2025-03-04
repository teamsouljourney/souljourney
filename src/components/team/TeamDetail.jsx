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

  const [activeTab, setActiveTab] = useState("about");
  const [displayCalendar, setDisplayCalendar] = useState(false);

  useEffect(() => {
    getSingleTherapist(id);
    getTherapistTimeTable(id);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "services", "reviews"]
      let currentSection = "about"
      const navbarHeight = 120
      const tabHeight = 64
      const totalOffset = navbarHeight + tabHeight

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= totalOffset) {
            currentSection = sectionId
          }
        }
      })

      setActiveTab(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) {
    return <div className="text-center text-navy">Loading...</div>;
  }

  if (error || !singleTherapist) {
    return <div className="text-center text-mauve">Therapist not found!</div>;
  }

  // console.log(singleTherapist);

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId)
    const element = document.getElementById(sectionId)
    const navbarHeight = 120 
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 64 // 80px navbar + 64px tab navigation

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

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
      <div className="sticky top-[80px] z-10 w-full max-w-6xl h-100 px-8 py-4 bg-offWhite dark:bg-background-darker border-b-2 border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
          <div className="flex justify-start items-end space-x-4 md:space-x-8 lg:space-x-16 min-w-max">
            <button 
              onClick={() => scrollToSection("about")}
              className={`py-2 px-1 border-b-2 text-sm md:text-base lg:text-lg whitespace-nowrap ${
                activeTab === "about"
                  ? "border-seaGreen text-seaGreen"
                  : "border-transparent  hover:text-seaGreen hover:border-seaGreen"
              } font-bold transition-colors duration-200`}
            >About</button>
            <button
              onClick={() => scrollToSection("experience")}
              className={`py-2 px-1 border-b-2 text-sm md:text-base lg:text-lg whitespace-nowrap ${
                activeTab === "experience"
                  ? "border-seaGreen text-seaGreen"
                  : "border-transparent hover:text-seaGreen hover:border-seaGreen"
              } font-bold transition-colors duration-200`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`py-2 px-1 border-b-2 text-sm md:text-base lg:text-lg whitespace-nowrap ${
                activeTab === "services"
                  ? "border-seaGreen text-seaGreen"
                  : "border-transparent  hover:text-seaGreen hover:border-seaGreen"
              } font-bold transition-colors duration-200`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className={`py-2 px-1 border-b-2 text-sm md:text-base lg:text-lg whitespace-nowrap ${
                activeTab === "reviews"
                  ? "border-seaGreen text-seaGreen"
                  : "border-transparent hover:text-seaGreen hover:border-seaGreen"
              } font-bold transition-colors duration-200`}
            >
              Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-4">

        <TeamDetailBody />
        
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
