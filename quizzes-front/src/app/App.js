import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import QuizzesPage from "../pages/quizzes";
import EndQuizPage from "../pages/endquiz";
import TakeQuizPage from "../pages/takequiz";
import MyQuizzesPage from "../pages/myquizzes";
import EditQuizPage from "../pages/editquiz";
import AddQuizPage from "../pages/addquiz";
import QuizQuestionsEditPage from "../pages/editquestions";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/takequiz/:id" element={<TakeQuizPage />} />
        <Route path="/endquiz" element={<EndQuizPage />} />
        <Route path="/myquizzes" element={<MyQuizzesPage />} />
        <Route path="/editquiz/:id" element={<EditQuizPage />} />
        <Route path="/addquiz" element={<AddQuizPage />} />
        <Route path="/editquestions/:id" element={<QuizQuestionsEditPage />} />
        </Routes>
      </BrowserRouter>
 
    </>
  );
}

export default App;
