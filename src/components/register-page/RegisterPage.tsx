import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import './RegisterPage.scss';

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [policyAccept, setPolicyAccept] = useState(false);
  const [formError, setFormError] = useState('');

  const { request, loading } = useHttp();
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

    if (!policyAccept) {
      return 'You should accept privacy policy';
    }
  };

  const signUpHandler = async () => {
    const error = validateForm();
    if (error) {
      return setFormError(error);
    }

    setFormError('');

    let response;

    try {
      response = await request('auth/register', 'POST', { email, password });
    } catch {
      return setFormError('Something went wrong or your data is incorrect');
    }

    const data = response.data;

    login(data.accessToken, data.userId);
  };

  return (
    <div className="register-page">
      <div className="register-window">
        <h1>Sign up</h1>
        <form autoComplete="off">
          <div className="form-field">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="emailInput"
              onChange={({ target }) => setEmail(target.value)}
            />
            <small className="text-secondary">
              We never share your data with somebody.
            </small>
          </div>
          <div className="form-field">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="passwordInput"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div className="form-field">
            <input
              type="checkbox"
              id="privacyPolicyCheckbox"
              onChange={({ target }) => setPolicyAccept(target.checked)}
            />
            <label htmlFor="privacyPolicyCheckbox">
              I accept the <a href="#privacyPolicy">privacy policy</a> of
              HLinker.
            </label>
          </div>
          {formError && (
            <div className="error-block">
              <p className="text-danger">{formError}</p>
            </div>
          )}
          <div className="form-field">
            <button
              className="btn btn-primary btn-block"
              id="signUpButton"
              disabled={loading}
              onClick={signUpHandler}
            >
              Sign up!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
