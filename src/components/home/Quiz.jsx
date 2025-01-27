import { useState } from "react";
import "../../index.css"; // Assuming you add styles in this CSS file
// import { Quiz } from "@mui/icons-material"; 
import quizData from "../../helper/quizData.json"; 
 
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false); // Test area  

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
    <>
      {/* "Self-Test" Button */}
      <button
        className="fixed right-4 bottom-4 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-600 transition"
        onClick={() => setShowQuiz(true)}
      >
        Self-Test
      </button>

      {/* Quiz Section */}
      {showQuiz && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Emotional Well-being Check
            </h2>

            {showResult ? (
              <div className="text-center">
                <p className="mb-4">
                  Your score: <strong>{score}</strong> / {quizData.length}
                </p>
                <p className="mb-4">
                    {score / (quizData.length * 3) <= 0.3
                     ? "Great emotional well-being! Keep it up!"
                     : score / (quizData.length * 3) <= 0.6
                     ? "You might want to reflect on some aspects of your well-being."
                     : "Consider reaching out to one of our professionals for guidance."}
                </p>
                <button
                  onClick={handleRestart}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                  Restart
                </button>
                <button
                   onClick={() => {
                    handleRestart();  
                    setShowQuiz(false);  
                 }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Close
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
                        className="block w-full text-left bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md mb-2"
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
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
