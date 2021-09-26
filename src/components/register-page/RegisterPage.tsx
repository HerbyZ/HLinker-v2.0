import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import './RegisterPage.scss';

export const RegisterPage: React.FC = () => {
  // State
  type formDataType = { [key: string]: string };
  const [formData, setFormData] = useState<formDataType>({
    email: '',
    password: '',
  });
  const [policyAccept, setPolicyAccept] = useState(false);
  const [formError, setFormError] = useState('');

  const { request, loading } = useHttp();
  const { login } = useContext(AuthContext);

  const validateForm = (data: formDataType) => {
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

  const changeHandler = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const newForm = formData;
    newForm[currentTarget.name] = currentTarget.value;

    validateForm(newForm);

    setFormData(newForm);
  };

  const checkboxHandler = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPolicyAccept(currentTarget.checked);
  };

  const signUpHandler = async () => {
    let response;

    try {
      response = await request('auth/register', 'POST', formData);
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
              onChange={changeHandler}
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
              onChange={changeHandler}
            />
          </div>
          <div className="form-field">
            <input
              type="checkbox"
              id="privacyPolicyCheckbox"
              onChange={checkboxHandler}
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
              disabled={!!formError || loading || !policyAccept || !formData}
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
