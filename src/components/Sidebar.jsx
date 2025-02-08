import { NavLink, Outlet } from "react-router-dom";
import Switch from "./Switch";
import SoulJourneyLogo from "./sidebar/SoulJourneyLogo";
import SidebarListItems from "./sidebar/SidebarListItems";

const Sidebar = () => {
  
  return (
    <>
      <div className=" w-dvw h-dvh grid grid-cols-7">
        {/* SideBar */}
        <div className="col-span-1 bg-white">
          <div className="p-2 h-full w-full flex flex-col bg-offWhite dark:bg-navy border-r border-r-gray-200">
            {/* Logo */}
            <NavLink to="#">
              <div className="flex flex-col justify-center lg:justify-start items-center gap-2 py-2 px-0 md:px-2 lg:px-4 cursor-pointer ">
                <SoulJourneyLogo/>
                <Switch />
              </div>
            </NavLink>
            <SidebarListItems/>
          </div>
        </div>
        {/* View Content */}
        <div className="col-span-6  p-4">
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
