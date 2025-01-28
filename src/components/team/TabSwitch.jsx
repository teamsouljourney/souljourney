import { useState } from "react";
import Card from "../team/Card";
import teams from "../../helper/team.json"; 
const TabSwitch = () => {
  const [activeTab, setActiveTab] = useState("All");

  const handleClick = (tabId) => {
    setActiveTab(tabId);
  };

   // Tab'lara ait filtreleme işlemi
   const filterTeams = (tabId) => {
    if (tabId === "tab1") {
      return teams.filter(team => team.category === "Health Psychology");
    } else if (tabId === "tab2") {
      return teams.filter(team => team.category === "Educational Psychology");
    } else if (tabId === "tab3") {
      return teams.filter(team => team.category === "Neuropsychology");
    } else if (tabId === "tab4") {
      return teams.filter(team => team.category === "Marriage and Family Therapy");
    }
    return teams;
  };
  return (
    <>
      <div className="w-full h-full mt-10  mx-auto">
        <div className="bg-navy-light opacity-3 p-2 rounded-t-lg">
          <div className="flex justify-center space-x-4">
          <button
              className={`px-4 py-2 text-white font-semibold border-b-4 ${
                activeTab === "tab1" ? "border-navy" : "border-transparent"
              } hover:bg-navy focus:outline-none tab-button`}
              onClick={() => handleClick("All")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 text-white font-semibold border-b-4 ${
                activeTab === "tab1" ? "border-navy" : "border-transparent"
              } hover:bg-navy focus:outline-none tab-button`}
              onClick={() => handleClick("tab1")}
            >
              Health Pyschology
            </button>

            <button
              className={`px-4 py-2 text-white font-semibold border-b-4 ${
                activeTab === "tab2" ? "border-navy" : "border-transparent"
              } hover:bg-navy focus:outline-none tab-button`}
              onClick={() => handleClick("tab2")}
            >
              Educational Psychology
            </button>
            <button
              className={`px-4 py-2 text-white font-semibold border-b-4 ${
                activeTab === "tab3" ? "border-navy" : "border-transparent"
              } hover:bg-navy focus:outline-none tab-button`}
              onClick={() => handleClick("tab3")}
            >
              Neuropyschology
            </button>
            <button
              className={`px-4 py-2 text-white font-semibold border-b-4 ${
                activeTab === "tab4" ? "border-navy" : "border-transparent"
              } hover:bg-navy focus:outline-none tab-button`}
              onClick={() => handleClick("tab4")}
            >
              Marriage and Family Therapy
            </button>
          </div>
        </div>

        <div className="flex flex-wrap">
        <Card teamsFilter={filterTeams(activeTab)} teams={teams} />
        </div>

    
        
        {/* <div
          id="tab3"
          className="p-4 tab-content bg-white shadow-md rounded-lg hidden"
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">
            Tab 3 Content
          </h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium. Sed ut perspiciatis unde omnis
            iste natus error sit voluptatem accusantium doloremque laudantium.
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>
        </div> */}
      </div>
    </>
  );
};

export default TabSwitch;
