import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUserCall from "../hooks/useUserCall";
import UserRow from "../components/adminPanel/UserRow";
import UserForm from "../components/adminPanel/UserForm";
import { toggleModal } from "../features/userSlice";
import AdminModal from "../components/adminPanel/AdminModal";
import ListToolbar from "../components/adminPanel/ListToolBar";
import Pagination from "../components/adminPanel/Pagination";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const UserManagement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAllUsers } = useUserCall();
  const { isModalOpen, users } = useSelector((state) => state.users);
  const { pagUsers } = useSelector((state) => state.pagination);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToogleModal = (payload) => {
    dispatch(toggleModal(payload));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(pagUsers);

  const displayedUsers =
    searchTerm.trim() === ""
      ? pagUsers
      : pagUsers?.filter((user) =>
          [user.userName, user.email]
            .filter(Boolean)
            .some((name) =>
              name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

  return (
    <div className="container py-10 mx-auto ">
      <div className="bg-white dark:bg-background-lightdark text-navy dark:text-offWhite-dark border rounded-lg shadow-sm">
        <div className="p-6">
          <ListToolbar
            title="User List"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search user..."
            actions={
              <button
                onClick={() => handleToogleModal(true)}
                className="px-4 py-2 text-white transition duration-300 rounded-md bg-seaGreen hover:bg-navy"
              >
                <PlusIcon className="inline-block w-5 h-5 mr-2" />
                {t("AP-addUserBtn")} {/* Add a new User */}
              </button>
            }
          />
          <div className="space-y-4">
            <div className="hidden text-sm font-medium text-gray-500 dark:text-seaGreen md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-4">{t("AP-user")} {/* User */}</div>
              <div className="col-span-4">{t("AP-email")} {/* Email */}</div>
              <div className="col-span-2">{t("AP-status")} {/* Status */}</div>
              <div className="col-span-2 text-right">{t("AP-actions")} {/* Actions */}</div>
            </div>
            {displayedUsers?.map((user) => (
              <UserRow key={user._id} user={user} />
            ))}
          </div>
          <Pagination data={users} endpoint={"users"} slice={"pagUsers"} />
        </div>
      </div>

      {isModalOpen && (
        <AdminModal>
          <UserForm />
        </AdminModal>
      )}
    </div>
  );
};

export default UserManagement;
