import { useLocation, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  BookOpen,
  User,
  LogOut,
  LogIn,
  Users,
  Brain,
  Menu,
} from "lucide-react";
import { useAuth } from "../pages/AuthContext";
import "../styles/Header.css";

const Header = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="discord-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-section">
          <div className="logo-icon">
            <Brain size={24} />
          </div>
          <h1 className="logo-text">MindTussle</h1>
        </div>

        {/* Hamburger */}
        <button className="menu-toggle" onClick={toggleMenu}>
          <Menu size={24} color="white" />
        </button>

        {/* Nav + User */}
        <div className={`nav-user-wrapper ${menuOpen ? "open" : ""}`}>
          <nav className="nav-section">
            <Link to="/study-material" className="nav-link">
              <BookOpen size={16} />
              <span>Study Materials</span>
            </Link>
            <a
              href="https://discord.gg/K4p6FNRV"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Users size={16} />
              <span>Community</span>
            </a>
          </nav>

          <div className="user-section">
            {isLoggedIn ? (
              <div className="user-menu">
                <div className="user-info">
                  <div className="user-avatar">
                    <User size={14} />
                  </div>
                  <span className="username">{username}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                {!isLoginPage && (
                  <Link to="/" className="login-btn">
                    <LogIn size={14} />
                    <span>Login</span>
                  </Link>
                )}
                <Link to="/register" className="register-btn">
                  <User size={14} />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
