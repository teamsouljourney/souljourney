import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useCategoryCall from "../hooks/useCategoryCall";

const MoreCategories = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { categories } = useSelector((state) => state.categories);
  const { getAllCategories } = useCategoryCall();

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleTabClick = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false); // Kategori seçildiğinde menüyü kapat
  };

  return (
    <div className="relative" tabIndex={0} onBlur={() => setIsMenuOpen(false)}>
      {/* "More Categories" Butonu */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`px-2 py-2 text-black font-semibold border-b-2 hover:bg-seaGreen-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-3 rounded-lg ${
          isMenuOpen ? "bg-navy-light text-white shadow-lg scale-105" : ""
        }`}
      >
        More Categories
      </button>

      {/* Açılan Menü */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 bg-white border shadow-md mt-1 w-fit z-10 max-h-60 overflow-y-auto">
          {categories.slice(5).map((category) => (
            <button
              key={category._id || category.name}
              onClick={() => handleTabClick(category.name)}
              className={`px-4 py-2 text-black hover:bg-navy-light rounded-lg ${
                selectedCategory === category.name
                  ? "bg-navy-light text-white shadow-lg scale-105"
                  : ""
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreCategories;
