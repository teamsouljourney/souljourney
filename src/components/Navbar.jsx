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
import { useState } from "react";


const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Services", href: "/services", current: false },
  { name: "Pricing", href: "/pricing", current: false },
  { name: "Team", href: "/team", current: false },
  { name: "Contact", href: "/contact", current: false },
  { name: "About", href: "/about", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [showAvatar, setShowAvatar] = useState(false);

  // referrerPolicy = "no-referrer";
  return (
    <Disclosure as="nav" className="bg-transparent w-full my-4 top-0 z-20">
      <div className=" max-w-full sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-evenly">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-mauve-dark hover:bg-mauve-dark hover:text-offWhite-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy ">
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
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-mauve-dark text-offWhite-light  hover:bg-mauve-light hover:text-offWhite-light"
                        : "text-offWhite-light hover:bg-mauve-light hover:text-offWhite-light",
                      "rounded-md whitespace-nowrap px-4 py-2 text-sm font-medium",
                      "lg:px-4 lg:py-2 lg:text-sm",
                      "md:px-3 md:py-1.5 md:text-sm",
                      "sm:px-2 sm:py-1 sm:text-xs"
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2 sm:static sm:inset-auto sm:ml-0 sm:pr-0">
            <Switch />
            {showAvatar && (
              <button
                type="button"
                className="relative rounded-full  bg-navy-dark p-1 shadow-lg shadow-mauve-light text-offWhite-light  hover:text-offWhite-light hover:bg-mauve-light hover:shadow-3xl hover:shadow-navy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            )}

            {!showAvatar && (
              <button
                type="button"
                className="relative rounded-md whitespace-nowrap px-2 py-2 text-sm sm:px-3 sm:py-1 xs:px-2 xs:text-xs shadow-lg shadow-mauve-light text-offWhite-light bg-navy-dark hover:text-offWhite-light hover:bg-mauve-light hover:shadow-3xl hover:shadow-navy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy"
              >
                <NavLink>Sign Up</NavLink>
              </button>
            )}
            {!showAvatar && (
              <button
                type="button"
                className="relative rounded-md whitespace-nowrap px-2 py-2 text-sm sm:px-3 sm:py-1 xs:px-2 xs:text-xs shadow-lg shadow-mauve-light text-offWhite-light bg-mauve-dark hover:text-offWhite-light hover:bg-mauve-light hover:shadow-3xl hover:shadow-navy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy"
              >
                <NavLink>Login</NavLink>
              </button>
            )}

            {/* Profile dropdown */}
            {showAvatar && (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full shadow-lg shadow-mauve-light bg-offWhite-light text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy hover:shadow-3xl hover:shadow-navy-dark">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-transparent py-1 shadow-lg ring-1 ring-navy transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <NavLink
                      to="/userprofil"
                      className="block px-4 py-1 text-sm fw-bold text-customBlack data-[focus]:bg-offWhite data-[focus]:outline-none"
                    >
                      <h5 className="capitalize">
                        {"currentUser?.displayName"}{" "}
                      </h5>
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to="#"
                      className="block px-4 py-1 text-sm fw-bold text-customBlack data-[focus]:bg-offWhite data-[focus]:outline-none"
                    >
                      Settings
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to="/signout"
                      className="block px-4 py-1 text-sm fw-bold text-customBlack data-[focus]:bg-offWhite data-[focus]:outline-none"
                    >
                      Sign out
                    </NavLink>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="NavLink"
              to={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-mauve-dark text-offWhite-light"
                  : "text-offWhite-light hover:bg-mauve-light hover:text-offWhite-light",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

