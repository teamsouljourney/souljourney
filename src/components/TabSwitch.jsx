import { useEffect, useState } from "react";
import TeamCard from "../components/team/TeamCard";
import useCategoryCall from "../hooks/useCategoryCall";
import useTherapistCall from "../hooks/useTherapistCall";
import { useDispatch, useSelector } from "react-redux";
import MoreCategories from "../components/MoreCategories";
import { setSelectedCategory } from "../features/categorySlice";

const TabSwitch = () => {
  const dispatch=useDispatch()
  const [searchTerm, setSearchTerm] = useState("");
  const { categories,selectedCategory } = useSelector((state) => state.categories);
  const { getAllCategories} = useCategoryCall();
  const { getAllTherapists, getFilterTherapists } = useTherapistCall();

  useEffect(() => {
    getAllCategories();
    getAllTherapists();
    console.log("Therapist API cagirildi");
    console.log(getAllCategories());
  }, []);

  // Kategoriyi değiştiren fonksiyon
  const handleTabClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId))
    getFilterTherapists(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="w-full h-full mt-5  mx-auto">
        <div className=" opacity-3 p-1 rounded-t-lg">
          <div className="flex flex-wrap justify-center space-x-4 ">
            {categories.slice(0, 5).map((category) => (
              <button
                key={category._id}
                className={`px-4 py-2 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-5 rounded-lg ${
                  selectedCategory === category._id
                    ? "bg-navy-light text-white shadow-lg scale-105"
                    : ""
                }`}
                onClick={() => handleTabClick(category._id)}
              >
                {category.name}
              </button>
            ))}

            {/* More Categories Bileşeni */}
            <MoreCategories />
            {/* Arama kutusu */}
            <div className="mt-5 flex justify-center">
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-2 py-2 rounded-lg focus:outline-none"
              />
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default TabSwitch;
