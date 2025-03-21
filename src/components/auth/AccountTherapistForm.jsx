import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateSingleTherapistSuccess } from "../../features/therapistSlice";
import useTherapistCall from "../../hooks/useTherapistCall";
import useCategoryCall from "../../hooks/useCategoryCall";
import { useEffect, useRef, useState } from "react";

const AccountTherapistForm = ({ singleTherapist, id }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { updateMeTherapist } = useTherapistCall();
  const { getAllCategories } = useCategoryCall();

  const { categories } = useSelector((state) => state.categories);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    dispatch(updateSingleTherapistSuccess({ [e.target.name]: e.target.value }));
  };

  // Handle category selection/deselection
  const handleCategoryToggle = (category) => {
    // Check if category is already selected
    const isSelected = singleTherapist?.categoryId?.some((cat) => cat._id === category._id );

    let updatedCategories;
    if (isSelected) {
      // Remove category if already selected
      updatedCategories = singleTherapist.categoryId.filter( (cat) => cat._id !== category._id );
    } else {
      // Add category if not selected
      updatedCategories = [...(singleTherapist.categoryId || []), category];
    }
    dispatch(updateSingleTherapistSuccess({ categoryId: updatedCategories }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryIds = singleTherapist?.categoryId?.map((category) => category._id) || [];

    const updatedTherapist = { ...singleTherapist, categoryId: categoryIds };

    updateMeTherapist(id, updatedTherapist);
  };

  // Get selected category names for display
  const selectedCategoryNames = singleTherapist?.categoryId?.map((cat) => cat.name).join(", ") || "";

  return (
    <>
      <div className="flex flex-col w-full items-start gap-4">
        <span className="text-lg mt-10 font-medium">
          {t("accountPersonelInfo")} {/* Personel Info */}
        </span>
        <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4 w-full max-w-[576px]">
          {/* First Name */}
          <div className="sm:col-span-2">
            <label htmlFor="firstName" className="peer">
              {t("firstName")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={singleTherapist?.firstName}
                placeholder={t("placeholderName")}
                autoComplete="given-name"
                className="peer w-full"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Last Name */}
          <div className="sm:col-span-2">
            <label htmlFor="lastName" className="peer">
              {t("lastName")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={singleTherapist?.lastName}
                placeholder={t("placeholderLastname")}
                autoComplete="family-name"
                className="peer w-full"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Email */}
          <div className="sm:col-span-4">
            <label htmlFor="email" className="peer">
              {t("email")}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={singleTherapist?.email}
                placeholder={t("placeholderUsername")}
                autoComplete="email"
                className="peer w-full bg-gray-50 hover:cursor-not-allowed"
                disabled
              />
            </div>
          </div>
          {/* Multi-select Category Dropdown */}
          <div className="sm:col-span-4">
            <label htmlFor="categories" className="peer">
              {t("categories")}
            </label>
            <div className="mt-2 relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-left shadow-sm focus:border-seaGreen-light focus:outline-none focus:ring-1 focus:ring-seaGreen-light"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="block truncate">
                  {selectedCategoryNames || t("selectCategories") || "Select categories"}
                </span>
                <span className="inline-flex justify-center items-center ml-1">
                  <span
                    style={{
                      maskImage: `url(/assets/sidebar/dropdownArrow.svg)`,
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                      width: "16px",
                      height: "16px",
                    }}
                    className={`h-5 w-5 bg-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  ></span>
                </span>                
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {categories.length > 0 ? (
                    categories.map((category) => {
                      // Check if this category is selected
                      const isSelected = singleTherapist?.categoryId?.some((cat) => cat._id === category._id);

                      return (
                        <div
                          key={category._id}
                          className={`relative flex cursor-pointer select-none items-center px-4 py-2 ${isSelected ? "bg-seaGreen-light/30" : "hover:bg-gray-100"}`}
                          onClick={() => handleCategoryToggle(category)}
                        >
                          <div className="flex items-center">
                            <div
                              className={`mr-2 h-4 w-4 flex items-center justify-center border ${isSelected ? "bg-seaGreen-dark border-seaGreen-dark" : "border-gray-300"} rounded`}
                            >
                              {isSelected && (
                                <span className="inline-flex justify-center items-center">
                                  <span
                                    style={{
                                      maskImage: `url(/assets/sidebar/check.svg)`,
                                      maskRepeat: "no-repeat",
                                      maskSize: "contain",
                                      width: "12px",
                                      height: "12px",
                                    }}
                                    className="bg-white "
                                  ></span>
                                </span>
                              )}
                            </div>
                            <span>{category.name}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      {t("noCategories") || "No categories available"}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Graduation/Bachelor's Degree */}
          <div className="col-span-full">
            <label htmlFor="graduation" className="peer">
              {t("graduation")} {/* Graduation */}
            </label>
            <div className="mt-2">
              <input
                id="graduation"
                name="graduation"
                type="text"
                value={singleTherapist?.graduation}
                placeholder={t("placeholderGraduation")}
                autoComplete="graduation"
                className="peer w-full"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Description/About Me */}
          <div className="col-span-full">
            <label htmlFor="description" className="peer">
              {t("description")} {/* Description */}
            </label>
            <div className="mt-2">
              <textarea
                type="description"
                name="description"
                id="description"
                rows={4}
                value={singleTherapist?.description}
                placeholder={t("placeholderDescription")}
                autoComplete="description"
                className="textarea-style"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Experiences */}
          <div className="col-span-full">
            <label htmlFor="experience" className="peer">
              {t("experiences")} {/* Experiences */}
            </label>
            <div className="mt-2">
              <textarea
                type="experience"
                name="experience"
                id="experience"
                rows={4}
                value={singleTherapist?.experience}
                placeholder={t("placeholderExperiences")}
                autoComplete="experience"
                className="textarea-style"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Update Profile Button */}
        <div className="flex w-full flex-col items-start justify-center gap-6 mt-6">
          <button
            type="button"
            className="account-btn mb-4 w-1/2"
            onClick={handleSubmit}
          >
            {t("updateProfile")} {/* Update Profile */}
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountTherapistForm;
