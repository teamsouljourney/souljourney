import { NavLink, Outlet } from "react-router-dom";
import Switch from "./Switch";
import SoulJourneyLogo from "./SoulJourneyLogo";
import SidebarListItems from "./sidebar/SidebarListItems";
import useAuthCall from "../hooks/useAuthCall";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { logout } = useAuthCall();
  const { t } = useTranslation();

  return (
    <>
      <div className=" w-dvw h-screen overflow-hidden min-h-screen grid grid-cols-7 bg-offWhite-light dark:bg-gray-700">
        {/* SideBar */}
        <div className="col-span-1 bg-white h-screen">
          <div className="xs:pb-2 sm:p-2 h-full w-full flex flex-col bg-offWhite-dark dark:bg-gray-700 border-r border-r-gray-200">
            {/* Logo */}
            <NavLink to="#">
              <div className="flex flex-col justify-center lg:justify-start items-center gap-1 pb-2 px-0 xs:px-0 md:px-2 lg:px-4 cursor-pointer dark:bg-offWhite dark:xs:rounded-none dark:sm:rounded-md dark:shadow-sm dark:shadow-offWhite-light">
                <SoulJourneyLogo />
                <Switch />
                <div className="w-14 flex justify-center bg-navy/90 rounded-xl m-4 px-0 hover:bg-navy/70">
                  <LanguageSelector />
                </div>
              </div>
            </NavLink>
            {/* Sidebar Menu */}
            <div className="px-5 pt-4 hidden lg:block mb-1">
              <div className="flex flex-row items-center">
                <div className="text-sm font-bold tracking-wide text-seaGreen-dark dark:text-offWhite cursor-default">
                  {t("menu")}
                </div>
              </div>
            </div>
            <hr className="hidden lg:block" />
            <SidebarListItems />
            {/* Sidebar footer */}
            <div className="px-1 mt-auto" onClick={() => logout()}>
              <div className="group flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-1 lg:pr-6 font-semibold text-navy-dark dark:text-offWhite-dark hover:text-pink-light cursor-pointer  ">
                <span className="inline-flex justify-center items-center ml-1">
                  <span
                    style={{
                      maskImage: `url(/assets/sidebar/sign-out-2.svg)`,
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                      width: "20px",
                      height: "20px",
                    }}
                    className="inline-flex justify-center items-center mx-3.5 bg-pink-light group-hover:bg-red-400 dark:bg-pink-light"
                  ></span>
                </span>
                <span className="ml-2 text-sm text-navy-dark group-hover:text-red-400 dark:text-offWhite-dark tracking-wide truncate capitalize hidden lg:block">
                  {t("logout")}
                </span>
              </div>
            </div>
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
