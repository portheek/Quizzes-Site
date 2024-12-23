import React, { useEffect, useState } from 'react';
import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './endquiz.css';

function EndQuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAnswers, correctAnswers, questions } = location.state || {};

  useEffect(() => {
    if (!selectedAnswers || !correctAnswers || !questions) {
      // Redirect to take quiz page if state is null
      navigate('/');
    }
  }, [selectedAnswers, correctAnswers, questions, navigate]);

  const [results, setResults] = useState(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]);

  useEffect(() => {
    if (selectedAnswers && correctAnswers && questions) {
      const calculateResults = () => {
        console.log("Selected: ", selectedAnswers);
        console.log("Correct: ", correctAnswers);

        let correctAnswersCount = 0;
        let correctlyAnsweredIds = [];

        const resultsData = questions.map((question) => {
          const userAnswers = selectedAnswers[question.id] || [];
          const questionCorrectAnswers = correctAnswers[question.id] || [];

          // Check each answer if it was answered correctly
          const questionAnswers = question.answers.map((answer) => {
            const isCorrectAnswer = questionCorrectAnswers.includes(answer.id);
            const isUserAnswer = userAnswers.includes(answer.id);
            const isCorrectUserAnswer = isCorrectAnswer && isUserAnswer;
            const isIncorrectUserAnswer = !isCorrectAnswer && isUserAnswer;

            // Track correctly answered IDs
            if (isCorrectUserAnswer) {
              correctlyAnsweredIds.push(answer.id);
            }

            return {
              ...answer,
              isCorrectAnswer,
              isUserAnswer,
              isCorrectUserAnswer,
              isIncorrectUserAnswer,
            };
          });

          const isCorrect =
            userAnswers.length === questionCorrectAnswers.length &&
            userAnswers.every((answerId) => questionCorrectAnswers.includes(answerId));

          if (isCorrect) {
            correctAnswersCount++;
          }

          return {
            ...question,
            answers: questionAnswers,
            isCorrect,
          };
        });

        setResults({
          quizTitle: questions[0]?.quizTitle || "Viktorina",
          totalQuestions: questions.length,
          correctAnswers: correctAnswersCount,
          questions: resultsData,
        });

        setAnsweredCorrectly(correctlyAnsweredIds);
      };

      calculateResults();
    }
  }, [selectedAnswers, correctAnswers, questions]);

  if (!results) {
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

  return (
    <>
      <NavBar />

      <div className="container">
        <h1 className="mt-5">Viktorina: {results.quizTitle}</h1>
        <div className="alert alert-primary" role="alert">
          Viktorina baigta! Teisingai atsakyta: {results.correctAnswers}/{results.totalQuestions} ({Math.round((results.correctAnswers / results.totalQuestions) * 100)}%)
        </div>
        {results.questions.map((question, index) => (
          <div className="card mt-3" key={question.id}>
            <h5 className="card-header">Klausimas {index + 1} iš {results.totalQuestions}.</h5>
            <div className="card-body">
              <h5 className="card-title">{question.questionText}</h5>

              <div className="container">
                <ul className="list-group">
                  {question.answers.map(answer => (
                    <li key={answer.id} className={`list-group-item quiz-li ${answer.isCorrectUserAnswer ? 'correct-answer' : (!answer.isCorrectAnswer && !answer.isUserAnswer ? "correct-answer" : 'incorrect-answer')} ${answer.isUserAnswer ? 'user-answer' : ''}`}>
                      {answer.question_Answer}
               
                      {answer.isIncorrectUserAnswer && <span className="badge bg-danger ms-2">Neteisingas</span>}
                      {answer.isCorrectAnswer && <span className="badge bg-success ms-2">Teisingas</span>}
                      {!answer.isCorrectAnswer && !answer.isUserAnswer && <span className="badge bg-warning ms-2">Neteisingas</span>}

                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3">
          <Link to="/home" className="btn btn-success btnmargin">Pagrindinis</Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EndQuizPage;
