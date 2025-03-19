import { useTranslation } from "react-i18next";

const PricingHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="py-24 text-center bg-offWhite-dark dark:bg-background-darker ">
      <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
        {t("paymentDetails")}
      </h1>
      <p className="max-w-3xl px-4 mx-auto mt-4 text-lg lg:text-xl">
        {t("paymentDetailsText")}
      </p>
    </div>
  );
};

export default PricingHeader;
