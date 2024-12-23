import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const api = axios.create({
    baseURL: `https://localhost:7260`,
});





export const getAllQuizzes = async () => {
    try {
        const response = await api.get('/quizzes');
      
        return response.data;
    } catch (error) {
        console.log( error);
    }
};

export const getUserQuizzes = async (userid) => {
  try {
      const response = await api.get(`/quizzes/byUser/${userid}`);
      
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.log( error);
  }
};

export const addQuiz = async (title, description) => {
  try {
    const token = localStorage.getItem('token');
    
  if (!token) {
    console.error('No auth token found');
    return;
  }

    const response = await api.post(
      `/quizzes`,
      { title: title, description: description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    
      
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.log( error);
  }
};

export const deleteQuiz = async (quizId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No auth token found');
    return;
  }

  try {
    const response = await api.delete(`/quizzes/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to delete quiz:', error);
  }
};

export const getQuiz = async (id) => {

  try {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch quiz:', error);
  }
};

export const updateQuiz = async (id, title, description) => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    console.error('No auth token found');
    return;
  }

  try {
    const response = await api.put(`/quizzes/${id}`, {
      title,
      description
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update quiz:', error);
  }
};


export const getQuizQuestions = async (quizId) => {


  try {
    const response = await api.get(`/quizzes/${quizId}/questions`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
  }
};


export const addQuestion = async (quizId, questionText) => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    console.error('No auth token found');
    return;
  }

  try {
    const response = await api.post(`/quizzes/${quizId}/questions`, {
      questionText
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add question:', error);
  }
};

export const updateQuestion = async (quizId, questionId, questionText) => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    console.error('No auth token found');
    return;
  }

  try {
    const response = await api.put(`/quizzes/${quizId}/questions/${questionId}`, {
      questionText, quiz_id: quizId
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update question:', error);
  }
};


export const deleteQuestion = async (quizId, questionId) => {
  const token = localStorage.getItem('token'); 
  if (!token) {
    console.error('No auth token found');
    return;
  }

  try {
    const response = await api.delete(`/quizzes/${quizId}/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete question:', error);
  }
};


// Fetch all answers for a question
export const getQuestionAnswers = async (quizId, questionId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No auth token found');
    return;
  }

  try {
    const response = await api.get(`/quizzes/${quizId}/questions/${questionId}/answers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch answers:', error);
  }
};


// Delete an answer from a question
export const deleteAnswer = async (quizId, questionId, answerId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No auth token found');
    return;
  }

  try {
    const response = await api.delete(`/quizzes/${quizId}/questions/${questionId}/answers/${answerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete answer:', error);
  }
};


// Add a new answer to a question
export const addAnswer = async (quizId, questionId, answerText, isCorrect) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No auth token found');
    return;
  }

  try {
    const response = await api.post(`/quizzes/${quizId}/questions/${questionId}/answers`, {
      question_Answer: answerText,
      is_Correct: isCorrect,
      questions_Id: questionId
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add answer:', error);
  }
};

// Update an existing answer
export const updateAnswer = async (quizId, questionId, answerId, answerText, isCorrect) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No auth token found');
    return;
  }

  try {
    const response = await api.put(`/quizzes/${quizId}/questions/${questionId}/answers/${answerId}`, {
      question_Answer: answerText,
      is_Correct: isCorrect,
      questions_Id: questionId
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update answer:', error);
  }
};
