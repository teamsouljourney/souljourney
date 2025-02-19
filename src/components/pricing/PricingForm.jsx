import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import Button from "../button/Button";

const PricingForm = () => {
    
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
    <section className="dark:bg-gray-900 bg-offWhite">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md text-center mb-4 lg:mb-6">
          <h2 className="mb-4 text-center text-3xl md:text-4xl tracking-tight  text-navy dark:text-white">Plans & Pricing</h2>
          <p className="mb-5 font-light text-navy-light gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 mb-4">
        <Button type="type19"
        onClick={() => setSelectedPlan("Monthly")}
        >
                Monthly
        </Button>
        <Button type="type19"
        onClick={() => setSelectedPlan("Yearly")}>
                Yearly 
        </Button>
      </div>


      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* <!-- Pricing Card --> */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-navy bg-white  rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">Free</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">$0</span>
                  <span className="text-gray-500 dark:text-gray-400"></span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" className="mb-24 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Appointment Count: <span className="font-semibold">5x/month</span></span>
                  </li>
                  
              </ul> 
              
              <button onClick={handleRedirect} className="bg-blue-100 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 hover:bg-offWhite-dark white dark:hover:bg-white dark:hover:text-black dark:text-white">Get started</button>
          </div>
          {/* <!-- Pricing Card --> */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-navy bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">{selectedPlan === "Monthly" ? "$90" : "$900"}</span>
                  <span className="text-gray-500 dark:text-gray-400">{selectedPlan === "Monthly" ? "/month" : "/year"}</span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" className="mb-24 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Appointment Count: <span className="font-semibold">50x/month</span></span>
                  </li>
                  
                  
              </ul>
              <button onClick={()=> handleCheckout(selectedPlan === "Monthly" ? "price_1QsAPGP6ONB2IDlqFgbc5PMm" : "price_1QsAQkP6ONB2IDlqiMwUcvQS")} className="bg-blue-100 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 hover:bg-offWhite-dark dark:hover:text-black dark:hover:bg-white">Get started</button>
          </div>
          {/* <!-- Pricing Card --> */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-navy rounded-lg border border-gray-100 shadow-blue-700 dark:border-gray-600 xl:p-8 dark:bg-gray-700 dark:text-white">
              <h3 className="text-white mb-4 text-2xl font-semibold">Ultra Premium</h3>
              <p className="font-light sm:text-lg text-white">Best for large scale uses and extended redistribution rights.</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="text-white mr-2 text-5xl font-extrabold">{selectedPlan === "Monthly" ? "$150" : "$1500"}</span>
                  <span className="text-white dark:text-gray-400">{selectedPlan === "Monthly" ? "/month" : "/year"}</span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" className="mb-24 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      <span>Appointment Count: <span className="font-semibold">Unlimited</span></span>
                  </li>

              </ul>
              <button onClick={()=>handleCheckout(selectedPlan === "Monthly" ? "price_1QsATcP6ONB2IDlq8IPG3Ubl" : "price_1QsAUOP6ONB2IDlqrxmCfsS3")} className="text-white  bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:text-white dark:hover:text-black dark:focus:ring-primary-900 hover:bg-seaGreen dark:hover:bg-[#c3bac2]">Get started</button>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default PricingForm