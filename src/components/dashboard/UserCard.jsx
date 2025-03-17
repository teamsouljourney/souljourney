import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import AppointmentCancel from "../appointment/AppointmentCancel";
import AppointmentEdit from "../appointment/AppointmentEdit";
import { useNavigate } from "react-router-dom";

export default function UserCard() {
  const { currentUser } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full min-h-[200px] bg-gradient-to-bl from-navy-dark to-seaGreen-dark p-6 rounded-xl m-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl sm:text-5xl text-offWhite">
            {currentUser.firstName.toUpperCase()}{" "}
            {currentUser.lastName.toUpperCase()}
          </h1>
          <p className="mt-6 text-sm text-offWhite-dark w-52 md:w-full">
            {currentUser.description}
          </p>
        </div>
        <div className="flex">
          <div className="shrink-1">
            <img
              src={
                currentUser.image ||
                "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
              }
              alt="Profile"
              className="sm:w-[150px] sm:h-[150px] min-w-[120px]  rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container px-4 py-6 mx-auto">
        {/* User Info Section */}
        <div className="p-6 mt-4 rounded-lg shadow bg-seaGreen-light/40 text-navy dark:text-offWhite">
          <h2 className="mb-4 text-xl font-bold">{t("personalInfo")}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1 font-semibold  text-navy dark:text-offWhite">
                Email :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {currentUser?.email}
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-navy dark:text-offWhite">
                {t("dateOfMembership")} :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {format(new Date(currentUser?.createdAt), "dd.MM.yyyy")}
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold  text-navy dark:text-offWhite">
                {t("address")} :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {currentUser?.address}
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-navy dark:text-offWhite">
                {t("memberId")} :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {currentUser?._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
