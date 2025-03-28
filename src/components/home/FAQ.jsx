import image from "../../assets/images/pexels-yankrukov-4458403.jpg";
import { useState, useEffect } from "react";
import "../../index.css";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();
  const [visibleQuestions, setVisibleQuestions] = useState(5);
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleQuestion = (index) => {
    if (isMobile) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  const showMoreQuestions = () => {
    setVisibleQuestions((prev) => Math.min(prev + 5, faqData.length));
  };

  const showLessQuestions = () => {
    setVisibleQuestions(5);
  };

  const faqData = [
    {
      question: `${t("faqQuestionOne")}`,
      answer: `${t("faqAnswerOne")}`,
    },
    {
      question: `${t("faqQuestionTwo")}`,
      answer: `${t("faqAnswerTwo")}`,
    },
    {
      question: `${t("faqQuestionThree")}`,
      answer: `${t("faqAnswerThree")}`,
    },
    {
      question: `${t("faqQuestionFour")}`,
      answer: `${t("faqAnswerFour")}`,
    },
    {
      question: `${t("faqQuestionFive")}`,
      answer: `${t("faqAnswerFive")}`,
    },
    {
      question: `${t("faqQuestionSix")}`,
      answer: `${t("faqAnswerSix")}`,
    },
    {
      question: `${t("faqQuestionSeven")}`,
      answer: `${t("faqAnswerSeven")}`,
    },
    {
      question: `${t("faqQuestionEight")}`,
      answer: `${t("faqAnswerEight")}`,
    },
    {
      question: `${t("faqQuestionNine")}`,
      answer: `${t("faqAnswerNine")}`,
    },
    {
      question: `${t("faqQuestionTen")}`,
      answer: `${t("faqAnswerTen")}`,
    },
  ];

  return (
    <div className="relative overflow-hidden isolate bg-custom">
      <p className="text-3xl sm:text-5xl font-semibold text-base-content font-[Urbanist] text-center mt-16 text-navy dark:text-offWhite-dark">
        {t("faqTitle")}
      </p>
      <div className="flex flex-col items-start justify-center max-w-5xl gap-12 px-8 py-12 mx-auto md:flex-row">
        <div className="flex flex-col w-full text-center basis-1/2">
          <div
            className="h-64 sm:h-80 md:h-[28rem] w-full bg-center bg-cover rounded-md"
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden="true"
          ></div>
        </div>
        <div className="w-full basis-1/2">
          <ul>
            {faqData.slice(0, visibleQuestions).map((faq, index) => (
              <li
                className={`group bg-${
                  index % 3 === 0 ? "blue-50" : "green-50"
                } dark:bg-${
                  index % 3 === 0 ? "gray-600" : "green-600"
                } border border-${
                  index % 3 === 0 ? "blue-200" : "green-200"
                } p-0 rounded-lg mb-0`}
                key={index}
              >
                <button
                  className="relative flex items-center w-full gap-2 px-4 py-5 text-base font-semibold text-left transition-colors duration-300 border-t rounded-md md:text-lg border-base-content/10 bg-navy-200 hover:bg-navy-300"
                  aria-expanded={openIndex === index}
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="flex-1 text-base-content">
                    {faq.question}
                  </span>
                  <svg
                    className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className="transition duration-200 origin-center transform"
                    ></rect>
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className="transition duration-100 ease-out origin-center transform rotate-90 group-hover:opacity-0"
                    ></rect>
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-60 max-h-0 ${
                    isMobile && openIndex === index ? "max-h-60" : ""
                  }`}
                  style={{ transition: "max-height 0.6s ease-in-out 0.2s" }}
                >
                  <div className="px-4 pb-5 leading-relaxed">
                    <div className="space-y-2 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-center">
            <button
              onClick={
                visibleQuestions < faqData.length
                  ? showMoreQuestions
                  : showLessQuestions
              }
              className="px-4 py-2 font-bold transition-all duration-300 transform rounded-full text-offWhite bg-seaGreen hover:shadow-lg hover:shadow-offWhite-dark"
            >
              {visibleQuestions < faqData.length ? t("seeMore") : t("seeLess")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
