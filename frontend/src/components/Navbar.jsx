import React from "react";
import { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isAuth, isSetAuth] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("userId")) {
      isSetAuth(true);
    }
  }, []);
  const handleLogout = () => {
    window.localStorage.clear();
    isSetAuth(false);
  };
  return (
    <nav className="main">
      <div className="container">
        <div className="logo">Codesaver</div>
        <div className="tabs">
          <ul>
            <li>
              <Link to="/">ALL</Link>
            </li>
            <li>
              <Link to="/my-solutions">YOUR</Link>
            </li>
            <li>
              <Link to="/solutions/add">ADD</Link>
            </li>
          </ul>
        </div>
        <div>
          {!isAuth && (
            <div className="right">
              <button className="log">
                <Link to="/auth">Login</Link>
              </button>
              <button className="reg">
                <Link to="/auth">Signup</Link>
              </button>
            </div>
          )}
          {isAuth && (
            <div className="after-signin">
              <button className="reg" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
