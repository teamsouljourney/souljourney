import { format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );

  if (currentUser && currentUser?.isTherapist === false) {
    return (
      <div className="w-full xl:w-1/2 p-8 ">
        {/* Header */}
        <div className="flex justify-center px-4 py-2 text-center rounded-xl mb-3 bg-seaGreen-dark">
          <p className="text-lg md:text-xl text-offWhite">
            {t("appointmentList")}
          </p>
        </div>

        {currentUserAppointments.length === 0 ? (
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            {t("noAppointment")}
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-offWhite-dark dark:divide-gray-700">
            {currentUserAppointments?.map((appointment) => (
              <li
                key={appointment._id}
                className="flex items-center hover:bg-offWhite dark:hover:bg-navy rounded-md transition-colors duration-200"
              >
                <span className="w-2 h-16 md:h-20 bg-seaGreen-dark rounded-r-md" />
                <div className="flex flex-1 p-3 md:p-4 gap-3 md:gap-4">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <img
                      className="h-12 w-12 md:h-14 md:w-14 rounded-full"
                      src={appointment?.therapistId?.image}
                      alt=""
                    />
                  </div>

                  {/* Therapist Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      {/* Name and Email */}
                      <div>
                        <p className="text-sm md:text-base font-semibold text-navy dark:text-offWhite-light">
                          {appointment?.therapistId?.firstName.toUpperCase()}{" "}
                          {appointment?.therapistId?.lastName.toUpperCase()}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                          {appointment?.therapistId?.email}
                        </p>
                      </div>

                      {/* Time and Status */}
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-navy dark:text-offWhite mt-1">
                          {format(
                            new Date(appointment.appointmentDate),
                            "dd.MM.yyyy"
                          )}
                        </p>
                        <span className="px-2 py-1 bg-green-100 text-seaGreen-dark text-xs rounded-full font-semibold">
                          {format(new Date(appointment.startTime), "HH:mm")} -{" "}
                          {format(new Date(appointment.endTime), "HH:mm")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
};

export default AppointmentList;
