import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useCategoryCall from "../hooks/useCategoryCall";
import MoreCategories from "./MoreCategories";
import { useTranslation } from "react-i18next";
import { setSelectedCategory } from "../features/categorySlice";

// /**
//  * TabSwitch Component - A reusable component for category filtering
//  * @param {Object} props - Component props
//  * @param {string} props.itemType - Type of items to display ('therapists' or 'blogs')
//  * @param {string} props.searchTerm - Current search term
//  * @param {Function} props.onSearchChange - Function to handle search term changes
//  * @param {Function} props.onCategoryChange - Function to handle category selection
//  * @param {string} [props.searchPlaceholder] - Optional custom placeholder for search input
//  */
const TabSwitch = ({
  itemType,
  searchTerm,
  onSearchChange,
  onCategoryChange,
  placeholder,
  onAllDataFetch,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { selectedCategory, categories, loading } = useSelector(
    (state) => state.categories
  );
  const { getAllCategories } = useCategoryCall();

  // Fetch categories on component mount
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleAllClick = () => {
    dispatch(setSelectedCategory(null));
    onAllDataFetch();
  };

  // Handle category button click
  const handleCategoryClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    onCategoryChange(categoryId);
    setMenuOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="w-full py-4 px-4 mx-auto">
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg border border-navy dark:border-offWhite-dark text-navy dark:text-offWhite-dark hover:bg-navy-light hover:text-white transition-all duration-300"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute right-4 mt-2 w-64 bg-white dark:bg-background-lightdark shadow-lg rounded-lg z-50 border border-gray-200">
          <div className="p-2 flex flex-col">
            <button
              onClick={handleAllClick}
              className={`text-left px-4 py-3 rounded-lg mb-1 transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-navy-light dark:bg-seaGreen-dark text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-500"
              }`}
            >
              {t("all")}
            </button>

            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className={`text-left px-4 py-3 rounded-lg mb-1 transition-all duration-300 ${
                  selectedCategory === category._id
                    ? "bg-navy-light dark:bg-seaGreen-dark text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-500"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Category Tabs */}
      <div className="hidden md:flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={handleAllClick}
          className={`px-4 py-2 font-semibold rounded-lg transition-all duration-300 ${
            selectedCategory === null
              ? "bg-navy-light dark:bg-seaGreen-dark text-white shadow-md"
              : "bg-white dark:bg-background-lightdark text-navy dark:text-offWhite-dark hover:bg-navy-light/30 dark:hover:bg-gray-500 hover:text-white border dark:border-background-lightdark"
          }`}
        >
          {t("all")}
        </button>

        {/* Display first 4 categories */}
        {categories.slice(0, 4).map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            className={`px-4 py-2 font-semibold rounded-lg transition-all duration-300 hover:bg-sea ${
              selectedCategory === category._id
                ? "bg-navy-light dark:bg-seaGreen-dark text-white shadow-md"
                : "bg-white dark:bg-background-lightdark text-navy dark:text-offWhite-dark hover:bg-navy-light/30 dark:hover:bg-gray-500 hover:text-white border dark:border-background-lightdark"
            }`}
          >
            {category.name}
          </button>
        ))}

        {/* More Categories dropdown */}
        {categories.length > 4 && (
          <MoreCategories
            categories={categories.slice(4)}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryClick}
          />
        )}
      </div>

      {/* Search Input */}
      <div className="flex justify-center mt-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 mt-8 rounded-lg border dark:bg-background-dark dark:hover:bg-gray-600 border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-navy-light dark:focus:ring-gray-400 transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-[calc(50%+16px)] transform -translate-y-1/2 text-gray-500 hover:text-navy dark:hover:text-offWhite-dark"
              aria-label="Clear search"
            >
              <FaTimes size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabSwitch;
