import React from 'react'
import { useTranslation } from "react-i18next";


const PricingHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-20 px-4 pb-4 pt-3 text-center md:px-8  ">
        <h1  className="mt-8 mb-4 text-4xl font-bold md:text-5xl font-urbanist ">{ t("paymentDetails")}</h1>
        <p className = "max-w-6xl mx-auto text-base leading-relaxed md:text-2xl">{ t("paymentDetailsText")}</p>
    </div>
  )
}

export default PricingHeader