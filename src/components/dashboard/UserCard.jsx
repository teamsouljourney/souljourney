import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import useUserCall from "../../hooks/useUserCall";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useEffect } from "react";

export default function UserCard() {
  const { getSingleUser } = useUserCall();
  const { getSingleTherapist } = useTherapistCall();
  const { currentUser } = useSelector((state) => state.auth);
  const { singleTherapist } = useSelector((state) => state.therapists);
  const { singleUser } = useSelector((state) => state.users);
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser?._id) {
      if (currentUser.isTherapist) {
        getSingleTherapist(currentUser._id);
      } else {
        getSingleUser(currentUser._id);
      }
    }
  }, [currentUser._id]);

  const userData = currentUser.isTherapist ? singleTherapist : singleUser;

  return (
    <>
      <div className="w-full min-h-[200px] bg-gradient-to-bl from-navy-dark to-seaGreen-dark p-4 sm:p-6 rounded-xl m-4 sm:m-10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold sm:text-4xl md:text-5xl text-offWhite">
            {userData?.firstName?.toUpperCase()}{" "}
            {userData?.lastName?.toUpperCase()}
          </h1>
          <p className="max-w-xs mt-4 text-xs sm:text-sm md:text-base text-offWhite-dark sm:max-w-md md:max-w-full">
            {userData?.description}
          </p>
        </div>
        <div className="flex mt-4 sm:mt-0">
          <div className="shrink-0">
            <img
              src={
                userData?.image ||
                "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
              }
              alt="Profile"
              className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container px-4 py-6 mx-auto">
        {/* User Info Section */}
        <div className="p-4 mt-4 rounded-lg shadow sm:p-6 bg-seaGreen-light/40 text-navy dark:text-offWhite">
          <h2 className="mb-4 text-lg font-bold sm:text-xl">
            {t("personalInfo")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 font-semibold text-navy dark:text-offWhite">
                {t("email")} :
              </p>
              <p className="text-sm font-medium sm:text-base text-navy dark:text-offWhite/60">
                {userData?.email}
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-navy dark:text-offWhite">
                {t("dateOfMembership")} :
              </p>
              <p className="text-sm font-medium sm:text-base text-navy dark:text-offWhite/60">
                {userData?.createdAt
                  ? format(new Date(userData?.createdAt), "dd.MM.yyyy")
                  : "-"}
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-navy dark:text-offWhite">
                {t("address")} :
              </p>
              <p className="text-sm font-medium sm:text-base text-navy dark:text-offWhite/60">
                {userData?.address || "-"}
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-navy dark:text-offWhite">
                {t("memberId")} :
              </p>
              <p className="text-sm font-medium sm:text-base text-navy dark:text-offWhite/60">
                {userData?._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
