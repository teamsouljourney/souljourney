import { useState } from "react";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useDispatch, useSelector } from "react-redux";
import {
  resetNewTherapist,
  setNewTherapist,
  toggleModal,
} from "../../features/therapistSlice";
import { useTranslation } from "react-i18next";

const TherapistForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { newTherapist } = useSelector((state) => state.therapists);
  const { createTherapist, updateTherapist } = useTherapistCall();
  const [showPassword, setShowPassword] = useState(false);

  const handleCloseModal = () => {
    dispatch(toggleModal(false));
    dispatch(resetNewTherapist());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setNewTherapist({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTherapist._id) {
      updateTherapist(newTherapist._id, newTherapist);
    } else {
      createTherapist(newTherapist);
    }

    handleCloseModal();
  };

  return (
    <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="px-4 pt-5 pb-4 bg-white dark:bg-background-dark sm:p-6 sm:pb-4">
        <h3 className="text-lg font-medium leading-6 text-navy dark:text-offWhite-dark">
          {newTherapist._id ? t("AP-editTherapist") : t("addNewTherapist")}
        </h3>
        <div className="mt-2">
          <input
            type="text"
            name="firstName"
            placeholder={t("firstName")}
            value={newTherapist.firstName || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
          <input
            type="text"
            name="lastName"
            placeholder={t("lastName")}
            value={newTherapist.lastName || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={newTherapist.email || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
          <input
            type="text"
            name="description"
            placeholder={t("description")}
            value={newTherapist.description || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
          <input
            type="text"
            name="experience"
            placeholder={t("experiences")}
            value={newTherapist.experience || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
          <input
            type="text"
            name="graduation"
            placeholder={t("graduation")}
            value={newTherapist.graduation || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark"
          />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("passwordPlaceholder")}
            value={newTherapist.password || ""}
            onChange={handleInputChange}
            disabled={!!newTherapist._id}
            className={`w-full px-3 py-2 mt-2 border rounded-md border-navy focus:outline-none focus:ring-mauve-dark focus:border-mauve-dark 
    ${newTherapist._id ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-background-dark sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-white duration-300 rounded-md bg-seaGreen transtiton hover:bg-navy sm:ml-3 sm:w-auto"
          onClick={handleSubmit}
        >
          {newTherapist._id ? t("updateTherapist") : t("addTherapist")}
        </button>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-gray-700 bg-white rounded-md hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto"
          onClick={handleCloseModal}
        >
          {t("close")} {/* Close */}
        </button>
      </div>
    </div>
  );
};

export default TherapistForm;
