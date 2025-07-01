// src/pages/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", user);
    setIsLoggedIn(true);
    setUsername(user);
  };

  const logout = () => {
    // ✅ Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // ✅ Clear ALL quiz-related data to prevent stale continuation
    localStorage.removeItem("roomId");
    localStorage.removeItem("roomPassword");
    localStorage.removeItem("isCreator");
    localStorage.removeItem("selectedSubject");
    localStorage.removeItem("quizTime");
    localStorage.removeItem("quizStartTime"); // ✅ clear quizStartTime
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("quizEnded");

    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ For cleaner usage in components
export const useAuth = () => useContext(AuthContext);
