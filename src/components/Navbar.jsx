import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import Switch from "./Switch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import SoulJourneyLogo from "../components/SoulJourneyLogo";
import ViewNotifications from "./ViewNotifications";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [showBackground, setShowBackground] = useState(false);
  let { currentUser } = useSelector((state) => state.auth);
  const { logout } = useAuthCall();
  const { t } = useTranslation();

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("services"), href: "/services" },
    { name: t("pricing"), href: "/pricing" },
    { name: t("team"), href: "/therapists" },
    { name: t("blogs"), href: "/blogs" },
    { name: t("about"), href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const TOP_OFFSET = 60;
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (
    window.location.pathname.startsWith("/profile") ||
    window.location.pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 z-20 w-screen bg-transparent text-navy"
    >
      <div
        className={`max-w-full sm:px-6 lg:px-8 transition duration-500 ${
          showBackground
            ? "bg-navy-dark/40 backdrop-blur dark:bg-customBlack/50"
            : ""
        } 
        ${
          (window.location.pathname === "/pricing" ||
            window.location.pathname.startsWith("/blogs") ||
            window.location.pathname === "/contact" ||
            window.location.pathname === "/forgotPassword" ||
            window.location.pathname.startsWith("/therapists/") ||
            window.location.pathname.startsWith("/reset-password") ||
            window.location.pathname.startsWith("/termsandconditions") ||
            window.location.pathname.startsWith("/privacypolicy")) &&
          "bg-navy/40 backdrop-blur"
        }`}
      >
        <div className="relative flex items-center justify-around h-20">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="relative inline-flex items-center justify-center p-2 rounded-md group focus:outline-none focus:ring-2 focus:ring-inset ">
              <span className="absolute -inset-0.5" />
              <span className="border sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden dark:text-offWhite"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block dark:text-offWhite"
              />
            </DisclosureButton>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <SoulJourneyLogo />
            <div className="self-center hidden sm:ml-2 sm:block">
              <div className="flex items-center space-x-6 sm:space-x-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "border-b-2 border-seaGreen-light text-offWhite-light  "
                          : "text-offWhite-light hover:border-b-2 hover:border-seaGreen-light",
                        " whitespace-nowrap px-4 py-2 text-sm font-medium",
                        "lg:px-4 lg:py-2 lg:text-sm",
                        "md:px-3 md:py-1.5 md:text-sm",
                        "sm:px-2 sm:py-1 sm:text-xs"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute right-0 flex items-center justify-center gap-1 pr-2 sm:static sm:inset-auto sm:ml-0 sm:pr-0">
            <LanguageSelector />
            <Switch />
            {currentUser && <ViewNotifications />}

            {!currentUser && (
              <button
                type="button"
                className="relative px-2 py-2 text-sm rounded-md whitespace-nowrap sm:px-3 sm:py-1 xs:px-2 xs:text-xs text-offWhite-light bg-mauve-dark hover:text-offWhite-light hover:bg-mauve-light hover:shadow-3xl hover:shadow-navy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy"
              >
                <NavLink to="/login">{t("login")}</NavLink>
              </button>
            )}

            {/* Profile dropdown */}
            {currentUser && (
              <Menu as="div" className="relative mr-4">
                {/*  Avatar in MenuButton  */}
                <MenuButton className="relative flex text-sm rounded-full shadow-lg shadow-mauve-light bg-offWhite-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy hover:shadow-3xl hover:shadow-navy-dark">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {currentUser?.image ? (
                    <img
                      alt=""
                      src={currentUser.image}
                      className="rounded-full size-6 sm:size-8"
                    />
                  ) : (
                    <div className="flex items-center justify-center rounded-full size-8 bg-navy-dark">
                      <span className="text-sm font-medium text-offWhite-light">
                        {currentUser?.firstName.charAt(0).toUpperCase() +
                          currentUser?.lastName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </MenuButton>
                <MenuItems
                  transition
                  className="flex flex-col text-xl w-[11rem]  text-slate-600 bg-navy/50 backdrop-blur p-4 mt-6 rounded-lg absolute right-0"
                >
                  <MenuItem>
                    <span
                      to="#"
                      className="block px-4 py-1 text-sm fw-bold text-offWhite-dark dark:text-offWhite-light data-[focus]:text-offWhite-light dark:data-[focus]:text-offWhite-dark data-[focus]:outline-none"
                    >
                      <h5 className="">
                        {currentUser?.firstName.toUpperCase()}{" "}
                        {currentUser?.lastName.toUpperCase()}
                      </h5>
                    </span>
                  </MenuItem>
                  <hr />
                  <MenuItem>
                    <NavLink
                      to={currentUser?.isAdmin ? "/admin" : "/profile"}
                      className="block px-4 py-1 text-sm fw-bold text-offWhite-dark dark:text-offWhite-light data-[focus]:text-offWhite-light dark:data-[focus]:text-offWhite-dark data-[focus]:outline-none"
                    >
                      {t("myProfile")}
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to="/profile/account"
                      className="block px-4 py-1 text-sm fw-bold text-offWhite-dark dark:text-offWhite-light data-[focus]:text-offWhite-light dark:data-[focus]:text-offWhite-dark data-[focus]:outline-none"
                    >
                      {t("accountSettings")}
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to=""
                      className="block px-4 py-1 text-sm fw-bold text-offWhite-dark dark:text-offWhite-light data-[focus]:text-offWhite-light dark:data-[focus]:text-offWhite-dark data-[focus]:outline-none"
                      onClick={() => logout()}
                    >
                      {t("logout")}
                    </NavLink>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>
      {/* Hamburger Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="z-40 px-2 pt-2 pb-3 space-y-1 bg-navy/40 backdrop-blur text-navy-dark">
          {navigation.map((item) => (
            <NavLink to={item.href} key={item.name}>
              <DisclosureButton
                aria-current={item.current ? "page" : undefined}
                className="block px-3 py-2 text-base text-offWhite font-medium cursor-pointer hover:border-b-[1px] hover:border-seaGreen-light"
              >
                {item.name}
              </DisclosureButton>
            </NavLink>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
