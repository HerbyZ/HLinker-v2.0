import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AuthService } from '../../services/auth.service';
import './LoginPage.scss';

export const LoginPage: React.FC = () => {
  const [formError, setFormError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const validateForm = (): string | void => {
    if (!email || !password) {
      return 'All fields are required';
    }

    const emailRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!emailRegex.test(email)) {
      return 'Incorrect email';
    }

    if (password.length < 8) {
      return 'Password is too short';
    }
  };

  const signInHandler = async () => {
    const error = validateForm();
    if (error) {
      return setFormError(error);
    }

    setFormError('');

    setLoading(true);

    await AuthService.login(email, password)
      .catch((error) => {
        setLoading(false);
        setFormError(error.message);
      })
      .then((data) => {
        if (data) {
          setLoading(false);
          login(data.accessToken, data.userId);

          window.location.href = '/';
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-window">
        <h1 id="singInHeader">Sign into HLinker</h1>
        <form className="login-form">
          <div className="form-field">
            <label className="form-label" htmlFor="emailInput">
              Email
            </label>
            <input
              className="form-control"
              type="text"
              id="emailInput"
              name="email"
              placeholder="example.email@domen.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              id="passwordInput"
              type="password"
              name="password"
              placeholder="Your password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {formError && (
            <div className="error-block">
              <p className="text-danger">{formError}</p>
            </div>
          )}
          <div className="form-field">
            <button
              className="btn btn-primary btn-block"
              id="signInButton"
              disabled={loading}
              onClick={signInHandler}
            >
              Sign in!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
