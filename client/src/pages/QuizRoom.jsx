import { useEffect, useState } from "react";
import { socket } from "../socket";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import Leaderboard from "../components/Leaderboard";
import { useNavigate } from "react-router-dom";
import "../styles/QuizRoom.css";

export default function QuizRoom() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(
    parseInt(localStorage.getItem("currentQuestionIndex") || "0")
  );
  const [finalScores, setFinalScores] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const roomId = localStorage.getItem("roomId");
  const roomPassword = localStorage.getItem("roomPassword");
  const isCreator = localStorage.getItem("isCreator") === "true";
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDataAndQuestions = async () => {
      try {
        if (!roomId || !username) {
          alert("Missing room or user info, redirecting...");
          navigate("/subjects");
          return;
        }

        // Get room data for quizTime & quizStartTime
        const roomRes = await axios.post(
          "https://mindtussle-server.onrender.com/api/room/join",
          { roomId, password: roomPassword },
          { headers: { Authorization: localStorage.getItem("token") } }
        );

        const { quizTime, quizStartTime, subject: roomSubject } = roomRes.data;

        localStorage.setItem("quizTime", quizTime.toString());
        localStorage.setItem("selectedSubject", roomSubject);

        // Preserve quizStartTime across refresh:
        let storedStartTime = localStorage.getItem("quizStartTime");
        if (!storedStartTime) {
          localStorage.setItem("quizStartTime", quizStartTime.toString());
          storedStartTime = quizStartTime.toString();
        }

        const elapsed = Math.floor(
          (Date.now() - parseInt(storedStartTime)) / 1000
        );
        const remaining = quizTime * 60 - elapsed;
        setTimeLeft(remaining > 0 ? remaining : 0);

        const questionsRes = await axios.get(
          `https://mindtussle-server.onrender.com/api/questions/${encodeURIComponent(roomSubject)}`,
          { headers: { Authorization: localStorage.getItem("token") } }
        );

        if (questionsRes.data.length === 0) {
          alert("No questions found for this subject.");
          navigate("/subjects");
        } else {
          setQuestions(questionsRes.data);
        }
      } catch (err) {
        console.error("Error fetching room/questions:", err);
        alert("Error fetching room/questions, redirecting...");
        navigate("/subjects");
      }
    };

    fetchRoomDataAndQuestions();
  }, [navigate, roomId, roomPassword, username]);

  // Timer management
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleEndQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEndQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Socket join and leaderboard
  useEffect(() => {
    if (!roomId || !username) return;

    socket.emit("join-room", { roomId, username });

    socket.on("final-scores", (scores) => {
      setFinalScores(scores);
      localStorage.setItem("quizEnded", "true");
    });

    return () => {
      socket.off("final-scores");
    };
  }, [roomId, username]);

  const handleAnswer = (index) => {
    const currentQuestion = questions[current];
    const isCorrect = index === currentQuestion.answer;
    socket.emit("submit-answer", { roomId, username, isCorrect });

    if (current + 1 < questions.length) {
      const next = current + 1;
      setCurrent(next);
      localStorage.setItem("currentQuestionIndex", next.toString());
    } else {
      setCurrent(questions.length);
      localStorage.setItem("currentQuestionIndex", questions.length.toString());
    }
  };

  const handleEndQuiz = () => {
    socket.emit("end-quiz", roomId);
    setFinalScores("ended");
    localStorage.setItem("quizEnded", "true");
  };

  const handleQuit = () => {
    localStorage.removeItem("quizStartTime");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("quizEnded");
    localStorage.removeItem("quizTime");
    localStorage.removeItem("selectedSubject");
    navigate("/subjects");
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (questions.length === 0) {
    return <p>Loading Questions...</p>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <div className="quiz-header">
          {isCreator && (
            <div className="room-info-box">
              <h3>🪪 Room Information</h3>
              <p>
                <strong>Room ID:</strong> {roomId}
              </p>
              {roomPassword && (
                <p>
                  <strong>Password:</strong> {roomPassword}
                </p>
              )}
            </div>
          )}
          <div className="timer-box">
            ⏰ Time Left: {formatTime(timeLeft ?? 0)}
          </div>
        </div>

        {!finalScores ? (
          current < questions.length ? (
            <>
              <div className="quiz-progress">
                <div className="progress-text">
                  Question {current + 1} of {questions.length}
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${((current + 1) / questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <QuestionCard
                question={questions[current]}
                onAnswer={handleAnswer}
              />
            </>
          ) : (
            <div className="waiting-box">
              🎉 You have completed all questions! <br />⏳ Waiting for the quiz
              to end...
            </div>
          )
        ) : (
          <>
            <Leaderboard scores={finalScores} />
            <div className="action-buttons">
              <button className="quit-btn" onClick={handleQuit}>
                🚪 Quit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
