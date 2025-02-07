import { useTranslation } from "react-i18next"

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="w-[60px] h-auto">
              <div className="border-none outline-none">
                <select className="w-full bg-transparent text-offWhite-dark text-sm pl-3  py-2 transition duration-300 ease outline-none  hover:text-offWhite-light   cursor-pointer" onChange={(e) => changeLanguage(e.target.value)}>
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
            </div>
  );
};

export default LanguageSelector;