import { NavLink, Outlet } from "react-router-dom";
import Switch from "./Switch";
import SoulJourneyLogo from "./sidebar/SoulJourneyLogo";
import SidebarListItems from "./sidebar/SidebarListItems";
import useAuthCall from "../hooks/useAuthCall";

const Sidebar = () => {

  const {logout} = useAuthCall()

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
                <Switch/>
              </div>
            </NavLink>
            {/* Sidebar Menu */}
            <div className="px-5 pt-4 hidden lg:block">
              <div className="flex flex-row items-center">
                <div className="text-sm font-bold tracking-wide text-seaGreen-dark dark:text-offWhite">
                  Menu
                </div>
              </div>
            </div>
            <SidebarListItems/>
            {/* Sidebar footer */}
            <div className="px-1" onClick={()=>logout()}>
              <div className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-navy-dark dark:text-offWhite-dark hover:text-primary-400 cursor-pointer  hover:text-red-600">
                <span className="inline-flex justify-center items-center ml-1">
                  <span
                    style={{
                      maskImage: `url(/assets/sidebar/sign-out-2.svg)`,
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                      width: "20px",
                      height: "20px",
                    }}
                    className="inline-flex justify-center items-center mx-3.5 bg-pink-dark dark:bg-pink-light"
                  ></span>
                </span>
                <span className="ml-2 text-sm text-navy-dark dark:text-offWhite-dark tracking-wide truncate capitalize hidden lg:block">
                  Logout
                </span>
              </div>
            </div>
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
