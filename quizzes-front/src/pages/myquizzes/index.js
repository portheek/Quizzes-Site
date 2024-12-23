import React, { useEffect, useState } from 'react';
import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link } from "react-router-dom";
import QuizUserCard from "../../components/quizusercard";
import { getUserQuizzes, deleteQuiz } from "../../services/apiService";

function MyQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      const userId = localStorage.getItem("userid"); 
      if (!userId) {
        console.error('No userid found');
        return;
      }

      try {
        const quizData = await getUserQuizzes(userId);
        setQuizzes(quizData);
      } catch (error) {
        console.error('Failed to fetch quizzes:', error);
      }
    };

    fetchUserQuizzes();
  }, []);

  const handleDelete = async () => {
    if (selectedQuizId) {
      try {
        await deleteQuiz(selectedQuizId);
        setQuizzes(quizzes.filter(quiz => quiz.id !== selectedQuizId));
        setSelectedQuizId(null);
      } catch (error) {
        console.error('Failed to delete quiz:', error);
      }
    }
  };

  return (
    <>
      <NavBar />

      <div className="container mt-3">
        <Link to="/home">
          <div className="d-grid gap-2 backButton">
            <button className="btn btn-secondary w-100" type="button">
              Grįžti į pagrindinį
            </button>
          </div>
        </Link>

        <h1 className="mt-4"><center>Mano viktorinų sąrašas</center></h1>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <Link to="/addquiz">
              <div className="d-grid gap-2">
                <button className="btn btn-success w-100" type="button">
                  Pridėti naują viktoriną
                </button>
              </div>
            </Link>
          </div>

          {quizzes.map((quiz) => {
            const formattedDate = new Date(quiz.creation_Date).toLocaleDateString();
            return (
              <div className="col-12 col-md-8" key={quiz.id}>
                <QuizUserCard
                  id={quiz.id}
                  title={quiz.title}
                  content={quiz.description}
                  creationDate={formattedDate}
                  onDelete={() => setSelectedQuizId(quiz.id)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Patvirtinkite Naikinimą</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Ar tikrai norite naikinti šią viktoriną?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Atšaukti</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">Naikinti</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyQuizzesPage;
