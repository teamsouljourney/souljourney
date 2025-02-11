import { useTranslation } from "react-i18next";

const ContactHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="px-4 mb-8 text-center md:px-8 ">
      <h1 className="mb-4 text-3xl font-bold md:text-5xl text-navy-dark ">
        {t("getInTouch")}
      </h1>
      <p className="max-w-2xl mx-auto text-base leading-relaxed md:text-lg text-navy-light">
        {t("contactText")}
      </p>
    </div>
  );
};

export default ContactHeader;
