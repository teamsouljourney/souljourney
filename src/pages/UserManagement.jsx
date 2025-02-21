import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import useUserCall from "../hooks/useUserCall";
import UserRow from "../components/adminPanel/UserRow";
import UserForm from "../components/adminPanel/UserForm";
import { toggleModal } from "../features/userSlice";
import AdminModal from "../components/adminPanel/AdminModal";
import ListToolbar from "../components/adminPanel/ListToolBar";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, isModalOpen } = useSelector((state) => state.users);
  const { getAllUsers } = useUserCall();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleToogleModal = (payload) => {
    dispatch(toggleModal(payload));
  };

  return (
    <div className="container py-10 mx-auto ">
      <div className="bg-white border rounded-lg shadow-sm">
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
                Add a new User
              </button>
            }
          />
          <div className="space-y-4">
            <div className="hidden text-sm font-medium text-gray-500 md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-4">User</div>
              <div className="col-span-4">Email</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {users.map((user) => (
              <UserRow key={user._id} user={user} />
            ))}
          </div>

          <div className="flex items-center justify-between px-2 mt-4">
            <div className="text-sm text-gray-500">
              Toplam {users.length} çalışandan 1-{users.length} arası
              gösteriliyor
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                Önceki
              </button>
              <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 text-sm rounded hover:bg-gray-50">
                3
              </button>
              <span className="px-2">...</span>
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                Sonraki
              </button>
            </div>
          </div>
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
