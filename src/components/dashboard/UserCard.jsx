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
      <div className="w-full min-h-[200px] bg-gradient-to-bl from-navy-dark to-seaGreen-dark p-6 rounded-xl m-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl sm:text-5xl text-offWhite">
            {userData?.firstName?.toUpperCase()}{" "}
            {userData?.lastName?.toUpperCase()}
          </h1>
          <p className="mt-6 text-sm text-offWhite-dark w-52 md:w-full">
            {userData?.description}
          </p>
        </div>
        <div className="flex">
          <div className="shrink-1">
            <img
              src={
                userData?.image ||
                "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
              }
              alt="Profile"
              className="sm:w-[150px] sm:h-[150px] min-w-[120px] rounded-full object-cover"
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
              <p className="mb-1 font-semibold text-navy dark:text-offWhite">
                {t("email")} :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {userData?.email}
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-navy dark:text-offWhite">
                {t("dateOfMembership")} :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {userData?.createdAt
                  ? format(new Date(userData?.createdAt), "dd.MM.yyyy")
                  : "-"}
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-navy dark:text-offWhite">
                {t("address")} :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {userData?.address || "-"}
              </p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-navy dark:text-offWhite">
                {t("memberId")} :
              </p>
              <p className="font-medium text-navy dark:text-offWhite/60">
                {userData?._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
