import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { useEffect, useState } from "react";
import Notes from "./Notes";

const PatientList = () => {
  const { t } = useTranslation();
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let { currentUser } = useSelector((state) => state.auth);
  let { currentUserAppointments } = useSelector((state) => state.appointments);
  const { getUserAppointments } = useAppointmentCall();
  const { userStatuses } = useSelector((state) => state.chats);

  // console.log(userStatuses);

  useEffect(() => {
    getUserAppointments(currentUser?._id);
  }, [currentUser]);

  useEffect(() => {
    // Get unique patients from appointments
    const uniquePatients = Array.from(
      new Map(
        currentUserAppointments.map((appointment) => [
          appointment.userId?._id,
          appointment,
        ])
      ).values()
    );
    setFilteredAppointments(uniquePatients);
  }, [currentUserAppointments]);

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (!searchTerm) {
      // Show all unique patients when search is empty
      const uniquePatients = Array.from(
        new Map(
          currentUserAppointments.map((appointment) => [
            appointment.userId?._id,
            appointment,
          ])
        ).values()
      );
      setFilteredAppointments(uniquePatients);
      return;
    }

    const uniqueFilteredPatients = Array.from(
      new Map(
        currentUserAppointments
          .filter((appointment) =>
            appointment.userId?.firstName.toLowerCase().startsWith(searchTerm)
          )
          .map((appointment) => [appointment.userId?._id, appointment])
      ).values()
    );

    setFilteredAppointments(uniqueFilteredPatients);
  };

  if (currentUser && currentUser?.isTherapist === true) {
    return (
      <div className="w-full p-8 xl:w-1/2">
        <div className="relative z-10 w-full">
          {/* Header */}
          <div className="flex justify-center px-4 py-2 mb-3 text-center rounded-xl bg-seaGreen-dark">
            <p className="text-lg md:text-xl text-offWhite">
              {t("patientList")}
            </p>
          </div>

          {/* Search Form */}
          <form action="/search" className="w-full" onChange={handleChange}>
            <div className="relative">
              <input
                type="text"
                name="q"
                className="w-full h-10 px-4 py-2 border shadow rounded-xl border-seaGreen-dark dark:border-seaGreen-dark dark:text-customBlack-dark"
                placeholder={t("searchPatient")}
              />
              <button type="submit" className="absolute right-3 top-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Patient List */}
          {filteredAppointments.length === 0 ? (
            <p className="mt-1 text-xs text-gray-500 md:text-sm">
              {t("noPatient")}
            </p>
          ) : (
            <ul className="mt-8 divide-y divide-offWhite-dark dark:divide-gray-700">
              {filteredAppointments?.map(({ userId }, index) => (
                <li
                  key={index}
                  className="flex items-center transition-colors duration-200 rounded-md hover:bg-offWhite dark:hover:bg-navy"
                >
                  <span className="w-2 h-16 md:h-20 bg-seaGreen-dark rounded-r-md" />
                  <div className="flex flex-1 gap-3 p-3 md:p-4 md:gap-4">
                    {/* Avatar */}
                    <div className="shrink-0">
                      <img
                        className="w-12 h-12 rounded-full md:h-14 md:w-14"
                        src={userId?.image}
                        alt=""
                      />
                    </div>

                    {/* Patient Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        {/* Name and Email */}
                        <div>
                          <p className="text-sm font-semibold md:text-base text-navy dark:text-offWhite-light">
                            {userId?.firstName.toUpperCase()}{" "}
                            {userId?.lastName.toUpperCase()}
                          </p>
                          <p className="mt-1 text-xs text-gray-500 md:text-sm">
                            {userId?.email}
                          </p>
                        </div>

                        {/* Time and Status */}
                        <div className="flex flex-col items-center gap-2">
                          <Notes currentUser={currentUser} userId={userId} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
};

export default PatientList;
