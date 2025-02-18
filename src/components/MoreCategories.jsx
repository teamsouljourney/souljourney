import { useState } from "react";

const MoreCategories = ({ categories, handleTabClick, selectedCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Category burda cekilcek props yerine
  return (
    <div className="relative ">
      {/* "More Categories" Butonu */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`px-2 py-2  text-black font-semibold border-b-2 hover:bg-seaGreen-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-3 rounded-lg ${
          isMenuOpen ? "bg-navy-light text-white shadow-lg scale-105" : ""
        }`}
      >
        More Categories
      </button>

      {/* Hamburger Menü (Daha fazla kategori) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 bg-white border shadow-md mt-1 w-fit z-10 max-h-60 overflow-y-auto">
          {categories.map((category) => (
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
