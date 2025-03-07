import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import { useSelector } from "react-redux"
import Button from "../button/Button"
import { useTranslation } from "react-i18next"
import { toastErrorNotify } from "../../helper/ToastNotify"

const PricingForm = ({ getPricingData }) => {
  const { t } = useTranslation()
  const [selectedPlan, setSelectedPlan] = useState("Monthly")
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.auth)

  // Get pricing data with translations
  const pricingData = getPricingData(t)

  const handleCheckout = async (priceId) => {
    try {
      const stripe = await loadStripe(
        "pk_test_51Qs8arP6ONB2IDlqUsU4P0T0kqqXYixzhEvl0xCxlV0cEfKb5BvVMnrx35E1TD3NL35xCljN18TFTDZKcwumyKDv00BTQAKL99",
      )

      const response = await axios.post(
        "http://localhost:8000/checkout",
        {
          priceId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      const { sessionId } = response.data
      if (sessionId) {
        await stripe?.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      toastErrorNotify(error.response.data.message, "Error during checkout:")
    }
  }

  const handleRedirect = () => {
    if (currentUser) {
      navigate("/private")
    } else {
      navigate("/login")
    }
  }

  const handlePlanAction = (plan) => {
    if (plan.action === "redirect") {
      handleRedirect()
    } else if (plan.action === "checkout") {
      const priceId = selectedPlan === "Monthly" ? plan.priceId.monthly : plan.priceId.yearly
      handleCheckout(priceId)
    }
  }

  return (
    <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      {/* Header Section */}
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-4 text-center text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold tracking-tight dark:text-white">
          {t("plansPricing")}
        </h2>
        <p className="text-sm sm:text-base md:text-base lg:text-lg font-light">{t("plansPricingText")}</p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8 sm:mb-10 gap-3 sm:gap-4">
        <Button type="type19" onClick={() => setSelectedPlan("Monthly")}>
          {t("monthly")}
        </Button>
        <Button type="type19" onClick={() => setSelectedPlan("Yearly")}>
          {t("yearly")}
        </Button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-1 lg:gap-x-2 xl:gap-x-8">
        {pricingData.map((plan, index) => (
          <div
            key={index}
            className={`flex flex-col rounded-lg border border-gray-100 shadow ${plan.bgClass} h-auto md:h-[600px]`}
          >
            {/* Card Header - Fixed Height */}
            <div className="p-4 sm:p-6 flex flex-col items-center h-[120px] md:h-[140px]">
              <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
                {plan.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base font-light text-center flex items-center justify-center flex-grow">
                {plan.description}
              </p>
            </div>

            {/* Price Section - Fixed Height */}
            <div className="flex justify-center items-baseline py-4 sm:py-5 md:py-6 border-t border-b border-gray-100 dark:border-background h-[80px] md:h-[100px]">
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                {selectedPlan === "Monthly" ? plan.price.monthly : plan.price.yearly}
              </span>
              <span className="ml-1 text-xs sm:text-sm md:text-base lg:text-lg">
                {selectedPlan === "Monthly" ? `/${t("month")}` : `/${t("year")}`}
              </span>
            </div>

            {/* Features List - Flexible Height with Min Height */}
            <div className="p-4 sm:p-6 flex-grow flex flex-col justify-start min-h-[40px] md:min-h-[50px] ">
              <ul className="space-y-2 sm:space-y-3 md:space-y-4 w-full">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="ml-2 sm:ml-3 text-xs sm:text-sm md:text-sm lg:text-base"
                      dangerouslySetInnerHTML={{
                        __html: feature.replace(/(\d+x\/|unlimited)/g, '<span class="font-semibold">$1</span>'),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Button Section - Fixed Height */}
            <div className="p-4 sm:p-6 mt-auto h-[70px] md:h-[100px] flex items-center">
              <button
                onClick={() => handlePlanAction(plan)}
                className={`w-full py-2 sm:py-3 px-3 sm:px-5 text-xs sm:text-sm md:text-sm lg:text-base font-medium rounded-lg transition-transform duration-150 ease-in-out active:scale-95 ${plan.buttonClass}`}
                aria-label={plan.buttonText}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PricingForm