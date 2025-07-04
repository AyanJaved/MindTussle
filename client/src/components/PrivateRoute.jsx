// src/components/PrivateRoute.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/"); // redirect to login if not logged in
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default PrivateRoute;
