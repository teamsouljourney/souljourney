import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import useCategoryCall from "../hooks/useCategoryCall";
import useTherapistCall from "../hooks/useTherapistCall";
import { useDispatch, useSelector } from "react-redux";
import MoreCategories from "../components/MoreCategories";
import { setSelectedCategory } from "../features/categorySlice";
import { setSearchTerm } from "../features/therapistSlice";
import { useTranslation } from "react-i18next";

const TabSwitch = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategoryState] = useState(null);
  const { categories } = useSelector((state) => state.categories);
  const { therapists, searchTerm } = useSelector((state) => state.therapists);

  const { getAllCategories } = useCategoryCall();
  const { getAllTherapists, getFilterTherapists } = useTherapistCall();

  useEffect(() => {
    getAllCategories();
    getAllTherapists();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getFilterTherapists(selectedCategory);
    } else {
      getAllTherapists();
    }
  }, [selectedCategory]);

  const handleTabClick = (categoryId) => {
    setSelectedCategoryState(categoryId === selectedCategory ? null : categoryId);
    dispatch(setSelectedCategory(categoryId === selectedCategory ? null : categoryId));
    setMenuOpen(false);
  };

  const handleAllClick = () => {
    setSelectedCategoryState(null);
    dispatch(setSelectedCategory(null));
    setMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full mt-5 mx-auto">
      <div className="md:hidden flex justify-end p-3">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl p-2 rounded-lg border">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute bottom-[105px] right-14 w-48 bg-transparent shadow-lg rounded-lg  z-50">
          <button onClick={handleAllClick} className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
            {t("all")}
          </button>
          {categories.slice(0, 4).map((category) => (
            <button
              key={category._id}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
              onClick={() => handleTabClick(category._id)}
            >
              {category.name}
            </button>
          ))}
          {window.innerWidth >= 768 && <MoreCategories />}
        </div>
      )}

      <div className="hidden md:flex justify-center space-x-4">
        <button
          onClick={handleAllClick}
          className={`px-4 py-2 font-semibold border-b-4 rounded-lg ${
            selectedCategory === null ? "bg-navy-light text-white" : "text-black hover:bg-navy-light"
          }`}
        >
          {t("all")}
        </button>
        {categories.slice(0, 4).map((category) => (
          <button
            key={category._id}
            className={`px-4 py-2 font-semibold border-b-4 rounded-lg ${
              selectedCategory === category._id ? "bg-navy-light text-white" : "text-black hover:bg-navy-light"
            }`}
            onClick={() => handleTabClick(category._id)}
          >
            {category.name}
          </button>
        ))}
        <MoreCategories />
      </div>

      <div className="flex justify-center items-center ">
        <input
          type="text"
          placeholder={t("searchTherapist")}
          value={searchTerm}
          onChange={handleSearchChange}
          className="rounded-lg border px-2 py-1 w-1/4 sm:w-1/3 md:w-1/3 lg:w-1/3 "
        />
      </div>
    </div>
  );
};

export default TabSwitch;
