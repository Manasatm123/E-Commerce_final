import React from 'react';
import './NavBar.scss';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Successfully logged out!');
    location.reload();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <span className="navbar__logo-text">Fkart</span>
        <span className="navbar__logo-subtext">Explore <span className="plus">Plus</span></span>
      </div>
      <div className="navbar__search">
        <input
          type="text"
          className="navbar__search-input"
          placeholder="Search for products, brands and more"
        />
        <button className="navbar__search-btn">
          <i className="fas fa-search">Search</i>
        </button>
      </div>
      <div className="navbar__menu">
        {token ? (
          <>
            <div className=" dropdown">
              <button className="dropdown-btn">Account</button>
              <div className="dropdown-content">
                <Link to="/Profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </>
        ) : (
          <a href="/login">
            <span className="navbar__menu-item">Login</span>
          </a>
        )}
        <span className="navbar__menu-item">More</span>
        <span className="navbar__menu-cart">
          <i className="fas fa-shopping-cart"></i> Cart
        </span>
      </div>
    </div>
  );
};

export default NavBar;

