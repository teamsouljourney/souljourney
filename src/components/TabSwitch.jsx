import { useEffect, useState } from "react";
import TeamCard from "../components/team/TeamCard";
import useCategoryCall from "../hooks/useCategoryCall";
import useTherapistCall from "../hooks/useTherapistCall";
import { useSelector } from "react-redux";
import MoreCategories from "../components/MoreCategories";

const TabSwitch = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { categories } = useSelector((state) => state.categories);
  const { therapists } = useSelector((state) => state.therapists);
  const { getAllCategories } = useCategoryCall();
  const { getAllTherapists } = useTherapistCall();

  useEffect(() => {
    getAllCategories();
    getAllTherapists();
    console.log("Therapist API cagirildi");
  }, []);

  // Kategoriyi değiştiren fonksiyon
  const handleTabClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Arama kutusundaki değeri güncelle
  };

  const filteredTherapists = (therapists || []).filter((therapist) => {
    // therapist nesnesinin gerekli alanlarının tanımlı olup olmadığını kontrol et
    if (!therapist || !therapist.firstName || !therapist.lastName) return false;

    const isCategoryMatch =
      selectedCategory === "All" ||
      therapist.categoryId?._id === selectedCategory;
    console.log(selectedCategory);

    const isSearchMatch =
      therapist.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.categoryId?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    console.log(isSearchMatch);

    return isCategoryMatch && isSearchMatch;
  });

  return (
    <>
      <div className="w-full h-full mt-5  mx-auto">
        <div className=" opacity-3 p-1 rounded-t-lg">
          <div className="flex flex-wrap justify-center space-x-4 ">
            {categories.slice(0, 5).map((category) => (
              <button
                key={category._id}
                className={`px-4 py-2 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-5 rounded-lg ${
                  selectedCategory === category.name
                    ? "bg-navy-light text-white shadow-lg scale-105"
                    : ""
                }`}
                onClick={() => handleTabClick(category._id)}
              >
                {category.name}
              </button>
            ))}

            {/* More Categories Bileşeni */}
            <MoreCategories
              categories={categories.slice(5)}
              handleTabClick={handleTabClick}
              selectedCategory={selectedCategory}
            />
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

        <div className="flex flex-wrap justify-center gap-4 sm:gap-2 mt-[100px] mb-[100px]">
          <TeamCard teams={filteredTherapists} />
        </div>
      </div>
    </>
  );
};

export default TabSwitch;
