import "./jumbotron.css";
import logo from "./logo.svg";
import QuizHeading from "../quizheading";
import { Link } from "react-router-dom";
import { logout } from "../../services/authService";

function Jumbotron() {
  const content = `Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.`;

  const userName = localStorage.getItem("username");
  var loggedIn = false;
  if (userName) {
    loggedIn = true;
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      if (logout()) {
        loggedIn = false;
      }
    } catch {}
  };

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
                  <p>Prisijungęs vartotojas: {userName}</p>
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
          <QuizHeading title="Heading" content={content} />
          <QuizHeading title="Heading" content={content} />
          <QuizHeading title="Heading" content={content} />
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
