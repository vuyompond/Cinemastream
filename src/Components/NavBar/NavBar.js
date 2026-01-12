import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="highlight">Cinema</span>Stream
      </div>

      <div className="navbar-items">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/movies" className="navbar-item">Movies</Link>
        <Link to="/series" className="navbar-item">Series</Link>
      </div>
    </nav>
  );
}

export default NavBar;
