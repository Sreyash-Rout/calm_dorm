import React from "react";
import { quizData } from "./quizData";
import './quiz.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const MainQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [userAnswers, setUserAnswers] = React.useState({}); // To store the answers for each question

  const navigate = useNavigate(); // Initialize useNavigate

  React.useEffect(() => {
    loadQuizData();
  }, [currentQuestion]);

  const loadQuizData = () => {
    setOptions(quizData[currentQuestion].options);
  };

  const nextQuestionHandler = () => {
    if (selectedOption) {
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [quizData[currentQuestion].id]: selectedOption,
      }));
      setSelectedOption(null); // Reset selected option for the next question
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }
  };

  const PostData = async () => {
    try {
      const dataToPost = { userAnswers };
      const jsonData = JSON.stringify(dataToPost);
      console.log('Posting data:', jsonData); // Log entire payload
      console.log('Payload size:', jsonData.length); // Log size of payload
      const response = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error posting quiz data:', error);
    }
  };

  const finishHandler = async () => {
    if (selectedOption) {
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [quizData[currentQuestion].id]: selectedOption,
      }));
    }

    // Wait for the state to be updated before posting data
    await new Promise(resolve => setTimeout(resolve, 100)); // Allow a short delay

    // Post data to the server
    await PostData();

    // Redirect to calendar page
    navigate('/calendar');
  };

  return (
    <div className="App">
      <div className="quiz-container">
        <h1>{quizData[currentQuestion].question}</h1>
        <span>{`Question ${currentQuestion + 1} out of ${quizData.length}`}</span>
        {options.map((option) => (
          <p
            key={option}
            className={`ui floating message options ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </p>
        ))}
        {currentQuestion < quizData.length - 1 && (
          <button
            className="ui inverted button"
            disabled={!selectedOption} // Enable button if an option is selected
            onClick={nextQuestionHandler}
          >
            Next
          </button>
        )}
        {currentQuestion === quizData.length - 1 && (
          <button className="ui inverted button" onClick={finishHandler}>
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default MainQuiz;