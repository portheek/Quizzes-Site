import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link } from "react-router-dom";
import './takequiz.css';

function TakeQuizPage() {
  return (
    <>
      <NavBar />

      <div className="container">
        <h1 className="mt-5">Viktorina: Kažkoks viktorinos pavadinimas</h1>
        <div className="card mt-3">
          <h5 className="card-header">Klausimas 1 iš 20.</h5>
          <div className="card-body">
            <h5 className="card-title">Kažkoks klausimas...?</h5>

            <div className="container">
              <ul className="list-group">
                <li className="list-group-item quiz-li">
                  <input
                    className="form-check-input me-1 quiz-input"
                    type="checkbox"
                    value=""
                    id="firstCheckboxStretched"
                  />
                  <label
                    className="form-check-label stretched-link quiz-label"
                    for="firstCheckboxStretched"
                  >
                    First checkbox
                  </label>
                </li>
                <li className="list-group-item quiz-li">
                  <input
                    className="form-check-input me-1 quiz-input"
                    type="checkbox"
                    value=""
                    id="secondCheckboxStretched"
                  />
                  <label
                    className="form-check-label stretched-link quiz-label"
                    for="secondCheckboxStretched"
                  >
                    Second checkbox
                  </label>
                </li>
                <li className="list-group-item quiz-li">
                  <input
                    className="form-check-input me-1 quiz-input"
                    type="checkbox"
                    value=""
                    id="thirdCheckboxStretched"
                  />
                  <label
                    className="form-check-label stretched-link quiz-label"
                    for="thirdCheckboxStretched"
                  >
                    Third checkbox
                  </label>
                </li>
              </ul>
            </div>

            <div className="mt-3">
              <Link to="/takequiz">
                <a href="#" className="btn btn-primary">
                  Kitas
                </a>
              </Link>
              <Link to="/endquiz">
                <a href="#" className="btn btn-success btnmargin">
                  Baigti
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default TakeQuizPage;