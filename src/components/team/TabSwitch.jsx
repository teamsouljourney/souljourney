import { useState } from "react";
import Card from "../team/Card";
import teams from "../../helper/team.json";
const TabSwitch = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state

  const tablist = [
    "All",
    "Health Psychology",
    "Educational Psychology",
    "Neuropsychology",
    "Marriage and Family Therapy",
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
      <div className="w-full h-full mt-10  mx-auto">
        <div className="bg-navy-light opacity-3 p-2 rounded-t-lg">
          <div className="flex justify-center space-x-4">
            {tablist.map((list) => (
              <button
              key={list}
                className={"px-4 py-2 text-white font-semibold border-b-4  hover:bg-navy focus:outline-none tab-button"}
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
            className="px-4 py-2 border rounded-lg"
          />
        </div>
          </div>
        
        </div>

       

        <div className="flex flex-wrap">
          <Card teams={filteredTeams}  />
        </div>
      </div>
    </>
  );
};

export default TabSwitch;
