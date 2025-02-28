import { useSelector } from "react-redux";

export default function RightSidebar({ isOpen, sidebarRef }) {
  const { selectedUser } = useSelector((state) => state.chats);
  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );
  console.log(currentUserAppointments);

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

  console.log(selectedUserData);

  return (
    <div
      ref={sidebarRef}
      className={`${
        isOpen ? "translate-x-0" : "translate-x-full"
      } fixed inset-y-0 right-0 z-30 w-80 bg-white border-l transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6 text-center border-b">
        <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-4 object-cover">
          {selectedUserData[0]?.image ? (
            <img
              alt=""
              src={selectedUserData[0]?.image || "/placeholder.svg"}
              className="rounded-full size-28"
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
          {selectedUserData[0]?.firstName} {selectedUserData[0]?.lastName}
        </h3>
        <p className="text-sm text-gray-500">
          {selectedUserData[0]?.profession}
        </p>
      </div>

      <div className="p-6">
        <h4 className="font-bold mb-4 text-navy">Informations</h4>
        <div className="space-y-4">
          <p className="w-full px-4 py-2 hover:bg-gray-100 rounded-lg">
            <b className="text-navy">Email : </b>
            <i>{selectedUserData[0]?.email}</i>
          </p>
          <p className="w-full px-4 py-2 hover:bg-gray-100 rounded-lg">
            {selectedUserData[0]?.address} {selectedUserData[0]?.graduation}
          </p>
        </div>
      </div>
    </div>
  );
}
