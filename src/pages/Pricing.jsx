import PricingHeader from "../components/pricing/PricingHeader";
import PricingForm from "../components/pricing/PricingForm";

const getPricingData = (t) => {
  return [
    {
      title: t("free"),
      description: t("freeText"),
      price: {
        monthly: "€0",
        yearly: "€0",
      },
      features: [
        t("individualConfig"),
        t("setupHiddenFees"),
        `${t("appointmentCount")} 5x/${t("month")}`,
      ],
      buttonText: t("getStarted"),
      priceId: {
        monthly: null,
        yearly: null,
      },
      isHighlighted: false,
      bgClass: "bg-white dark:bg-background-darker dark:text-white",
      buttonClass:
        "bg-blue-100 hover:bg-offWhite-dark dark:hover:bg-white dark:hover:text-black dark:text-background-darker",
      action: "redirect",
    },
    {
      title: t("premium"),
      description: t("premiumText"),
      price: {
        monthly: "€90",
        yearly: "€900",
      },
      features: [
        t("individualConfig"),
        t("setupHiddenFees"),
        `${t("appointmentCount")} 50x/${t("month")}`,
      ],
      buttonText: t("getStarted"),
      priceId: {
        monthly: "price_1QsAPGP6ONB2IDlqFgbc5PMm",
        yearly: "price_1QsAQkP6ONB2IDlqiMwUcvQS",
      },
      isHighlighted: false,
      bgClass: "bg-white dark:bg-background-darker dark:text-white",
      buttonClass:
        "bg-blue-100 hover:bg-offWhite-dark dark:hover:bg-white dark:hover:text-black dark:text-background-darker",
      action: "checkout",
    },
    {
      title: t("ultraPremium"),
      description: t("ultraPremiumText"),
      price: {
        monthly: "€150",
        yearly: "€1500",
      },
      features: [
        t("individualConfig"),
        t("setupHiddenFees"),
        `${t("appointmentCount")} ${t("unlimited")}`,
      ],
      buttonClass:
        "text-white bg-blue-500 dark:bg-seaGreen-dark hover:bg-seaGreen dark:hover:bg-[#c3bac2] dark:text-white dark:hover:text-black",
      buttonText: t("getStarted"),
      priceId: {
        monthly: "price_1QsATcP6ONB2IDlq8IPG3Ubl",
        yearly: "price_1QsAUOP6ONB2IDlqrxmCfsS3",
      },
      isHighlighted: true,
      bgClass: "bg-navy text-white dark:bg-background-dark dark:text-white",
      action: "checkout",
    },
  ];
};

const Pricing = () => {
  return (
    <div className="min-h-screen pt-20 bg-offWhite dark:bg-background-dark text-navy dark:text-offWhite-dark">
          <PricingHeader />
        <div className=" ">
          <PricingForm getPricingData={getPricingData} />
        </div>
    </div>
  );
};

export default Pricing;