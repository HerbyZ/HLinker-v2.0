import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoutModal } from './logout-modal/LogoutModal';
import './Header.scss';

type HeaderProps = {
  isAuthenticated: boolean;
};

export const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const [headerCollapse, setHeaderCollapse] = useState(false);
  const [logoutModalShown, setLogoutModalShown] = useState(false);

  const collapseHandler = () => {
    setHeaderCollapse(!headerCollapse);
  };

  const collapseStyle = {
    display: headerCollapse ? 'block' : 'none',
  };

  const navbarCollapseHandler = () => {
    setHeaderCollapse(false);
  };

  return (
    <header className="header">
      {logoutModalShown && (
        <LogoutModal closeHandler={() => setLogoutModalShown(false)} />
      )}
      <nav className="nav">
        <div className="main-nav">
          <h5 className="logo">
            <Link to="/">HLinker</Link>
          </h5>
        </div>
        <div className="auth-nav">
          {isAuthenticated ? (
            <ul className="nav-list auth-nav-links">
              <li className="nav-list__item">
                <Link
                  id="logoutLink"
                  to="#logout"
                  onClick={() => setLogoutModalShown(true)}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav-list auth-nav-links">
              <li className="nav-list__item">
                <Link to="/sign-in">Sign in</Link>
              </li>
              <li className="nav-list__item">
                <Link to="/sign-up">Sign up</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <nav className="mobile-nav">
        <h5 className="logo">
          <Link to="/">HLinker</Link>
        </h5>
        <h5 className="navbar-collapse-button" onClick={collapseHandler}>
          Menu
        </h5>
        <div
          className="navbar-collapse"
          style={collapseStyle}
          onClick={navbarCollapseHandler}
        >
          {isAuthenticated ? (
            <ul className="navbar-collapse-links">
              <li className="mobile-nav-link">
                <Link to="/">Home</Link>
              </li>
              <li className="mobile-nav-link">
                <Link to="/links">Your links</Link>
              </li>
              <li className="mobile-nav-link">
                <Link to="#logout" onClick={() => setLogoutModalShown(true)}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-collapse-links">
              <li className="mobile-nav-link">
                <Link to="/">Home</Link>
              </li>
              <li className="mobile-nav-link">
                <Link to="/sign-in">Sign in</Link>
              </li>
              <li className="mobile-nav-link">
                <Link to="/sign-up">Sign up</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};
