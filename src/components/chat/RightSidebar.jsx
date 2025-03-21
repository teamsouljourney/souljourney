import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function RightSidebar({ isOpen, sidebarRef }) {
  const { t } = useTranslation();
  const { selectedUser } = useSelector((state) => state.chats);
  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );

  const selectedUserData = currentUser?.isTherapist
    ? currentUserAppointments
        ?.filter(
          (user) => user?.userId?._id?.toString() === selectedUser?.toString()
        )
        .map((user) => user?.userId)
    : currentUserAppointments
        ?.filter(
          (user) =>
            user?.therapistId?._id?.toString() === selectedUser?.toString()
        )
        .map((user) => user?.therapistId);

  return (
    <div
      ref={sidebarRef}
      className={`${
        isOpen ? "translate-x-0" : "translate-x-full"
      } fixed inset-y-0 right-0 z-30 w-80 bg-offWhite dark:bg-background-dark border-l text-navy dark:text-offWhite-dark transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6 text-center border-b">
        <div className="w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-4 object-cover">
          {selectedUserData[0]?.image ? (
            <img
              alt=""
              src={selectedUserData[0]?.image || "/placeholder.svg"}
              className="rounded-xl w-full h-full object-cover overflow-hidden"
            />
          ) : (
            <div className="flex items-center justify-center rounded-full size-20 bg-navy-dark">
              <span className="text-sm font-medium text-offWhite-light">
                {selectedUserData[0]?.firstName.charAt(0).toUpperCase() +
                  selectedUserData[0]?.lastName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <h3 className="font-semibold text-lg">
          {selectedUserData[0]?.firstName.toUpperCase()}{" "}
          {selectedUserData[0]?.lastName.toUpperCase()}
        </h3>
        <p className="text-sm">{selectedUserData[0]?.profession}</p>
      </div>

      <div className="p-6">
        <h4 className="font-bold mb-4 ">
          {/* Informations */} {t("informations")}
        </h4>
        <div className="space-y-4">
          <p className="w-full px-4 py-2 rounded-lg">
            <b className="">
              {/* Email */} {t("email")} :{" "}
            </b>
            <i>{selectedUserData[0]?.email}</i>
          </p>
          <p className="w-full px-4 py-2 rounded-lg">
            {selectedUserData[0]?.address} {selectedUserData[0]?.graduation}
          </p>
        </div>
      </div>
    </div>
  );
}
