import { NavLink } from "react-router-dom";

const icon = (name) => `/assets/sidebar/${name}.svg`;
const NavLinkto = (to) => `/profile/${to}`;

const menu = [
  {
    to: NavLinkto(""),
    icon: icon("dashboard"),
    name: "Dashboard",
  },
  {
    to: NavLinkto(""),
    icon: icon("appointment"),
    name: "Appointment",
  },
  {
    to: NavLinkto("write-blog"),
    icon: icon("write-blog"),
    name: "Write Blog",
  },
  {
    to: NavLinkto("chat"),
    icon: icon("chat"),
    name: "Chat",
  },
  {
    to: NavLinkto("video-call"),
    icon: icon("videoCall"),
    name: "Video Call",
  },
];

const SidebarListItems = () => {
  return (
    <>
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden flex-grow pt-2 justify-between">
        <div className="flex flex-col  space-y-1 mx-1 lg:mt-1 ">
          <div className="px-5 pt-4 hidden lg:block">
            <div className="flex flex-row items-center">
              <div className="text-sm font-bold tracking-wide text-seaGreen-dark">
                Menu
              </div>
            </div>
          </div>

          {menu.map((item, index) => (
            <NavLink
              className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-navy-dark hover:text-primary-400 cursor-pointer "
              to={item.to}
              key={index}
            >
              <span className="inline-flex justify-center items-center ml-1">
                <span
                  style={{
                    maskImage: `url(${item.icon})`,
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    width: "20px",
                    height: "20px",
                  }}
                  className="inline-flex justify-center items-center mx-3.5 bg-navy-dark"
                ></span>
              </span>
              <span className="ml-0 lg:ml-2 text-sm text-navy-dark tracking-wide truncate capitalize hidden lg:block">
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>
        <div className="flex flex-col  space-y-1 mx-1 lg:mt-1 ">
          <NavLink
            className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-navy-dark hover:text-primary-400 cursor-pointer "
            to="/profile/account"
          >
            <span className="inline-flex justify-center items-center ml-1">
              <span
                style={{
                  maskImage: `url(/assets/sidebar/settings.svg)`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  width: "20px",
                  height: "20px",
                }}
                className="inline-flex justify-center items-center mx-3.5 bg-navy-dark"
              ></span>
            </span>
            <span className="ml-0 lg:ml-2 text-sm text-navy-dark tracking-wide truncate capitalize hidden lg:block">
              My Account
            </span>
          </NavLink>
        </div>
      </div>
      {/* Sidebar footer */}
      {/* <div className="px-1">
        <div className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-navy-dark hover:text-primary-400 cursor-pointer  hover:text-red-600">
          <span className="inline-flex justify-center items-center ml-1">
            <span
              style={{
                maskImage: `url(/assets/sidebar/sign-out-2.svg)`,
                maskRepeat: "no-repeat",
                maskSize: "contain",
                width: "20px",
                height: "20px",
              }}
              className="inline-flex justify-center items-center mx-3.5 bg-red-700"
            ></span>
          </span>
          <span className="ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
            Logout
          </span>
        </div>
      </div> */}
    </>
  );
};

export default SidebarListItems;
