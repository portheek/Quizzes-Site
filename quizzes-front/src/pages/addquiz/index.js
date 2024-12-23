import React, { useState } from 'react';
import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link, useNavigate } from "react-router-dom";
import { addQuiz } from "../../services/apiService"; // Ensure this imports your API function

function AddQuizPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addQuiz(title, description);
      // Navigate to My Quizzes page after successful creation
      navigate('/myquizzes');
    } catch (error) {
      console.error('Failed to create quiz:', error);
    }
  };

  return (
    <>
      <NavBar />

      <div className="container">
        <div className="card bg-light mb-3 mt-5">
          <div className="card-header">Viktorinos pridėjimas</div>

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
                  Pridėti
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

export default AddQuizPage;
