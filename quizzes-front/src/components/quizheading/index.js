import React from 'react';
import { Link } from "react-router-dom";


const QuizHeading = ({ id, title, content }) => {
  return (
    <div className="col-md-4">
      <h2>{title}</h2>
      <p>{content}</p>
      <Link to={`/takequiz/${id}`}>
      <p>
        <a className="btn btn-secondary" href="#" role="button">
          Pradėti
        </a>
      </p>
      </Link>
    </div>
  );
};

export default QuizHeading;
