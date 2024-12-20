import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link } from "react-router-dom";

function EditQuizPage() {
  return (
    <>
      <NavBar />

      <div className="container">
        <div className="card bg-light mb-3 mt-5">
          <div className="card-header">Viktorinos redagavimas</div>

          <div className="card-body">
            <form className="">
              <div className="form-group">
                <label htmlFor="inputName">Pavadinimas</label>
                <textarea
                  type="textarea"
                  className="form-control"
                  id="inputName"
                  placeholder="Įveskite pavadinimą"
                  name="question"
                />
              </div>

              <div className="form-group">
                <label htmlFor="inputContent">Aprašymas</label>
                <textarea
                  type="textarea"
                  className="form-control"
                  id="inputContent"
                  placeholder="Įveskite aprašymą"
                  name="question"
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
