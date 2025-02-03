import React, { useState } from 'react'

const PricingForm = () => {

    const [selectedPlan, setSelectedPlan] = useState("Monthly");

    

  return (
    <div>
    <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md text-center mb-4 lg:mb-6">
          <h2 class="mb-4 text-center text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Plans & Pricing</h2>
          <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
      </div>
      <div class="flex flex-col sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 mb-4 mb-8">
        <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => setSelectedPlan("Monthly")}>
                Monthly
        </button>
        <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => setSelectedPlan("Yearly")}>
                Yearly 
        </button>
      </div>


      <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* <!-- Pricing Card --> */}
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-[#f4f3f3]  rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">Free</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
              <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">{selectedPlan === "Monthly" ? "$9" : "$90"}</span>
                  <span class="text-gray-500 dark:text-gray-400">{selectedPlan === "Monthly" ? "/month" : "/year"}</span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" class="mb-24 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Individual configuration</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Team size: <span class="font-semibold">1 developer</span></span>
                  </li>
                  
                  
              </ul>
              <a href="#" class="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-primary-900 hover:bg-[#cbc5cb] dark:hover:bg-white dark:hover:text-black dark:text-white">Get started</a>
          </div>
          {/* <!-- Pricing Card --> */}
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-[#f4f3f3] rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">Company</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
              <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">{selectedPlan === "Monthly" ? "$90" : "$900"}</span>
                  <span class="text-gray-500 dark:text-gray-400">{selectedPlan === "Monthly" ? "/month" : "/year"}</span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" class="mb-24 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Individual configuration</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Team size: <span class="font-semibold">10 developers</span></span>
                  </li>
                  
                  
              </ul>
              <a href="#" class="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 hover:bg-[#cbc5cb] dark:hover:text-black dark:hover:bg-white">Get started</a>
          </div>
          {/* <!-- Pricing Card --> */}
          <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-[#1e5ea8] rounded-lg border border-gray-100 shadow-blue-700 dark:border-gray-600 xl:p-8 dark:bg-gray-700 dark:text-white">
              <h3 class="text-white mb-4 text-2xl font-semibold">Enterprise</h3>
              <p class="font-light sm:text-lg text-white">Best for large scale uses and extended redistribution rights.</p>
              <div class="flex justify-center items-baseline my-8">
                  <span class="text-white mr-2 text-5xl font-extrabold">{selectedPlan === "Monthly" ? "$99" : "$999"}</span>
                  <span class="text-white dark:text-gray-400">{selectedPlan === "Monthly" ? "/month" : "/year"}</span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" class="mb-24 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Individual configuration</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Team size: <span class="font-semibold">100+ developers</span></span>
                  </li>

                 
              </ul>
              <a href="#" class="text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:text-white dark:hover:text-black dark:focus:ring-primary-900 hover:bg-[#8F5B8A] dark:hover:bg-[#c3bac2]">Get started</a>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default PricingForm