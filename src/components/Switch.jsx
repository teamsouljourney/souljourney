import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Switch = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || false
  );

  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", true);
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("darkMode");
  }

  return (
    <div className="p-0">
      <button
        type="button"
        title="Toggle dark/light mode"
        onClick={() => setDarkMode(!darkMode)}
        className="relative p-[8px] text-navy bg-offWhite rounded-full group hover:bg-navy hover:text-offWhite focus:z-10 dark:focus:ring-navy-dark dark:bg-navy focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy dark:text-gray-400 dark:hover:text-offWhite dark:hover:bg-navy-light"
      >
        {darkMode ? (
          <SunIcon className="w-3 h-3 fill-yellow-400 sm:w-4 sm:h-4" />
        ) : (
          <MoonIcon className="w-3 h-3 sm:w-4 sm:h-4 fill-navy group-hover:fill-offWhite" />
        )}
      </button>
    </div>
  );
};

export default Switch;
