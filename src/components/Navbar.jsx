import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/auth';
import { trackFeatureUsage } from '../lib/analytics';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      trackFeatureUsage('navbar', 'logout');
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">BrainyMath</span>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <div className="navbar-start">
            <Link to="/" className={`navbar-item ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/games" className={`navbar-item ${isActive('/games')}`}>
              Games
            </Link>
            <Link to="/learning" className={`navbar-item ${isActive('/learning')}`}>
              Learning
            </Link>
            {currentUser && (
              <Link to="/dashboard" className={`navbar-item ${isActive('/dashboard')}`}>
                Dashboard
              </Link>
            )}
          </div>

          <div className="navbar-end">
            {currentUser ? (
              <div className="navbar-user">
                <div className="user-dropdown">
                  <button className="user-dropdown-toggle">
                    <span className="user-name">
                      {currentUser.displayName || currentUser.email}
                    </span>
                  </button>
                  <div className="user-dropdown-menu">
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn btn-text">
                  Log In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 