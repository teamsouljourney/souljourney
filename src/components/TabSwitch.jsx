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
  const { categories} = useSelector(
    (state) => state.categories
  );
  const {therapists}=useSelector((state)=>state.therapists)
  console.log("Therapist state:",therapists);
  
  const { getAllCategories } = useCategoryCall();
  const { getAllTherapists, getFilterTherapists } = useTherapistCall();

  // useEffect(() => {
  //   getAllCategories();
  //   getAllTherapists();
 
  // }, []);




  const handleTabClick = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
  
    if (categoryId) {
      getFilterTherapists(categoryId);
    } 
    // else {
    //   getAllTherapists();
      
    // }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAllClick= ()=>{
    getAllTherapists()
  }
  
  return (
    <>
      <div className="w-full h-full mt-5  mx-auto">
        <div className=" opacity-3 p-1 rounded-t-lg">
          <div className="flex flex-wrap justify-center space-x-4 ">
            <button
              onClick={handleAllClick}
              className="px-4 py-2 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-5 rounded-lg"
            >
              All
            </button>
            {categories.slice(0, 4).map((category) => (
              <button
                key={category._id}
                className="px-4 py-2 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-5 rounded-lg"
                onClick={() => handleTabClick(category._id)}
              >
                {category.name}
              </button>
            ))}

            {/* More Categories Bileşeni */}
            <MoreCategories />

            {/* Arama kutusu */}
            <div className=" flex justify-center items-center">
              <input
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={handleSearchChange}
                className=" rounded-lg focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabSwitch;
