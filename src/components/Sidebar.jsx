import { Outlet } from "react-router-dom";
import Switch from "./Switch";
import SoulJourneyLogo from "./SoulJourneyLogo";
import SidebarListItems from "./sidebar/SidebarListItems";
import LanguageSelector from "./LanguageSelector";

const Sidebar = () => {
  return (
    <>
      <div className=" w-dvw h-screen overflow-hidden min-h-screen grid grid-cols-7 bg-offWhite-light dark:bg-gray-700">
        {/* SideBar */}
        <div className="col-span-1 bg-white h-screen">
          <div className="xs:pb-2 sm:p-2 h-full w-full flex flex-col bg-offWhite-dark dark:bg-gray-700 border-r border-r-gray-200">
            {/* Logo */}
            <div className="flex flex-col justify-center lg:justify-start items-center gap-1 pb-2 px-0 xs:px-0 md:px-2 lg:px-4 dark:bg-offWhite dark:xs:rounded-none dark:sm:rounded-md dark:shadow-sm dark:shadow-offWhite-light">
              <SoulJourneyLogo />
              <Switch />
              <div className="w-14 flex justify-center bg-navy/90 rounded-xl m-4 px-0 hover:bg-navy/70">
                <LanguageSelector />
              </div>
            </div>
            <SidebarListItems />
          </div>
        </div>
        {/* View Content */}
        <div className="col-span-6 h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
