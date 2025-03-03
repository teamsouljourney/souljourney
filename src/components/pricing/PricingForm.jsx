import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import Button from "../button/Button";
import { useTranslation } from "react-i18next";

const PricingForm = () => {
     const { t } = useTranslation();
    
    const handleCheckout = async (priceId) => {
        
        try {
            const stripe = await loadStripe("pk_test_51Qs8arP6ONB2IDlqUsU4P0T0kqqXYixzhEvl0xCxlV0cEfKb5BvVMnrx35E1TD3NL35xCljN18TFTDZKcwumyKDv00BTQAKL99");
           
            const response = await axios.post('http://localhost:8000/checkout', {
              priceId,
            }, {
              headers: {
                'Content-Type': 'application/json',
              }
            });
        
            // İstek başarılıysa, dönen veriyi kullanabilirsiniz.
            console.log(response);
            console.log(response.data);
            const { sessionId } = response.data;
            if(sessionId){
               await stripe?.redirectToCheckout({ sessionId }); 
            }
        
          } catch (error) {
            console.error("Error during checkout:", error);
          }
        };

    const [selectedPlan, setSelectedPlan] = useState("Monthly");
    const navigate = useNavigate(); 

    const {currentUser}= useSelector((state) => state.auth);


    // const isUserLoggedIn = localStorage.getItem('userToken');

    const handleRedirect = () => {
        if (currentUser) {
          navigate('/private'); // account? Kullanıcının profil sayfasına yönlendir
        } else {
          navigate('/login'); // Kullanıcı login değilse login sayfasına yönlendir
        }
      };

  return (
    <div>
    <section className="">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md text-center mb-4 lg:mb-6">
          <h2 className="mb-4 text-center text-3xl md:text-4xl tracking-tight dark:text-white">{ t("plansPricing")}</h2>
          <p className="mb-5 font-light sm:text-xl">{ t("plansPricingText")}</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 mb-4">
        <Button type="type19"
        onClick={() => setSelectedPlan("Monthly")}
        >
                { t("monthly")}
        </Button>
        <Button type="type19"
        onClick={() => setSelectedPlan("Yearly")}>
                { t("yearly")} 
        </Button>
      </div>


      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* <!-- Pricing Card --> */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-background-darker dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">{ t("free")}</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{ t("freeText")} </p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">€0</span>
                  <span className="text-gray-500 dark:text-gray-400"></span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" className="mb-24 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>{ t("individualConfig")}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>{ t("setupHiddenFees")}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>{ t("appointmentCount")}<span className="font-semibold">5x/{ t("month")}</span></span>
                  </li>
                  
              </ul> 
              
              <button onClick={handleRedirect} className="bg-blue-100 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 hover:bg-offWhite-dark white dark:hover:bg-white dark:hover:text-black dark:text-white">{ t("getStarted")}</button>
          </div>
          {/* <!-- Pricing Card --> */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-navy bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">{ t("premium")}</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{ t("premiumText")}</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">{selectedPlan === "Monthly" ? "€90" : "€900"}</span>
                  <span className="text-gray-500 dark:text-gray-400">{selectedPlan === "Monthly" ?`/€{t("month")}` : `/€{t("year")}`}</span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" className="mb-24 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>{ t("individualConfig")}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>{ t("setupHiddenFees")}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>{ t("appointmentCount")}<span className="font-semibold">50x/{ t("month")}</span></span>
                  </li>
                  
                  
              </ul>
              <button onClick={()=> handleCheckout(selectedPlan === "Monthly" ? "price_1QsAPGP6ONB2IDlqFgbc5PMm" : "price_1QsAQkP6ONB2IDlqiMwUcvQS")} className="bg-blue-100 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 hover:bg-offWhite-dark dark:hover:text-black dark:hover:bg-white">{t("getStarted")}</button>
          </div>
          {/* <!-- Pricing Card --> */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-navy rounded-lg border border-gray-100 shadow-blue-700 dark:border-gray-600 xl:p-8 dark:bg-gray-700 dark:text-white">
              <h3 className="text-white mb-4 text-2xl font-semibold">{t("ultraPremium")}</h3>
              <p className="font-light sm:text-lg text-white">{t("ultraPremiumText")}</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="text-white mr-2 text-5xl font-extrabold">{selectedPlan === "Monthly" ? "€150" : "€1500"}</span>
                  <span className="text-white dark:text-gray-400">{selectedPlan === "Monthly" ? `/€{t("month")}` : `/€{t("year")}`}</span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" className="mb-24 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>{t("individualConfig")}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>{t("setupHiddenFees")}</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>{t("appointmentCount")}<span className="font-semibold">{t("unlimited")}</span></span>
                  </li>

              </ul>
              <button onClick={()=>handleCheckout(selectedPlan === "Monthly" ? "price_1QsATcP6ONB2IDlq8IPG3Ubl" : "price_1QsAUOP6ONB2IDlqrxmCfsS3")} className="text-white  bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:text-white dark:hover:text-black dark:focus:ring-primary-900 hover:bg-seaGreen dark:hover:bg-[#c3bac2]">{t("getStarted")}</button>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default PricingForm