import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SubjectSelect.css";

const SubjectSelect = () => {
  const [roomAction, setRoomAction] = useState(""); // "create" or "join"
  const [subject, setSubject] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  const navigate = useNavigate();

  const handleAction = async () => {
    try {
      if (roomAction === "create") {
        if (!subject) return alert("Please select a subject.");
        if (!selectedTime) return alert("Please select quiz time.");
        if (!roomPassword) return alert("Please set a room password.");

        const res = await axios.post(
          "https://mindtussle-server.onrender.com/api/room/create"
,
          {
            subject,
            password: roomPassword,
            creator: localStorage.getItem("username"),
            quizTime: parseInt(selectedTime),
          },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        // Save room details for creator
        localStorage.setItem(
          "quizStartTime",
          res.data.quizStartTime.toString()
        );
        localStorage.setItem("roomId", res.data.roomId);
        localStorage.setItem("roomPassword", res.data.password);
        localStorage.setItem("selectedSubject", subject);
        localStorage.setItem("quizTime", selectedTime);
        localStorage.setItem("isCreator", "true");
        

        navigate(`/quiz/${res.data.roomId}`);
      } else if (roomAction === "join") {
        if (!roomId || !roomPassword) {
          return alert("Please enter Room ID and Password.");
        }

        const res = await axios.post(
          "http://localhost:5000/api/room/join",
          {
            roomId,
            password: roomPassword,
          },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        // Save server-provided subject and quizTime for sync
        localStorage.setItem("roomId", roomId);
        localStorage.setItem("roomPassword", roomPassword);
        localStorage.setItem("selectedSubject", res.data.subject);
        localStorage.setItem("quizTime", res.data.quizTime.toString());
        localStorage.setItem("isCreator", "false");

        navigate(`/quiz/${roomId}`);
      } else {
        alert("Please select whether to Create or Join a room first.");
      }
    } catch (err) {
      console.error(err);
      alert(
        "Error: " +
          (err.response?.data?.error || err.response?.data || err.message)
      );
    }
  };

  return (
    <div className="subject-container">
      <h2 className="subject-heading">Create or Join a Room</h2>

      <div className="subject-action-buttons">
        <button
          className={`subject-action-btn ${roomAction === "create" ? "active" : ""}`}
          onClick={() => setRoomAction("create")}
        >
          Create Room
        </button>
        <button
          className={`subject-action-btn ${roomAction === "join" ? "active" : ""}`}
          onClick={() => setRoomAction("join")}
        >
          Join Room
        </button>
      </div>

      {roomAction === "create" && (
        <>
          <h3>Select Subject</h3>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="subject-select"
          >
            <option value="">-- Select a Subject --</option>
            <option value="Operating System">Operating System</option>
            <option value="DBMS">DBMS</option>
            <option value="Computer Networks">Computer Networks</option>
            <option value="OOPS">OOPS</option>
          </select>

          <h3>Select Quiz Time</h3>
          <div className="time-options">
            {["3", "5", "10"].map((time) => (
              <button
                key={time}
                className={selectedTime === time ? "selected" : ""}
                onClick={() => setSelectedTime(time)}
              >
                {time} Min
              </button>
            ))}
          </div>

          <input
            placeholder="Set Room Password"
            value={roomPassword}
            onChange={(e) => setRoomPassword(e.target.value)}
            className="subject-input"
          />
        </>
      )}

      {roomAction === "join" && (
        <>
          <h3>Enter Room Details</h3>
          <input
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="subject-input"
          />
          <input
            placeholder="Enter Room Password"
            value={roomPassword}
            onChange={(e) => setRoomPassword(e.target.value)}
            className="subject-input"
          />
        </>
      )}

      {roomAction && (
        <button onClick={handleAction} className="subject-submit-btn">
          {roomAction === "create"
            ? "Create Room & Start Quiz"
            : "Join Room & Start Quiz"}
        </button>
      )}
    </div>
  );
};

export default SubjectSelect;
