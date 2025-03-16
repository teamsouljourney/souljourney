import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // console.log("Selected language:", i18n.language);
  };

  return (
    <div className="w-[60px] h-auto">
      <select
        value={localStorage.getItem("language")}
        className="w-full py-2 pl-3 text-sm bg-transparent cursor-pointer text-offWhite-dark"
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
