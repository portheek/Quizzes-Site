import React, { useEffect, useState } from 'react';
import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizQuestions, getQuestionAnswers } from "../../services/apiService"; // Ensure this imports your API functions
import './takequiz.css';

function TakeQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {

      try {
        const questionData = await getQuizQuestions(id);
        const questionsWithAnswers = await Promise.all(
          questionData.map(async (question) => {
            const answers = await getQuestionAnswers(id, question.id);
            return { ...question, answers: answers || [] };
          })
        );
        setQuestions(questionsWithAnswers);
     
        // Extract correct answers
        const extractedCorrectAnswers = questionsWithAnswers.reduce((acc, question) => {
          acc[question.id] = question.answers
            .filter(answer => answer.is_Correct)
            .map(answer => answer.id);
          return acc;
        }, {});
        setCorrectAnswers(extractedCorrectAnswers);

        console.log("Correct Answers:", extractedCorrectAnswers);

      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleAnswerChange = (questionId, answerId, isChecked) => {
    setSelectedAnswers(prevState => {
      const newSelectedAnswers = { ...prevState };
      if (!newSelectedAnswers[questionId]) {
        newSelectedAnswers[questionId] = [];
      }
      if (isChecked) {
        // Only add the answer if it doesn't already exist
        if (!newSelectedAnswers[questionId].includes(answerId)) {
          newSelectedAnswers[questionId].push(answerId);
        }
      } else {
        newSelectedAnswers[questionId] = newSelectedAnswers[questionId].filter(id => id !== answerId);
      }
      return newSelectedAnswers;
    });
  };
  

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    console.log("Selected Answers:", selectedAnswers);
    console.log("Correct Answers:", correctAnswers);
    console.log("Questions:", questions);

    // Navigate to the end quiz page with data
    navigate('/endquiz', { state: { selectedAnswers, correctAnswers, questions } });
  };

  if (questions.length === 0) {
    return (
      <>
        <NavBar />
        <div className="container mt-5">
          <h1>Loading...</h1>
        </div>
        <Footer />
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <NavBar />

      <div className="container">
        <h1 className="mt-5">Viktorina: {currentQuestion.quizTitle}</h1>
        <div className="card mt-3">
          <h5 className="card-header">Klausimas {currentQuestionIndex + 1} iš {questions.length}.</h5>
          <div className="card-body">
            <h5 className="card-title">{currentQuestion.questionText}</h5>

            <div className="container">
              <ul className="list-group">
                {currentQuestion.answers.map(answer => (
                  <li key={answer.id} className="list-group-item quiz-li">
                    <input
                      className="form-check-input me-1 quiz-input"
                      type="checkbox"
                      value={answer.id}
                      id={`answer${answer.id}`}
                      checked={selectedAnswers[currentQuestion.id]?.includes(answer.id) || false}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, answer.id, e.target.checked)}
                    />
                    <label
                      className="form-check-label stretched-link quiz-label"
                      htmlFor={`answer${answer.id}`}
                    >
                      {answer.question_Answer}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              {currentQuestionIndex > 0 && (
                <button onClick={handlePreviousQuestion} className="btn btn-secondary">Atgal</button>
              )}
              {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNextQuestion} className="btn btn-primary btnmargin">Kitas</button>
              ) : (
                <button onClick={handleSubmitQuiz} className="btn btn-success btnmargin">Baigti</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default TakeQuizPage;
