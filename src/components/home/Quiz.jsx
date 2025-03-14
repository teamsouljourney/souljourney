import { useState, useEffect } from "react";
import "../../index.css"; // Assuming you add styles in this CSS file
import { useTranslation } from "react-i18next";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false); // Test area
  const [isScrolled, setIsScrolled] = useState(false); // SCROLL
  const { t } = useTranslation();

  const quizData = [
    {
      question: `${t("quizQuestionOne")}`,
      options: [
        { text: `${t("OneOptionA")}`, score: 0 },
        { text: `${t("OneOptionB")}`, score: 1 },
        { text: `${t("OneOptionC")}`, score: 2 },
        { text: `${t("OneOptionD")}`, score: 3 },
      ],
    },
    {
      question: `${t("quizQuestionTwo")}`,
      options: [
        { text: `${t("TwoOptionA")}`, score: 0 },
        { text: `${t("TwoOptionB")}`, score: 1 },
        { text: `${t("TwoOptionC")}`, score: 2 },
        { text: `${t("TwoOptionD")}`, score: 3 },
      ],
    },
    {
      question: `${t("quizQuestionThree")}`,
      options: [
        { text: `${t("ThreeOptionA")}`, score: 0 },
        { text: `${t("ThreeOptionB")}`, score: 1 },
        { text: `${t("ThreeOptionC")}`, score: 2 },
        { text: `${t("ThreeOptionD")}`, score: 3 },
      ],
    },
    {
      question: `${t("quizQuestionFour")}`,
      options: [
        { text: `${t("FourOptionA")}`, score: 0 },
        { text: `${t("FourOptionB")}`, score: 1 },
        { text: `${t("FourOptionC")}`, score: 2 },
        { text: `${t("FourOptionD")}`, score: 3 },
      ],
    },
    {
      question: `${t("quizQuestionFive")}`,
      options: [
        { text: `${t("FiveOptionA")}`, score: 0 },
        { text: `${t("FiveOptionB")}`, score: 1 },
        { text: `${t("FiveOptionC")}`, score: 2 },
        { text: `${t("FiveOptionD")}`, score: 3 },
      ],
    },
    {
      question: `${t("quizQuestionSix")}`,
      options: [
        { text: `${t("SixOptionA")}`, score: 0 },
        { text: `${t("SixOptionB")}`, score: 1 },
        { text: `${t("SixOptionC")}`, score: 2 },
        { text: `${t("SixOptionD")}`, score: 3 },
      ],
    },
    {
      question: `${t("quizQuestionSeven")}`,
      options: [
        { text: `${t("SevenOptionA")}`, score: 0 },
        { text: `${t("SevenOptionB")}`, score: 1 },
        { text: `${t("SevenOptionC")}`, score: 2 },
        { text: `${t("SevenOptionD")}`, score: 3 },
      ],
    },
    {
      question: `${t("quizQuestionEight")}`,
      options: [
        { text: `${t("EightOptionA")}`, score: 0 },
        { text: `${t("EightOptionB")}`, score: 1 },
        { text: `${t("EightOptionC")}`, score: 2 },
        { text: `${t("EightOptionD")}`, score: 3 },
      ],
    },
    {
      question: `${t("quizQuestionNine")}`,
      options: [
        { text: `${t("NineOptionA")}`, score: 0 },
        { text: `${t("NineOptionB")}`, score: 1 },
        { text: `${t("NineOptionC")}`, score: 2 },
        { text: `${t("NineOptionD")}`, score: 3 },
      ],
    },
    {
      question: `${t("quizQuestionTen")}`,
      options: [
        { text: `${t("TenOptionA")}`, score: 0 },
        { text: `${t("TenOptionB")}`, score: 1 },
        { text: `${t("TenOptionC")}`, score: 2 },
        { text: `${t("TenOptionD")}`, score: 3 },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnswer = (score) => {
    setScore((prevScore) => prevScore + score);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="dark:text-black">
      {/* "Self-Test" Button   */}
      <div className="flex justify-center">
        <button
          className={`px-6 py-1 rounded-full shadow-lg duration-300 bg-mauve hover:bg-seaGreen-light z-50 font-semibold bottom-[12rem] text-offWhite col-auto
      ${
        isScrolled
          ? "fixed bottom-30 right-5"
          : "absolute top-[calc(60+20px)] text-2x1 sm:px-6 sm:py-4 sm:text-2xl md:px-6 md:py-4 md:text-2x1"
      }`}
          onClick={() => setShowQuiz(true)}
        >
          {t("selfTest")}
        </button>
      </div>
      {/* Quiz Section */}
      {showQuiz && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-background-dark w-11/12 max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {t("emotionalWell-beingCheck")}
            </h2>

            {showResult ? (
              <div className="text-center">
                <p className="mb-4">
                  {t("yourScore")}: <strong>{score}</strong> / {quizData.length}
                </p>
                <p className="mb-4">
                  {score / (quizData.length * 3) <= 0.3
                    ? t("score1")
                    : score / (quizData.length * 3) <= 0.6
                    ? t("score2")
                    : t("score3")}
                </p>
                <button
                  onClick={handleRestart}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                  {t("restart")}
                </button>
                <button
                  onClick={() => {
                    handleRestart();
                    setShowQuiz(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  {t("close")}
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {quizData[currentQuestion].question}
                </h3>
                <ul>
                  {quizData[currentQuestion].options.map((option, index) => (
                    <li key={index}>
                      <button
                        className="block w-full text-left bg-gray-100 dark:bg-background-lightdark hover:bg-gray-200 px-4 py-2 rounded-md mb-2"
                        onClick={() => handleAnswer(option.score)}
                      >
                        {option.text}
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    handleRestart();
                    setShowQuiz(false);
                  }}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  {t("close")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
