import React from 'react';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="home-page-content">
          <h1>HLinker v2</h1>
          <h2>Portfolio project made in React with Typescript</h2>
          <small className="text-secondary other-branches-hint">
            Don't forget to check other branches on{' '}
            <a href="https://github.com/HerbyZ/HLinker-v2.0">GitHub</a>
          </small>
          <br />
          <a className="sign-up-link" href="/sign-up">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};
