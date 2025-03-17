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
  const navigate = useNavigate();

  if (currentUser && currentUser?.isTherapist === false) {
    return (
      <div className="w-full p-8 xl:w-1/2 ">
        {/* Header */}
        <div className="flex justify-center px-4 py-2 mb-3 text-center rounded-xl bg-seaGreen-dark">
          <p className="text-lg md:text-xl text-offWhite">
            {t("appointmentList")}
          </p>
        </div>

        {currentUserAppointments.length === 0 ? (
          <p className="mt-1 text-xs text-gray-500 md:text-sm">
            {t("noAppointment")}
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-offWhite-dark dark:divide-gray-700">
            {currentUserAppointments?.map((appointment) => (
              <li
                key={appointment._id}
                className="flex items-center transition-colors duration-200 rounded-md hover:bg-offWhite dark:hover:bg-navy"
              >
                <span className="w-2 h-16 md:h-20 bg-seaGreen-dark rounded-r-md" />
                <div className="flex flex-1 gap-3 p-3 md:p-4 md:gap-4">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <img
                      className="w-12 h-12 rounded-full md:h-14 md:w-14"
                      src={appointment?.therapistId?.image}
                      alt=""
                    />
                  </div>

                  {/* Therapist Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      {/* Name and Email */}
                      <div>
                        <p className="text-sm font-semibold md:text-base text-navy dark:text-offWhite-light">
                          {appointment?.therapistId?.firstName.toUpperCase()}{" "}
                          {appointment?.therapistId?.lastName.toUpperCase()}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 md:text-sm">
                          {appointment?.therapistId?.email}
                        </p>
                      </div>

                      {/* Time and Status */}
                      <div className="flex flex-col items-center gap-2">
                        <p className="mt-1 text-sm text-navy dark:text-offWhite">
                          {format(
                            new Date(appointment.appointmentDate),
                            "dd.MM.yyyy"
                          )}
                        </p>
                        <span className="px-2 py-1 text-xs font-semibold bg-green-100 rounded-full text-seaGreen-dark">
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
