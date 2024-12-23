import React, { useEffect, useState } from 'react';
import NavBar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import { Link, useParams } from "react-router-dom";
import { 
  getQuizQuestions, 
  addQuestion, 
  updateQuestion, 
  deleteQuestion, 
  getQuestionAnswers, 
  addAnswer, 
  updateAnswer, 
  deleteAnswer 
} from "../../services/apiService";
import './index.css';

function QuizQuestionsEditPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editingQuestionText, setEditingQuestionText] = useState('');
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [currentAnswerId, setCurrentAnswerId] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionError, setQuestionError] = useState('');
  const [answerError, setAnswerError] = useState('');


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionData = await getQuizQuestions(id);
        const questionsWithAnswers = await Promise.all(questionData.map(async (question) => {
          const answers = await getQuestionAnswers(id, question.id);
          return { ...question, answers: answers || [] };
        }));
        setQuestions(questionsWithAnswers);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) {
      setQuestionError('Klausimas negali būti tuščias.');
      return;
    }
    setQuestionError(''); // Clear error if validation passes
  
    try {
      const newQuestion = await addQuestion(id, newQuestionText);
      setQuestions([...questions, { ...newQuestion, answers: [] }]);
      setNewQuestionText('');
    } catch (error) {
      console.error('Failed to add question:', error);
    }
  };
  

  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    if (!editingQuestionText.trim()) {
      setQuestionError('Klausimas negali būti tuščias.');
      return;
    }
    setQuestionError(''); // Clear error if validation passes
  
    try {
      const updatedQuestion = await updateQuestion(id, editingQuestionId, editingQuestionText);
      setQuestions(questions.map(q => (q.id === editingQuestionId ? { ...updatedQuestion, answers: q.answers } : q)));
      setEditingQuestionId(null);
      setEditingQuestionText('');
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };
  

  const handleDeleteQuestion = async (questionId) => {
    const question = questions.find(q => q.id === questionId);
  
    // Check if the question has answers
    if (question.answers && question.answers.length > 0) {
      alert('Klausimo negalima ištrinti, nes jis turi atsakymų.');
      return;
    }
  
    try {
      await deleteQuestion(id, questionId);
      setQuestions(questions.filter(q => q.id !== questionId));
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };
  

  const handleSaveAnswer = async (e) => {
    e.preventDefault();
    try {
      if (currentAnswerId) {
        const updatedAnswer = await updateAnswer(id, currentQuestionId, currentAnswerId, answerText, isCorrect);
        setQuestions(questions.map(q => q.id === currentQuestionId ? {
          ...q,
          answers: q.answers.map(a => a.id === currentAnswerId ? updatedAnswer : a)
        } : q));
      } else {
        const newAnswer = await addAnswer(id, currentQuestionId, answerText, isCorrect);
        setQuestions(questions.map(q => q.id === currentQuestionId ? { ...q, answers: [...q.answers, newAnswer] } : q));
      }
  
      // Clear modal inputs
      setCurrentQuestionId(null);
      setCurrentAnswerId(null);
      setAnswerText('');
      setIsCorrect(false);
  
      // Close modal
      const answerModal = document.getElementById('answerModal');
      const modal = new window.bootstrap.Modal(answerModal);
      modal.hide();
    } catch (error) {
      console.error('Failed to save answer:', error);
    }
  };
  
  
  

  const handleDeleteAnswer = async (questionId, answerId) => {
    try {
      await deleteAnswer(id, questionId, answerId);
      setQuestions(questions.map(q => q.id === questionId ? {
        ...q,
        answers: q.answers.filter(a => a.id !== answerId)
      } : q));
    } catch (error) {
      console.error('Failed to delete answer:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
      <Link to="/myquizzes">
          <div className="d-grid gap-2 backButton mt-3">
            <button className="btn btn-secondary w-100" type="button">
              Grįžti atgal
            </button>
          </div>
        </Link>
        <div className="card bg-light mb-3 mt-3">
            
          <div className="card-header">Klausimų ir atsakymų redagavimas</div>
          <div className="card-body">
          <form onSubmit={editingQuestionId ? handleUpdateQuestion : handleAddQuestion}>
            <div className="form-group">
                <label htmlFor="inputQuestion">Klausimas</label>
                <textarea
                className="form-control"
                id="inputQuestion"
                placeholder="Įveskite klausimą"
                value={editingQuestionId ? editingQuestionText : newQuestionText}
                onChange={(e) => editingQuestionId ? setEditingQuestionText(e.target.value) : setNewQuestionText(e.target.value)}
                />
                {questionError && <small className="text-danger">{questionError}</small>}
            </div>
            <button type="submit" className="btn btn-success">{editingQuestionId ? 'Atnaujinti klausimą' : 'Pridėti klausimą'}</button>
            </form>


            <ul className="list-group mt-4">
              {questions.map(question => (
                <li key={question.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>{question.questionText}</div>
                    <div>
                      <button 
                        className="btn btn-primary btn-sm me-2" 
                        onClick={() => { 
                          setEditingQuestionId(question.id); 
                          setEditingQuestionText(question.questionText); 
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <ul className="list-group mt-2">
                    {question.answers.map(answer => (
                      <li key={answer.id} className="list-group-item d-flex justify-content-between">
                        <div>{answer.question_Answer}</div>
                        <div>
                          <button 
                            className="btn btn-primary btn-sm me-2" 
                            onClick={() => {
                              setCurrentQuestionId(question.id);
                              setCurrentAnswerId(answer.id);
                              setAnswerText(answer.question_Answer);
                              setIsCorrect(answer.is_Correct);
                            }} 
                            data-bs-toggle="modal" 
                            data-bs-target="#answerModal"
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDeleteAnswer(question.id, answer.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                    <li className="list-group-item">
                      <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => {
                          setCurrentQuestionId(question.id);
                          setCurrentAnswerId(null);
                          setAnswerText('');
                          setIsCorrect(false);
                        }} 
                        data-bs-toggle="modal" 
                        data-bs-target="#answerModal"
                      >
                        Add Answer
                      </button>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      <div className="modal fade" id="answerModal" tabIndex="-1" aria-labelledby="answerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{currentAnswerId ? 'Edit Answer' : 'Add Answer'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSaveAnswer}>
                <div className="form-group">
                    <label htmlFor="inputAnswer">Atsakymas</label>
                    <textarea
                    className="form-control"
                    id="inputAnswer"
                    placeholder="Įveskite atsakymą"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    />
                    {answerError && <small className="text-danger">{answerError}</small>}
                </div>
                <div className="form-check mt-2">
                    <input
                    type="checkbox"
                    className="form-check-input"
                    id="isCorrect"
                    checked={isCorrect}
                    onChange={(e) => setIsCorrect(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="isCorrect">Teisingas atsakymas</label>
                </div>
                <button type="submit" className="btn btn-primary">Išsaugoti</button>
                </form>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default QuizQuestionsEditPage;
