import React from 'react';
import { Link } from 'react-router-dom';


const Buttons = ({ children, to, onClick, type,className }) => {
 
  const buttonStyles = {
    type1: "bg-[#2E5077] text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all mt-[60px]",//aboutherosection
    type2:"mt-4 px-4 py-2 bg-navy-dark text-white rounded hover:bg-navy-light", // blogdetails
    type3:"px-4 py-2 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out mb-5 rounded-lg", //bloglist
    type4:"px-4 py-2 text-black hover:bg-navy-light rounded-lg", //bloglist2
    type5:"mt-4 px-4 py-2 mb-5 bg-navy  text-white rounded hover:bg-navy-light transition-all", //bloglist3,
    type6:"px-[.5rem] py-[.3rem] rounded-lg", //appointment1
    type7:"px-4 py-2 mt-4 text-white transition duration-300 rounded-lg bg-seaGreen hover:bg-navy", //appointment2
    type8:"w-full px-6 py-3 transition-all duration-300 rounded-md text-offWhite bg-seaGreen hover:bg-navy-dark font-xl sm:mb-0", //contacktform
    type9:"px-4 py-2 opacity-80 rounded-full text-sm text-black font-urbanist flex items-center", // home/card.jsx 
    type10:"w-[50%] bg-gradient-to-r from-navy to-offWhite text-customBlack font-bold py-2 rounded-lg hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark", // home/card.jsx-2 
    type11:"relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10 bg-navy-200 hover:bg-navy-300 transition-colors duration-300 rounded-md px-4", // home/FAQ-1 
    type12:"px-4 py-2 bg-gradient-to-l from-offWhite to-seaGreen-light rounded-full hover:shadow-lg hover:shadow-offWhite-dark transform  text-black font-bold transition-all duration-300", // home/FAQ-2 
    type13:"md:px-6 px-4 py-2 text-customBlack-light font-semibold bg-gradient-to-l from-offWhite to-seaGreen-light rounded-full hover:shadow-lg hover:shadow-offWhite-dark transform trasition delay-100", // InfoSection
    type14:"fixed right-4 bottom-4 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-600 transition", // Quiz-1
    type15:"bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2", // Quiz-2
    type16:"bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600", // Quiz-3
    type17:"block w-full text-left bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md mb-2", // Quiz-4
    type18:"mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600", // Quiz-5
    type19:"bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow", // pricingPage- 1/2
    type20:"w-[50%] block mx-auto  bg-gradient-to-r from-navy to-offWhite text-customBlack font-bold py-2 rounded-lg hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark",//team-Card.jsx
    type21:"px-4 py-1 text-black font-semibold border-b-4 hover:bg-navy-light focus:outline-none tab-button transition-all duration-300 ease-in-out  rounded-lg", // team-TabSwitch.jsx 
    type22:"px-6 py-3 text-lg text-white rounded-lg bg-gradient-to-r from-navy to-seaGreen hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark", //team-teamDetail.jsx 
    type23:"w-[50%] block mx-auto bg-gradient-to-r from-navy to-offWhite text-customBlack font-bold py-2 rounded-lg hover:bg-gradient-to-r hover:from-navy-dark hover:to-seaGreen-dark", //component-Card.jsx 
    type24:"relative rounded-full  bg-navy-dark p-1 text-offWhite-light  hover:text-offWhite-light hover:bg-mauve-light hover:shadow-3xl hover:shadow-navy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy",// navbar-1 
    type25:"relative rounded-md whitespace-nowrap px-2 py-2 text-sm sm:px-3 sm:py-1 xs:px-2 xs:text-xs text-offWhite-light bg-mauve-dark hover:text-offWhite-light hover:bg-mauve-light hover:shadow-3xl hover:shadow-navy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy", //navbar-2
    type26:"relative p-[8px] text-navy-dark bg-offWhite rounded-full group hover:bg-navy-dark hover:text-offWhite focus:z-10 dark:focus:ring-navy-dark dark:bg-navy focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy dark:text-gray-400 dark:hover:text-offWhite dark:hover:bg-navy-light shadow-lg shadow-mauve-light hover:shadow-6xl hover:shadow-navy-dark", // component - Switch
    type27:"px-4 py-2 text-sm font-medium text-white transition duration-300 rounded-lg bg-seaGreen hover:bg-navy",  //pages - verifyEmail- 1
    type28:"px-4 py-2 text-sm font-medium transition duration-300 border rounded-lg text-navy border-navy", //pages - verifyEmail - 2
  };

  const combinedClassName = `${buttonStyles[type]} ${className}`

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Buttons;