import { useTranslation } from "react-i18next"

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="w-[60px] h-auto">
              <div className="border-none outline-none">
                <select className="w-full bg-transparent text-offWhite-dark text-sm pl-3  py-2 transition duration-300 ease outline-none  hover:text-offWhite-light   cursor-pointer">
                  <option className="bg-navy/50" value="english" onClick={() => changeLanguage("en")}>
                    EN
                  </option>
                  <option className="bg-navy/50" value="turkish" onClick={() => changeLanguage("tr")}>
                    TR
                  </option>
                  <option className="bg-navy/50" value="german" onClick={() => changeLanguage("de")}>
                    DE
                  </option>
                </select>
              </div>
            </div>
  );
};

export default LanguageSelector;