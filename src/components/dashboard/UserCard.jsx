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
  console.log(currentUserAppointments);
  return (
    <>
      <div className="w-full min-h-[200px] bg-gradient-to-bl from-navy-dark to-seaGreen-dark p-6 rounded-xl m-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl sm:text-5xl text-offWhite">
            {currentUser.firstName.toUpperCase()}{" "}
            {currentUser.lastName.toUpperCase()}
          </h1>
          <p className="text-offWhite-dark text-sm w-52 md:w-full mt-6">
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

      <div className="container mx-auto px-4 py-6">
        {/* User Info Section */}
        <div className="mt-4 bg-seaGreen-light/40 text-navy dark:text-offWhite rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">{t("personalInfo")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className=" font-semibold text-navy dark:text-offWhite mb-1">
                Email :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {currentUser?.email}
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy dark:text-offWhite mb-1">
                {t("dateOfMembership")} :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {format(new Date(currentUser?.createdAt), "dd.MM.yyyy")}
              </p>
            </div>
            <div>
              <p className=" font-semibold text-navy dark:text-offWhite mb-1">
                {t("address")} :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {currentUser?.address}
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy dark:text-offWhite mb-1">
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
