import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../features/chatSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserAvatar from "./UserAvatar";

export default function LeftSidebar({ isOpen, toggleSidebar }) {
  const { t } = useTranslation();
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { selectedUser } = useSelector((state) => state.chats);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get unique appointments based on user type
    const uniqueAppointments = Array.from(
      new Map(
        currentUserAppointments.map((appointment) => [
          currentUser.isTherapist
            ? appointment.userId._id
            : appointment.therapistId._id,
          appointment,
        ])
      ).values()
    );
    setFilteredAppointments(uniqueAppointments);
  }, [currentUserAppointments, currentUser.isTherapist]);

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (!searchTerm) {
      const uniqueAppointments = Array.from(
        new Map(
          currentUserAppointments.map((appointment) => [
            currentUser.isTherapist
              ? appointment.userId._id
              : appointment.therapistId._id,
            appointment,
          ])
        ).values()
      );
      setFilteredAppointments(uniqueAppointments);
      return;
    }

    const filteredByName = currentUserAppointments.filter((appointment) => {
      const contactPerson = currentUser.isTherapist
        ? appointment.userId
        : appointment.therapistId;
      return contactPerson.firstName.toLowerCase().startsWith(searchTerm);
    });

    const uniqueFilteredContacts = Array.from(
      new Map(
        filteredByName.map((appointment) => [
          currentUser.isTherapist
            ? appointment.userId._id
            : appointment.therapistId._id,
          appointment,
        ])
      ).values()
    );

    setFilteredAppointments(uniqueFilteredContacts);
  };

  const handleUserClick = (contactPerson) => {
    const contactId = contactPerson._id;
    dispatch(setSelectedUser(contactId));
  };

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-30 w-80 border-r transition-transform duration-300 ease-in-out md:translate-x-0 md:static text-navy dark:text-offWhite bg-background dark:bg-background-dark`}
    >
      <div className="p-4 border-b">
        <form onChange={handleChange}>
          <div className="relative">
            <svg
              className="absolute left-2 top-2.5 h-4 w-4 text-offWhite-dark"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder={t("LeftSidebar.searchMessagePlaceholder")}
              className="w-full pl-8 pr-4 py-2 border rounded-lg"
            />
          </div>
        </form>
      </div>
      <div className="overflow-y-auto h-full">
        {/* Chat List */}
        {filteredAppointments.map((appointment) => {
          // Determine the correct contact person based on user type
          const contactPerson = currentUser.isTherapist
            ? appointment.userId
            : appointment.therapistId;

          return (
            <div
              className="p-4 hover:bg-offWhite-dark dark:hover:bg-background-lightdark cursor-pointer"
              key={contactPerson._id}
              onClick={() => handleUserClick(contactPerson)}
            >
              <div className="flex items-center gap-3">
                {/* <div className="w-10 h-10 rounded-full border-2 border-seaGreen-light flex items-center justify-center">
                  {contactPerson?.image ? (
                    <img
                      alt=""
                      src={contactPerson.image}
                      className="rounded-full size-6 sm:size-8 object-cover overflow-hidden"
                    />
                  ) : (
                    <div className="flex items-center justify-center rounded-full size-8 bg-navy text-offWhite">
                      <span className="text-sm font-medium">
                        {contactPerson.firstName.charAt(0).toUpperCase() +
                          contactPerson.lastName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div> */}
                <UserAvatar userData={contactPerson} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-sm">
                      {contactPerson.firstName.toUpperCase()}{" "}
                      {contactPerson.lastName.toUpperCase()}
                    </p>
                    <span className="text-xs text-right">
                      {contactPerson.isOnline ? (
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <p className="text-xs">{t("LeftSidebar.online")}</p>
                        </div>
                      ) : (
                        (() => {
                          const date = new Date(contactPerson.lastSeen);
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);

                          if (date.toDateString() === today.toDateString()) {
                            return (
                              <span className="text-xs">
                                {date.toLocaleString("de-DE", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            );
                          } else {
                            return (
                              <span className="text-xs">
                                {date.toLocaleString("de-DE", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                })}
                              </span>
                            );
                          }
                        })()
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
