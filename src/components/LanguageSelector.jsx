import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log("Selected language:", i18n.language); // watch language change onsol
  };

  return (
    <div className="w-[60px] h-auto">
      <select value={localStorage.getItem("language")}
        className="w-full bg-transparent text-offWhite-dark text-sm pl-3 py-2 cursor-pointer"
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option className="bg-navy/50" value="en">
          EN
        </option>
        <option className="bg-navy/50" value="tr">
          TR
        </option>
        <option className="bg-navy/50" value="de">
          DE
        </option>
      </select>
    </div>
  );
};

export default LanguageSelector;