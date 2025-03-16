import {
  PencilIcon,
  TrashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import useUserCall from "../../hooks/useUserCall";
import { useDispatch } from "react-redux";
import { setNewUser, toggleModal } from "../../features/userSlice";
import { useTranslation } from "react-i18next";

const UserRow = ({ user }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { changeUserStatus, deleteUser } = useUserCall();

  const handleUpdateUser = (id) => {
    dispatch(setNewUser(user));
    dispatch(toggleModal(true));
  };
  // console.log(user);

  return (
    <div className="flex flex-col items-start py-4 space-y-2 border-b md:flex-row md:items-center md:space-y-0">
      <div className="flex items-center gap-3 md:w-1/3">
        <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full">
          <img
            src={
              user?.image ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt={user?.userName}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <div className="font-medium">{user?.userName}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{user?.profession}</div>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/3 md:flex-row md:items-center">
        <span className="text-sm md:mr-4">{user?.email}</span>
      </div>
      <div className="flex items-center justify-between w-full md:w-1/3">
        <div className="md:ml-4">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
              user?.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user?.isActive ? t("active") : t("disabled")}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleUpdateUser(user._id)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-background-dark"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => changeUserStatus(user._id, user.isActive)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-background-dark"
          >
            <LockClosedIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteUser(user?._id)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-background-dark"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRow;
