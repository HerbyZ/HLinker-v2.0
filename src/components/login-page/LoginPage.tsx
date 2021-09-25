import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import './LoginPage.scss';

export const LoginPage: React.FC = () => {
  // State
  type formDataType = { [key: string]: string };
  const [formData, setFormData] = useState<formDataType>({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');

  const { request, loading } = useHttp();
  const { login } = useContext(AuthContext);

  const validateForm = (data: formDataType): void => {
    const email = data['email'];
    const password = data['password'];

    if (!email || !password) {
      return setFormError('All fields are required');
    }

    const emailRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!emailRegex.test(email)) {
      return setFormError('Incorrect email');
    }

    if (password.length < 8) {
      return setFormError('Password is too short');
    }

    setFormError('');
  };

  const inputChangeHandler = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const newData = formData;
    newData[currentTarget.name] = currentTarget.value;

    validateForm(newData);

    setFormData(newData);
  };

  const signInHandler = async () => {
    let response;

    try {
      response = await request('auth/login', 'POST', formData);
    } catch {
      return setFormError('Invalid email or password');
    }

    const data = response.data;
    login(data.accessToken, data.userId);
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
              onChange={inputChangeHandler}
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
              onChange={inputChangeHandler}
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
              disabled={loading || !!formError || !formData}
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
