import faqData from "../../helper/faqData.json"; // Assuming the JSON data is stored in faqData.json
import image from "../../assets/images/pexels-yankrukov-4458403.jpg"; // Importing the background image
import { useState } from "react";
import "../../index.css";

const FAQ = () => {
    const [visibleQuestions, setVisibleQuestions] = useState(5);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const showMoreQuestions = () => {
      setVisibleQuestions((prev) => Math.min(prev + 5, faqData.length));
    };
    const showLessQuestions = () => {
      setVisibleQuestions(5)};
    
  return (
    <>
      <div className="relative isolate overflow-hidden bg-custom">
        <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex flex-col text-center basis-1/2">
            <p className="inline-block font-semibold text-primary mb-4">F.A.Q</p>
            <p className="sm:text-4xl text-3xl font-extrabold text-base-content font-[Urbanist] text-center">
              Frequently Asked Questions
            </p>
            <div
              className="mt-4 w-full h-64 bg-cover bg-center rounded-md"
              style={{ backgroundImage: `url(${image})` }}
              aria-hidden="true"
            ></div>
          </div>
          <div className="basis-1/2">
          <ul>
              {faqData.slice(0, visibleQuestions).map((faq, index) => (
                <li
                  className={`group bg-${index % 3 === 0 ? "blue-50" : "green-50" } border border-${index % 3 === 0 ? "blue-200" : "green-200"} p-0 rounded-lg mb-0`}
                  key={index}
                >
                  <button
                    className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10 bg-navy-200 hover:bg-navy-300 transition-colors duration-300 rounded-md px-4"
                    aria-expanded="false"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span className="flex-1 text-base-content">{faq.question}</span>
                    <svg
                     className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className="transform origin-center transition duration-200"
                      ></rect>
                      <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className="group-hover:opacity-0 transform origin-center rotate-90 transition duration-100 ease-out"
                      ></rect>
                    </svg>
                  </button>
                  <div
                    className="transition-all duration-500 ease-in-out group-hover:max-h-60 max-h-0 overflow-hidden"
                    style={{ transition: "max-height 0.5s ease-in-out 0s" }}
                  >
                    <div className="pb-5 leading-relaxed px-4">
                      <div className="space-y-2 leading-relaxed">{faq.answer}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* {visibleQuestions < faqData.length && ( */}
              <div className="text-center mt-4">
                <button
                  onClick={visibleQuestions < faqData.length ? showMoreQuestions : showLessQuestions}
                  className="px-4 py-2 bg-[rgb(116,206,215)] text-black font-bold rounded-full hover:bg-[hsl(164,59%,65%)] transition-all duration-300"
                >
                   {visibleQuestions < faqData.length ? "See More  →" : "See Less  →"}
                </button>
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
