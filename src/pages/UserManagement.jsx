import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import useUserCall from "../hooks/useUserCall";
import UserRow from "../components/adminPanel/UserRow";
import UserForm from "../components/adminPanel/UserForm";
import { toggleModal } from "../features/userSlice";

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
    <div className="container py-10 mx-auto">
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold">User List</h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Çalışan ara..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => handleToogleModal(true)}
                className="px-4 py-2 text-white transition duration-300 rounded-md bg-seaGreen hover:bg-navy focus:outline-none focus:ring-2 focus:ring-navy-dark focus:ring-opacity-50"
              >
                <PlusIcon className="inline-block w-5 h-5 mr-2" />
                Add a new User
              </button>
            </div>
          </div>
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
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <UserForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
