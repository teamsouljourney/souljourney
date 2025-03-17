import { useState } from "react";
import useUserCall from "../../hooks/useUserCall";
import { useDispatch, useSelector } from "react-redux";
import {
  resetNewUser,
  setNewUser,
  toggleModal,
} from "../../features/userSlice";
import { useTranslation } from "react-i18next";

const UserForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { newUser } = useSelector((state) => state.users);
  const { createUser, updateUser } = useUserCall();
  const [showPassword, setShowPassword] = useState(false);

  const handleCloseModal = () => {
    dispatch(toggleModal(false));
    dispatch(resetNewUser());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setNewUser({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newUser._id) {
      updateUser(newUser._id, newUser);
    } else {
      createUser(newUser);
    }

    handleCloseModal();
  };

  return (
    <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="px-4 pt-5 pb-4 bg-white dark:bg-background-dark sm:p-6 sm:pb-4">
        <h3 className="text-lg font-medium leading-6 text-navy dark:text-offWhite-dark">
          {newUser._id ? t("AP-editUser") : t("addNewUser")}
        </h3>
        <div className="mt-2">
          <input
            type="text"
            name="userName"
            placeholder={t("username")}
            value={newUser.userName || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={newUser.email || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
          <input
            type="text"
            name="firstName"
            placeholder={t("firstName")}
            value={newUser.firstName || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
          <input
            type="text"
            name="lastName"
            placeholder={t("lastName")}
            value={newUser.lastName || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("passwordPlaceholder")}
            value={newUser.password || ""}
            onChange={handleInputChange}
            disabled={!!newUser._id}
            className={`w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark 
    ${newUser._id ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-background-dark sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-white duration-300 rounded-md bg-seaGreen transtiton hover:bg-navy sm:ml-3 sm:w-auto"
          onClick={handleSubmit}
        >
          {newUser._id ? t("updateUser") : t("addUser")}
        </button>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-gray-700 bg-white rounded-md hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto"
          onClick={handleCloseModal}
        >
          {t("close")} {/* close */}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
