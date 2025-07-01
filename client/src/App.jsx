import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubjectSelect from "./pages/SubjectSelect";
import QuizRoom from "./pages/QuizRoom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import StudyMaterial from "./pages/StudyMaterial";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/subjects"
            element={
              <PrivateRoute>
                <SubjectSelect />
              </PrivateRoute>
            }
          />
          <Route path="/study-material" element={<StudyMaterial />} />
          <Route
            path="/quiz/:roomId"
            element={
              <PrivateRoute>
                <QuizRoom />
              </PrivateRoute>
            }
          />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
