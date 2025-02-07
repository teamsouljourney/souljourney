import { useTranslation } from "react-i18next";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative">
      <button className="p-2 bg-navy-dark text-white rounded-full hover:bg-mauve-light focus:outline-none">
        <GlobeAltIcon className="size-6"/>
      </button>
      <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
        <button
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => changeLanguage("en")}
        >
          English
        </button>
        <button
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => changeLanguage("tr")}
        >
          Türkçe
        </button>
        <button
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => changeLanguage("de")}
        >
          Deutsch
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;