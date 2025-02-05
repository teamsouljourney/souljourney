import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import souljorurney_Logo from "../assets/souljourney_Logo.png";
import { NavLink } from "react-router-dom";
import Switch from "./Switch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Team", href: "/team" },
  { name: "Blogs", href: "/blogs" },
  { name: "About", href: "/about" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [showBackground, setShowBackground] = useState(false);
  let { currentUser } = useSelector((state) => state.auth);
  const { logout } = useAuthCall();
  console.log(currentUser);

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

  // referrerPolicy = "no-referrer";
  return (
    <Disclosure
      as="nav"
      className="bg-transparent w-full fixed top-0 z-20 text-navy"
    >
      <div
        className={`max-w-full sm:px-6 lg:px-8 transition duration-500 ${
          showBackground
            ? "bg-navy-dark/40 backdrop-blur dark:bg-customBlack/50"
            : ""
        } 
        ${
          (window.location.pathname === "/pricing" ||
            window.location.pathname === "/blogs") &&
          "bg-navy/40 backdrop-blur"
        }`}
      >
        <div className="relative flex h-20 items-center justify-evenly">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset  ">
              <span className="absolute -inset-0.5" />
              <span className="sr-only border">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center">
              <NavLink to="/">
                <img
                  alt="Soul Journey"
                  src={souljorurney_Logo}
                  className="h-20 min-h-[3rem] min-w-[3rem] w-auto object-contain sm:h-16 md:h-20"
                />
              </NavLink>
            </div>
            <div className="hidden self-center  sm:ml-2 sm:block">
              <div className="flex items-center space-x-6 sm:space-x-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "border-b-2 border-seaGreen-light text-offWhite-light"
                          : "text-offWhite-light hover:border-b-2 hover:border-seaGreen-light hover:text-offWhite-light",
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
          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2 sm:static sm:inset-auto sm:ml-0 sm:pr-0">
            <Switch />
            {currentUser && (
              <button
                type="button"
                className="relative rounded-full  bg-navy-dark p-1 text-offWhite-light  hover:text-offWhite-light hover:bg-mauve-light hover:shadow-3xl hover:shadow-navy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            )}
            <div className="w-[60px] h-auto">
              <div className="border-none outline-none">
                <select className="w-full bg-transparent text-offWhite-dark text-sm pl-3 pr-8 py-2 transition duration-300 ease outline-none  hover:text-offWhite-light  appearance-none cursor-pointer">
                  <option className="bg-navy/50" value="english">
                    EN
                  </option>
                  <option className="bg-navy/50" value="turkish">
                    TR
                  </option>
                  <option className="bg-navy/50" value="german">
                    DE
                  </option>
                </select>
              </div>
            </div>

            {!currentUser && (
              <button
                type="button"
                className="relative rounded-md whitespace-nowrap px-2 py-2 text-sm sm:px-3 sm:py-1 xs:px-2 xs:text-xs text-offWhite-light bg-mauve-dark hover:text-offWhite-light hover:bg-mauve-light hover:shadow-3xl hover:shadow-navy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy"
              >
                <NavLink to="/login">Login</NavLink>
              </button>
            )}

            {/* Profile dropdown */}
            {currentUser && (
              <Menu as="div" className="relative ml-3">
                <div>
                  {/* MenuButton içindeki avatar kısmı */}
                  <MenuButton className="relative flex rounded-full shadow-lg shadow-mauve-light bg-offWhite-light text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy hover:shadow-3xl hover:shadow-navy-dark">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {currentUser?.image ? (
                      <img
                        alt=""
                        src={currentUser.image}
                        className="size-8 rounded-full"
                      />
                    ) : (
                      <div className="size-8 rounded-full bg-navy-dark flex items-center justify-center">
                        <span className="font-medium text-offWhite-light text-sm">
                          {currentUser?.firstName.charAt(0).toUpperCase() +
                            currentUser?.lastName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-seaGreen-light dark:bg-customBlack-dark py-1 shadow-lg ring-1 ring-navy transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <NavLink
                      to="/userprofil"
                      className="block px-4 py-1 text-sm fw-bold text-customBlack dark:text-offWhite data-[focus]:text-offWhite dark:data-[focus]:text-offWhite-dark data-[focus]:outline-none"
                    >
                      <h5 className="">{currentUser?.userName}</h5>
                    </NavLink>
                  </MenuItem>
                  <hr />
                  <MenuItem>
                    <NavLink
                      to="#"
                      className="block px-4 py-1 text-sm fw-bold text-customBlack dark:text-offWhite data-[focus]:text-offWhite dark:data-[focus]:text-offWhite-dark data-[focus]:outline-none"
                    >
                      My Profil
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to="auth/logout"
                      className="block px-4 py-1 text-sm fw-bold text-customBlack dark:text-offWhite data-[focus]:text-offWhite dark:data-[focus]:text-offWhite-dark data-[focus]:outline-none"
                      onClick={() => logout()}
                    >
                      Logout
                    </NavLink>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 z-40 bg-navy/40 backdrop-blur text-navy-dark">
          {navigation.map((item) => (
            <NavLink to={item.href} key={item.name}>
              <DisclosureButton
                aria-current={item.current ? "page" : undefined}
                className="block px-3 py-2 text-base font-medium cursor-pointer hover:border-b-[1px] hover:border-seaGreen-light"
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
