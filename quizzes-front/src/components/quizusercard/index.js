import React from "react";
import { Link } from "react-router-dom";


import '../../shared/styles.css';

const QuizUserCard = ({ title, content, creationDate }) => {
  return (
    <div className="card mt-3">
      <h5 className="card-header">
        <span className="badge text-bg-secondary">{creationDate}</span>
      </h5>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <div className="d-grid gap-2">
          <Link to="/editquiz" className="btn btn-primary w-100">
            Redaguoti viktoriną
          </Link>
          <Link to="/editquestions" className="btn btn-primary w-100 mt-1">
            Redaguoti klausimus
          </Link>
          <Link to="/deletequiz" className="btn btn-danger w-100 mt-1">
            Naikinti
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizUserCard;
