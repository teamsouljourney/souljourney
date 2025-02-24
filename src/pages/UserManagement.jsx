import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useUserCall from "../hooks/useUserCall";
import UserRow from "../components/adminPanel/UserRow";
import UserForm from "../components/adminPanel/UserForm";
import { toggleModal } from "../features/userSlice";
import AdminModal from "../components/adminPanel/AdminModal";
import ListToolbar from "../components/adminPanel/ListToolBar";
import Pagination from "../components/adminPanel/Pagination";

const UserManagement = () => {
  const { getAllUsers } = useUserCall();
  const { isModalOpen, users } = useSelector((state) => state.users);
  const { pagUsers } = useSelector((state) => state.pagination);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container py-10 mx-auto ">
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-6">
          <ListToolbar
            title="User List"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search user..."
            actions="Add a new User"
          />
          <div className="space-y-4">
            <div className="hidden text-sm font-medium text-gray-500 md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-4">User</div>
              <div className="col-span-4">Email</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {pagUsers?.map((user) => (
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
