import React, { useEffect, useState } from 'react';
import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuiz, updateQuiz } from "../../services/apiService"; // Ensure these functions are defined in your API service

function EditQuizPage() {
  const { id } = useParams(); // Get the quiz id from the URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await getQuiz(id); // Fetch the quiz data based on the quiz id
        setTitle(quiz.title);
        setDescription(quiz.description);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateQuiz(id, title, description); // Update the quiz with new data
      navigate('/myquizzes'); // Navigate to the My Quizzes page after successful update
    } catch (error) {
      console.error('Failed to update quiz:', error);
    }
  };

  return (
    <>
      <NavBar />

      <div className="container">
        <div className="card bg-light mb-3 mt-5">
          <div className="card-header">Viktorinos redagavimas</div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="inputName">Pavadinimas</label>
                <textarea
                  type="textarea"
                  className="form-control"
                  id="inputName"
                  placeholder="Įveskite pavadinimą"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputContent">Aprašymas</label>
                <textarea
                  type="textarea"
                  className="form-control"
                  id="inputContent"
                  placeholder="Įveskite aprašymą"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <center>
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ float: "left" }}
                >
                  Išsaugoti
                </button>
              </center>
              <Link to="/myquizzes" className="btn btn-secondary btnmargin">Grįžti</Link>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EditQuizPage;
