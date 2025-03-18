import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useDispatch, useSelector } from "react-redux";
import AppointmentCalendar from "../calendar/AppointmentCalendar";
import Button from "../button/Button";
import TeamDetailHeader from "./TeamDetailHeader";
import TeamDetailBody from "./TeamDetailBody";
import { useTranslation } from "react-i18next";
import { getSingleTherapistSuccess } from "../../features/therapistSlice";
import useTabNavigation from "../../hooks/useTabNavigation";

const TeamDetail = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleTherapist, getTherapistTimeTable } = useTherapistCall();
  const { singleTherapist, loading, error } = useSelector(
    (state) => state.therapists
  );
  const { currentUser } = useSelector((state) => state.auth);

  // Section IDs for Tab Navigation
  const sectionIds = ["about", "experience", "services", "reviews"];

  // Translation mapping for display purposes
  const sectionLabels = {
    about: t("TN-about"),
    experience: t("TN-experience"),
    services: t("TD-services-title"),
    reviews: t("TD-reviews-title"),
  }

  // UseTabNavigation Call
  const { activeTab, scrollToSection, sectionRefs } = useTabNavigation(sectionIds, {
    navbarHeight: 120,
    tabHeight: 64,
  })

  // Appointment Calendar Display State
  const [displayCalendar, setDisplayCalendar] = useState(false);

  useEffect(() => {
    getSingleTherapist(id);
    getTherapistTimeTable(id);
  }, [id]);

  useEffect(() => {
    dispatch(getSingleTherapistSuccess(null));
    // dispatch(getSingleTherapistFeedbacksSuccess())
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-seaGreen"></div>
      </div>
    );
  }

  if (error || !singleTherapist) {
    return <div className="text-center text-mauve">{t("therapistNotFound")}!</div>;
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
        <TeamDetailHeader
          singleTherapist={singleTherapist}
          currentUser={currentUser}
          toggleCalendar={toggleCalendar}
        />
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-[80px] z-10 w-full max-w-6xl h-100 px-8 py-4 bg-offWhite dark:bg-background-darker border-b-2 border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
          <div className="flex justify-start items-end space-x-4 md:space-x-8 lg:space-x-16 min-w-max">
            {sectionIds.map((sectionId) => (
              <button
                key={sectionId}
                onClick={() => scrollToSection(sectionId)}
                className={`py-2 px-1 border-b-2 text-sm md:text-base lg:text-lg whitespace-nowrap ${
                  activeTab === sectionId
                    ? "border-seaGreen text-seaGreen"
                    : "border-transparent hover:text-seaGreen hover:border-seaGreen"
                } font-bold transition-colors duration-200`}
              >
                {sectionLabels[sectionId]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full px-4">
        <TeamDetailBody sectionRefs={sectionRefs} />
      </div>
      {/* GoBack */}
      <div className="p-6 pt-0 mt-8 text-center w-full">
        <Button onClick={() => navigate("/therapists")} type="type22">
          {t("goBack")}   {/* Go Back  */}
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
