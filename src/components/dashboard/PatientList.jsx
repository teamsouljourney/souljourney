import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAppointmentCall from "../../hooks/useAppointmentCall";
import { useEffect } from "react";

const PatientList = () => {
  const { t } = useTranslation();
  let { currentUser, token } = useSelector((state) => state.auth);
  let { currentUserAppointments } = useSelector((state) => state.appointments);
  const { getUserAppointments } = useAppointmentCall();

  console.log(token);
  console.log(currentUser);

  useEffect(() => {
    getUserAppointments(currentUser?._id);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const filteredAppointments = currentUserAppointments.filter((appointment) =>
      appointment.userId.firstName.startWith(e)
    );

    console.log(filteredAppointments);
  };

  const getTime = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0"); // 17
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 50

    return `${hours}:${minutes}`;
  };

  if (currentUser && currentUser.isTherapist === true) {
    return (
      <div className="w-full lg:w-1/2 p-4">
        <div className="w-full lg:w-4/5 relative z-10">
          {/* Header */}
          <div className="flex justify-between p-4 text-center rounded-xl mb-3 bg-seaGreen-dark">
            <p className="text-lg md:text-xl text-offWhite">
              {t("Patients List")}
            </p>
            <div className="text-sm md:text-base text-offWhite">Today</div>
          </div>

          {/* Search Form */}
          <form
            action="/search"
            className="w-full"
            onChange={(e) => handleChange(e.target)}
          >
            <div className="relative">
              <input
                type="text"
                name="q"
                className="w-full h-12 shadow px-4 py-2 rounded-xl border border-seaGreen-dark dark:border-seaGreen-dark dark:text-customBlack-dark"
                placeholder="Search patient..."
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
          <ul className="mt-8 divide-y divide-offWhite-dark dark:divide-gray-700">
            {currentUserAppointments?.map(
              ({ userId, startTime, endTime }, index) => (
                <li
                  key={userId._id}
                  className="flex items-center hover:bg-offWhite rounded-md transition-colors duration-200"
                >
                  <span className="w-2 h-16 md:h-20 bg-seaGreen-dark rounded-r-md" />
                  <div className="flex flex-1 p-3 md:p-4 gap-3 md:gap-4">
                    {/* Avatar */}
                    <div className="shrink-0">
                      <img
                        className="h-12 w-12 md:h-14 md:w-14 rounded-full"
                        src={userId.image}
                        alt=""
                      />
                    </div>

                    {/* Patient Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        {/* Name and Email */}
                        <div>
                          <p className="text-sm md:text-base font-semibold text-gray-900">
                            {userId?.firstName.toUpperCase()}{" "}
                            {userId.lastName.toUpperCase()}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">
                            {userId.email}
                          </p>
                        </div>

                        {/* Time and Status */}
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-sm bg-pastelGreen-light px-3 py-1 rounded-lg">
                            {getTime(startTime)}
                            {" -"} {getTime(endTime)}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-emerald-500/20 p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs text-gray-500">Online</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-9">
                        <button className="text-mauve hover:text-pastelGreen-dark">
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
                              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </button>
                        <button className="text-navy hover:text-pastelGreen-dark">
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
                              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    );
  }
};

export default PatientList;
