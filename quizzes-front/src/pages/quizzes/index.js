import React, { useEffect, useState } from 'react';
import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link } from "react-router-dom";
import QuizCard from "../../components/quizcard";
import { getAllQuizzes, deleteQuiz } from "../../services/apiService"; 

function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [quizToDelete, setQuizToDelete] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizData = await getAllQuizzes();
        setQuizzes(quizData);
      } catch (error) {
        console.error('Failed to fetch quizzes:', error);
      }
    };

 
    const checkAdminStatus = () => {
 
      const userRole = localStorage.getItem('userRole'); 
      setIsAdmin(userRole && userRole.toLowerCase().includes('admin'));
    };

    fetchQuizzes();
    checkAdminStatus();
  }, []);

  const handleDelete = async () => {
    if (quizToDelete) {
      try {
        await deleteQuiz(quizToDelete);
        setQuizzes(quizzes.filter(quiz => quiz.id !== quizToDelete));
        setQuizToDelete(null);
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

        <h1 className="mt-4"><center>Visų viktorinų sąrašas</center></h1>

        <div className="row justify-content-center">
          {quizzes.map((quiz) => {
            const formattedDate = new Date(quiz.creation_Date).toLocaleDateString();
            return (
              <div className="col-12 col-md-8" key={quiz.id}>
                <QuizCard
                  id={quiz.id}
                  username={quiz.userName}
                  title={quiz.title}
                  content={quiz.description}
                  user={quiz.userName}
                  creationDate={formattedDate}
                  isAdmin={isAdmin}
                  onDelete={() => setQuizToDelete(quiz.id)} 
                />
              </div>
            );
          })}
        </div>
      </div>

      <Footer />


      {quizToDelete && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Patvirtinti ištrynimą</h5>
                <button type="button" className="btn-close" onClick={() => setQuizToDelete(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Ar tikrai norite ištrinti šią viktoriną?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setQuizToDelete(null)}>Atšaukti</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Naikinti</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuizzesPage;
