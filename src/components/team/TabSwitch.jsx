import { useEffect, useState } from "react";
import teams from "../../helper/team.json";
import TeamCard from "./TeamCard";
import useCategoryCall from "../../hooks/useCategoryCall";
import useTherapistCall from "../../hooks/useTherapistCall";
import { useSelector } from "react-redux";
import MoreCategories from "../MoreCategories";



const TabSwitch = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); 
  const{categories}=useSelector((state)=>state.categories)
  const{therapists}=useSelector((state)=>state.therapists)
  const {getAllCategories}=useCategoryCall();
  const{getAllTherapists} =useTherapistCall()

  useEffect(()=>{
    getAllCategories();
    getAllTherapists();
    console.log("Therapist API cagirildi");
    
  },[])

  // const tablist = [
  //   "All",
  //   "Health Psychology",
  //   "Educational Psychology",
  //   "Neuropsychology",
  //   "Marriage and Family ",
  // ];

    // Kategoriyi değiştiren fonksiyon
  const handleTabClick = (category) => {
    setSelectedCategory(category._id || category.name);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Arama kutusundaki değeri güncelle
  };


// Filtrelenmiş takımlar
// const filteredTeams = therapists.filter((therapist) => {
//   // Kategori filtrelemesi
//   const isCategoryMatch = selectedCategory === "All" || therapist.area === selectedCategory;
  
//   // Arama terimiyle istenen takımı filtrele
//   const isSearchMatch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          therapist.description.toLowerCase().includes(searchTerm.toLowerCase());

//   return isCategoryMatch && isSearchMatch; // Hem kategoriye hem de arama terimine uyanları göster
// });
const filteredTeams = (therapists || []).filter((therapist) => {
  console.log(therapist);
  
  // therapist nesnesinin gerekli alanlarının tanımlı olup olmadığını kontrol et
  if (!therapist || !therapist.firstName || !therapist.lastName) return false;

  const isCategoryMatch = selectedCategory === "All" || therapist.categoryId.name === selectedCategory;
  console.log(selectedCategory);
  
  const isSearchMatch =
    therapist.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    therapist.lastName.toLowerCase().includes(searchTerm.toLowerCase());

  return isCategoryMatch && isSearchMatch;
});


 
  return (
    <>
      <div className="w-full h-full mt-5  mx-auto">
        <div className=" opacity-3 p-1 rounded-t-lg">
          <div className="flex flex-wrap justify-center space-x-4 ">
            {categories.slice(0,4).map((category) => (
              <button
              key={category._id || category.name}
                className={"px-4 py-1 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out  rounded-lg"}
                onClick={() => handleTabClick(category)}
              >
                {category.name}
              </button>
            ))}

              {/* More Categories Bileşeni */}
          <MoreCategories 
            categories={categories.slice(5,9)} // Geriye kalan kategorileri MoreCategories'ye aktar
            handleTabClick={handleTabClick} 
            selectedCategory={selectedCategory}
          />
                 {/* Arama kutusu */}
        <div className="mt-5 flex justify-center">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={handleSearchChange} // Arama değişikliği
            className="px-2 py-2 rounded-lg focus:outline-none"
          />
        </div>
          </div>
        
        </div>

       

        <div className="flex flex-wrap justify-center gap-4 sm:gap-2 mt-[100px] mb-[100px]">
          <TeamCard teams={filteredTeams}  />
        </div>
      </div>
    </>
  );
};

export default TabSwitch;
