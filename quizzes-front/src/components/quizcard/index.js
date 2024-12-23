import React from "react";
import { Link } from "react-router-dom";
import '../../shared/styles.css';

const QuizCard = ({ id, username, title, content, creationDate, isAdmin, onDelete }) => {
  return (
    <div className="card mt-3">
      <h5 className="card-header">
        <span className="badge text-bg-secondary">Sukūrė: {username} Data: {creationDate}</span>
      </h5>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <div className="d-grid gap-2">
        {isAdmin && (<>
          <Link to={`/editquiz/${id}`} className="btn btn-primary w-100">
            Redaguoti viktoriną
          </Link>
          <Link to={`/editquestions/${id}`} className="btn btn-primary w-100 mt-1">
            Redaguoti klausimus
          </Link>
          
            <button className="btn btn-danger w-100 mt-1" onClick={onDelete}>
              Naikinti
            </button>
            </>)}
            <Link to={`/takequiz/${id}`} className="btn btn-success w-100 mt-1">
            Pradėti
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
