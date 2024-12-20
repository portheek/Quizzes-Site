import "./bootstrap.min.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link to="/home">
          <a className="navbar-brand" href="#">
            Quizz Site
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <Link to="/home">
                <a className="nav-link" href="#">
                  Pagrindinis
                </a>
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/quizzes">
                <a className="nav-link" href="#">
                  Viktorinos
                </a>
              </Link>
            </li>
            
            
          </ul>

        </div>
      </nav>
    </>
  );
}

export default NavBar;
