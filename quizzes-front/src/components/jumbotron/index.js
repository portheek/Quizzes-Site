import "./jumbotron.css";
import logo from "./logo.svg";
import QuizHeading from "../quizheading";
import { Link } from "react-router-dom";
import { logout } from "../../services/authService";
import { getAllQuizzes } from "../../services/apiService";
import React, { useEffect, useState } from "react";

function Jumbotron() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      setLoggedIn(true);
    }

    const fetchQuizzes = async () => {
      try {
        const quizData = await getAllQuizzes();
        setQuizzes(quizData);
      } catch (error) {
        console.error('Failed to fetch quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      setLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getRandomQuizzes = () => {
    if (!quizzes || quizzes.length === 0) {
      return [];
    }
    const shuffledQuizzes = shuffleArray([...quizzes]);
    return shuffledQuizzes.slice(0, 3);
  };

  const randomQuizzes = getRandomQuizzes();

  return (
    <main role="main jcontainer">
      <div className="jumbotron ">
        <div className="container ">
          <div className="row align-items-center">
            <div className="col-sm-2 d-flex justify-content-center align-items-center">
              <img src={logo} alt="logo" />
            </div>

            <div className="col-sm-10 ">
              <h2>Viktorinų kūrimo ir atsakinėjimo svetainė.</h2>
              {loggedIn ? (
                <>
                  <p>Prisijungęs vartotojas: {localStorage.getItem("username")}</p>
                  <p className="mt-3">
                    <a
                      className="btn btn-danger btn-lg"
                      href="#"
                      role="button"
                      onClick={handleLogout}
                    >
                      Atsijungti
                    </a>

                    <Link to="/myquizzes">
                      <a
                        className="btn btn-secondary btn-lg regbtn"
                        href="#"
                        role="button"
                      >
                        Mano viktorinos
                      </a>
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Šioje svetainėje galima atsakinėti į įvairias viktorinas ir
                    gauti rezultatus. Taip pat, užsiregistravus galima kurti
                    savo viktorinas ir leisti jas spręsti kitiems naudotojams.
                  </p>
                  <p className="mt-3">
                    <Link to="/login">
                      <a
                        className="btn btn-primary btn-lg"
                        href="#"
                        role="button"
                      >
                        Prisijungimas
                      </a>
                    </Link>
                    <Link to="/register">
                      <a
                        className="btn btn-secondary btn-lg regbtn"
                        href="#"
                        role="button"
                      >
                        Registracija
                      </a>
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {randomQuizzes.map((quiz) => (
            <QuizHeading key={quiz.id} id={quiz.id} title={quiz.title} content={quiz.description} />
          ))}
        </div>
        <Link to="/quizzes">
          <div className="d-grid gap-2 ">
            <button className="btn btn-primary w-100" type="button">
              Peržiūrėti visas viktorinas
            </button>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default Jumbotron;
