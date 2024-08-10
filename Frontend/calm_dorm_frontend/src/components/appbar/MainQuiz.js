import React from "react";
import { quizData } from "./quizData";
import './quiz.css';
import { useNavigate } from 'react-router-dom';

const MainQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [userAnswers, setUserAnswers] = React.useState({});
  const [options, setOptions] = React.useState([]);

  const navigate = useNavigate();

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
      setSelectedOption(null);
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }
  };

  const PostData = async () => {
    try {
      const dataToPost = { userAnswers };
      const jsonData = JSON.stringify(dataToPost);
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
      if (quizData[currentQuestion].id === 6) {
        if (selectedOption === "Yes, submit") {
          setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [quizData[currentQuestion].id]: selectedOption,
          }));

          await PostData();
          navigate('/calendar', { state: { userAnswers } });
        } else if (selectedOption === "No, return to the first question") {
          setUserAnswers({});
          setSelectedOption(null);
          setCurrentQuestion(0);
        }
      } else {
        setUserAnswers(prevAnswers => ({
          ...prevAnswers,
          [quizData[currentQuestion].id]: selectedOption,
        }));
        setSelectedOption(null);
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
      }
    }
  };

  return (
    <div className="App">
      <div className="quiz-container">
        <h1>{quizData[currentQuestion].question}</h1>
        <span>{`Question ${currentQuestion + 1} out of ${quizData.length}`}</span>
        {options.map((option) => (
          <p
            key={option}
            className={`ui floating message options ${selectedOption === option ? "selected" : ""}`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </p>
        ))}
        {currentQuestion < quizData.length - 1 && (
          <button
            className="ui inverted button"
            disabled={!selectedOption}
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
