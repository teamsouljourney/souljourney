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
        className="relative p-[8px] text-navy-dark bg-offWhite rounded-full group hover:bg-navy-dark hover:text-offWhite focus:z-10 dark:focus:ring-navy-dark dark:bg-navy focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy dark:text-gray-400 dark:hover:text-offWhite dark:hover:bg-navy-light shadow-lg shadow-mauve-light hover:shadow-6xl hover:shadow-navy-dark"
      >
        {darkMode ? (
          <SunIcon className="fill-yellow-400 h-4 w-4" />
        ) : (
          <MoonIcon className="h-4 w-4 fill-navy group-hover:fill-offWhite" />
        )}
      </button>
    </div>
  );
};

export default Switch;
