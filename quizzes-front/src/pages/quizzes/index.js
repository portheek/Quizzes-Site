import React from 'react';
import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link } from "react-router-dom";

import QuizCard from "../../components/quizcard";

function QuizzesPage() {
  const content = `Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.`;

  return (
    <>
      <NavBar />

      <div className="container mt-3">
        <Link to="/home">
          <div className="d-grid gap-2 backButton">
            <button className="btn btn-secondary" type="button">
              Grįžti į pagrindinį
            </button>
          </div>
        </Link>

        <h1 className="mt-4"><center>Visų viktorinų sąrašas</center></h1>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <QuizCard
              title="Testinė viktorina"
              content={content}
              user="Mantas V."
              creationDate="2024-12-12"
            />
          </div>
          <div className="col-12 col-md-8">
            <QuizCard
              title="Testinė viktorina"
              content="Labai mažai content"
              user="Mantas V."
              creationDate="2024-12-12"
            />
          </div>
          <div className="col-12 col-md-8">
            <QuizCard
              title="Testinė viktorina"
              content="Labai mažai content"
              user="Mantas V."
              creationDate="2024-12-12"
            />
          </div>
          <div className="col-12 col-md-8">
            <QuizCard
              title="Testinė viktorina"
              content="Labai mažai content"
              user="Mantas V."
              creationDate="2024-12-12"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default QuizzesPage;
