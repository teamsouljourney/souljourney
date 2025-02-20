import { useEffect, useState } from "react";
import TeamCard from "../components/team/TeamCard";
import useCategoryCall from "../hooks/useCategoryCall";
import useTherapistCall from "../hooks/useTherapistCall";
import { useDispatch, useSelector } from "react-redux";
import MoreCategories from "../components/MoreCategories";
import { setSelectedCategory } from "../features/categorySlice";

const TabSwitch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategoryState] = useState(null); // Başlangıçta All seçili
  const { categories } = useSelector((state) => state.categories);
  const { therapists } = useSelector((state) => state.therapists);

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
    if (selectedCategory === categoryId) {
      setSelectedCategoryState(null); 
      dispatch(setSelectedCategory(null));
    } else {
      setSelectedCategoryState(categoryId);
      dispatch(setSelectedCategory(categoryId));
    }
  };

  const handleAllClick = () => {
    setSelectedCategoryState(null);
    dispatch(setSelectedCategory(null));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full h-full mt-5 mx-auto">
      <div className="opacity-3 p-1 rounded-t-lg">
        <div className="flex flex-wrap justify-center space-x-4">
          {/* All Butonu */}
          <button
            onClick={handleAllClick}
            className={`px-4 py-2 font-semibold border-b-4 transition-all duration-300 ease-in-out mb-5 rounded-lg ${
              selectedCategory === null ? "bg-navy-light text-white" : "text-black hover:bg-navy-light"
            }`}
          >
            All
          </button>

          {/* Kategori Butonları */}
          {categories.slice(0, 4).map((category) => (
            <button
              key={category._id}
              className={`px-4 py-2 font-semibold border-b-4 transition-all duration-300 ease-in-out mb-5 rounded-lg ${
                selectedCategory === category._id ? "bg-navy-light text-white" : "text-black hover:bg-navy-light"
              }`}
              onClick={() => handleTabClick(category._id)}
            >
              {category.name}
            </button>
          ))}

          {/* More Categories Bileşeni */}
          <MoreCategories />

          {/* Arama kutusu */}
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search Therapist..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="rounded-lg focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSwitch;
