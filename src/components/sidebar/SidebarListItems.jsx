import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const icon = (name) => `/assets/sidebar/${name}.svg`;
const NavLinkto = (to) => `/profile/${to}`;

const SidebarListItems = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.auth);
  let menu = [];
  currentUser.isTherapist && (
    menu = [
      {
        to: NavLinkto(""),
        icon: icon("dashboard"),
        name: t("dashboard"),
      },
      {
        to: NavLinkto("appointment"),
        icon: icon("appointment"),
        name: t("appointment"),
      },
      {
        to: NavLinkto("write-blog"),
        icon: icon("write-blog"),
        name: t("writeBlog"),
      },
      {
        to: NavLinkto("chat"),
        icon: icon("chat"),
        name: t("chat"),
      },
      {
        to: NavLinkto("video-call"),
        icon: icon("videoCall"),
        name: t("videoCall"),
      },
    ]
  );
  currentUser.isAdmin && (
    menu = [
      {
        to: NavLinkto(""),
        icon: icon("listUser1"),
        name: t("userManagement"),
      },
      {
        to: NavLinkto("therapist-management"),
        icon: icon("therapist1"),
        name: t("therapistManagement"),
      },
      {
        to: NavLinkto("category-management"),
        icon: icon("category1"),
        name: t("categoryManagement"),
      },
      {
        to: NavLinkto("blog-management"),
        icon: icon("blog1"),
        name: t("blogManagement"),
      },      
      {
        to: NavLinkto("feedback-management"),
        icon: icon("feedback2"),
        name: t("feedbackManagement"),
      },
      {
        to: NavLinkto("appointment-management"),
        icon: icon("appointment2"),
        name: t("appontmentManagement"),
      },
    ]
  );
  menu = [{
    to: NavLinkto(""),
    icon: icon("dashboard"),
    name: t("dashboard"),
  },
  {
    to: NavLinkto("appointment"),
    icon: icon("appointment"),
    name: t("appointment"),
  },
  {
    to: NavLinkto("chat"),
    icon: icon("chat"),
    name: t("chat"),
  },
  {
    to: NavLinkto("video-call"),
    icon: icon("videoCall"),
    name: t("videoCall"),
  },]

  return (
    <>
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden flex-grow pt-2 justify-between">
        <div className="flex flex-col  space-y-1 mx-1 lg:mt-1 ">
          {/* <div className="px-5 pt-4 hidden lg:block">
            <div className="flex flex-row items-center">
              <div className="text-sm font-bold tracking-wide text-seaGreen-dark">
                {t("menu")}
              </div>
            </div>
          </div> */}

          {menu.map((item, index) => (
            <NavLink
              className={({ isActive }) =>
                `group flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-1.5 lg:pr-6 font-semibold text-navy-dark hover:text-seaGreen-dark cursor-pointer ${
                  isActive
                    ? "bg-seaGreen-dark/20 text-seaGreen-dark dark:bg-offWhite-dark/20 dark:text-offWhite-dark"
                    : ""
                }`
              }
              to={item.to}
              key={index}
              draggable="false"
              end
            >
              {({ isActive }) => (
                <>
                  <span className="inline-flex justify-center items-center ml-1">
                    <span
                      style={{
                        maskImage: `url(${item.icon})`,
                        maskRepeat: "no-repeat",
                        maskSize: "contain",
                        width: "20px",
                        height: "20px",
                      }}
                      className={`inline-flex justify-center items-center mx-3.5 bg-navy-dark dark:bg-offWhite-dark group-hover:bg-seaGreen-dark dark:group-hover:bg-seaGreen-light ${
                        isActive ? "bg-seaGreen-dark" : ""
                      }`}
                    ></span>
                  </span>
                  <span
                    className={`ml-0 lg:ml-2 text-sm text-navy-dark group-hover:text-seaGreen-dark dark:group-hover:text-seaGreen-light dark:text-offWhite-dark tracking-wide truncate capitalize hidden lg:block ${
                      isActive ? "text-seaGreen-dark" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
        <div className="flex flex-col  space-y-1 mx-1 mb-2 lg:mt-1 ">
          <NavLink
            className={({ isActive }) =>
              `group flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-1.5 lg:pr-6 font-semibold text-navy-dark hover:text-seaGreen-dark cursor-pointer ${
                isActive
                  ? "bg-seaGreen-dark/20 text-seaGreen-dark dark:bg-offWhite-dark/20 dark:text-offWhite-dark"
                  : ""
              }`
            }
            to="/profile/account"
            draggable="false"
          >
            {({ isActive }) => (
              <>
                <span className="inline-flex justify-center items-center ml-1">
                  <span
                    style={{
                      maskImage: `url(/assets/sidebar/settings.svg)`,
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                      width: "20px",
                      height: "20px",
                    }}
                    className={`inline-flex justify-center items-center mx-3.5 bg-navy-dark dark:bg-offWhite-dark group-hover:bg-seaGreen-dark dark:group-hover:bg-seaGreen-light ${
                      isActive ? "bg-seaGreen-dark" : ""
                    }`}
                  ></span>
                </span>
                <span
                  className={`ml-0 lg:ml-2 text-sm text-navy-dark group-hover:text-seaGreen-dark dark:group-hover:text-seaGreen-light dark:text-offWhite-dark tracking-wide truncate capitalize hidden lg:block ${
                    isActive ? "text-seaGreen-dark" : ""
                  }`}
                >
                  {t("myAccount")}
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>
      <hr className="xs:hidden lg:block " />
      {/* Sidebar footer */}
      {/* <div className="px-1" onClick={()=>logout()}>
        <div className="group flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-1.5 lg:pr-6 font-semibold text-navy-dark dark:text-offWhite-dark hover:text-pink-light cursor-pointer  ">
          <span className="inline-flex justify-center items-center ml-1">
            <span
              style={{
                maskImage: `url(/assets/sidebar/sign-out-2.svg)`,
                maskRepeat: "no-repeat",
                maskSize: "contain",
                width: "20px",
                height: "20px",
              }}
              className="inline-flex justify-center items-center mx-3.5 bg-red-400 group-hover:bg-red-400 dark:bg-pink-light"
            ></span>
          </span>
          <span className="ml-2 text-sm text-navy-dark group-hover:text-red-400 dark:text-offWhite-dark tracking-wide truncate capitalize hidden lg:block">
            {t("logout")}
          </span>
        </div>
      </div> */}
    </>
  );
};

export default SidebarListItems;
