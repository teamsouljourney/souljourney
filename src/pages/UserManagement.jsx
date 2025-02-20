import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import useUserCall from "../hooks/useUserCall";
import UserRow from "../components/adminPanel/UserRow";

const UserManagement = () => {
  const { users } = useSelector((state) => state.users);
  const { getAllUsers } = useUserCall();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    title: "",
    email: "",
    status: "active",
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(users);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = () => {
    // setEmployees((prev) => [
    //   ...prev,
    //   {
    //     ...newEmployee,
    //     id: prev.length + 1,
    //     avatar: "/placeholder.svg?height=40&width=40",
    //   },
    // ]);
    setNewEmployee({ name: "", title: "", email: "", status: "active" });
    setIsModalOpen(false);
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
                onClick={() => setIsModalOpen(true)}
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

            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Yeni Çalışan Ekle
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        placeholder="Ad Soyad"
                        value={newEmployee.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        name="title"
                        placeholder="Ünvan"
                        value={newEmployee.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="E-posta"
                        value={newEmployee.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddEmployee}
                >
                  Ekle
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
