import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ title, content, user, creationDate }) => {
  return (
    <div className="card mt-3">
      <h5 className="card-header">
        Sukūrė: {user}{" "}
        <span className="badge text-bg-secondary">{creationDate}</span>
      </h5>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <Link to="/takequiz">
          <a href="#" className="btn btn-primary">
            Pradėti
          </a>
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
