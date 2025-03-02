import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../features/chatSlice";

export default function LeftSidebar({ isOpen, toggleSidebar }) {
  let { currentUserAppointments } = useSelector((state) => state.appointments);
  const { currentUser } = useSelector((state) => state.auth);
  const { chats, selectedUser } = useSelector((state) => state.chats);
  const dispatch = useDispatch();

  console.log(chats);
  console.log(currentUserAppointments);

  let agenda = [];

  currentUser.isTherapist == true
    ? agenda.push(currentUserAppointments.map((user) => user.userId))
    : agenda.push(
        currentUserAppointments.map((therapist) => therapist.therapistId)
      );

  console.log("ajanda", agenda);

  const handleUserClick = (user) => {
    const userId = user._id;
    dispatch(setSelectedUser(userId));
  };
  console.log(selectedUser);
  console.log("leftChats", chats);
  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-30 w-80 bg-offWhite border-r transition-transform duration-300 ease-in-out md:translate-x-0 md:static`}
    >
      <div className="p-4 border-b">
        <div className="relative">
          <svg
            className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
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
            placeholder="Search messages"
            className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="overflow-y-auto h-full">
        {/* Chat List */}

        {agenda[0].map((item) => (
          <div
            className="p-4 hover:bg-slate-50 cursor-pointer"
            key={item?._id}
            onClick={() => handleUserClick(item)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-seaGreen-light flex items-center justify-center">
                {item?.image ? (
                  <img
                    alt=""
                    src={item?.image}
                    className="rounded-full size-6 sm:size-8"
                  />
                ) : (
                  <div className="flex items-center justify-center rounded-full size-8 bg-navy-dark">
                    <span className="text-sm font-medium text-offWhite-light">
                      {item?.firstName.charAt(0).toUpperCase() +
                        item?.lastName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium text-navy">
                    {item?.firstName} {item?.lastName}
                  </p>
                  <span className="text-xs text-navy text-right">
                    {item?.isOnline ? (
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs text-navy">Online</p>
                      </div>
                    ) : (
                      (() => {
                        const date = new Date(item?.lastSeen);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        if (date.toDateString() === today.toDateString()) {
                          return (
                            <span className="text-xs text-navy">
                              {date.toLocaleString("de-DE", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          );
                        } else {
                          return (
                            <span className="text-xs text-navy">
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
        ))}

        {/* More chat items would go here */}
      </div>
    </div>
  );
}
