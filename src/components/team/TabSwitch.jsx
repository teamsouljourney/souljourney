import { useState } from "react";
// import Card from "../team/Card";
import teams from "../../helper/team.json";
import TeamCard from "./TeamCard";
const TabSwitch = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state

  const tablist = [
    "All",
    "Health Psychology",
    "Educational Psychology",
    "Neuropsychology",
    "Marriage and Family ",
  ];

    // Kategoriyi değiştiren fonksiyon
  const handleTabClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Arama kutusundaki değeri güncelle
  };


// Filtrelenmiş takımlar
const filteredTeams = teams.filter((team) => {
  // Kategori filtrelemesi
  const isCategoryMatch = selectedCategory === "All" || team.area === selectedCategory;
  
  // Arama terimiyle istenen takımı filtrele
  const isSearchMatch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         team.description.toLowerCase().includes(searchTerm.toLowerCase());

  return isCategoryMatch && isSearchMatch; // Hem kategoriye hem de arama terimine uyanları göster
});
 
  return (
    <>
      <div className="w-full h-full mt-5  mx-auto">
        <div className=" opacity-3 p-1 rounded-t-lg">
          <div className="flex flex-wrap justify-center space-x-4 ">
            {tablist.map((list) => (
              <button
              key={list}
                className={"px-4 py-1 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out  rounded-lg"}
                onClick={() => handleTabClick(list)}
              >
                {list}
              </button>
            ))}
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

       

        <div className="flex flex-wrap justify-center gap-4 sm:gap-2 mt-5">
          <TeamCard teams={filteredTeams}  />
        </div>
      </div>
    </>
  );
};

export default TabSwitch;
