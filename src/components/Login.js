import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import headerLogoImg from './../images/logo.svg';
import * as auth from './../utils/auth.js';
import './Login.css';

import FormInput from './FormInput.js';

import { useInputNames, useToggleButtonActive, useHandleChange } from '../utils/customHooks/validationHooks.js';

function Login({ handleLogin }) {

  const [inputValues, setInputValues] = useState({
    loginEmail: { loginEmail: "", isInputError: false, errorMessage: "" },
    loginPassword: { loginPassword: "", isInputError: false, errorMessage: "" },
  });

  const inputElements = [
    {
      id: 1,
      type: "email",
      name: "loginEmail",
      className: "login__input login__input_el_login-Email",
      required: true,
      minLength: "2",
      maxLength: "40",
      placeholder: "Email"
    },
    {
      id: 2,
      type: "password",
      name: "loginPassword",
      className: "login__input login__input_el_login-password",
      required: true,
      minLength: "7",
      maxLength: "20",
      placeholder: "Пароль"
    }
  ]

  const nameInputs = useInputNames(inputElements);
  const isSubmitButtonActive = useToggleButtonActive(nameInputs, inputValues);
  const handleChange = useHandleChange(inputValues, setInputValues);
  const navigate = useNavigate();
  const loginData = {
    password: null,
    email: null
  }

  // функция проверки на пустые значения
  function isEmptyValues() {
    const isAnyEmpty = nameInputs.map((el) => {
      return inputValues[el].el;
    }).some((el) => {
      return el === '';
    });
    return isAnyEmpty;
  }

  function clearInputs() {
    setInputValues({
      ...inputValues,
      loginEmail: {
        ...inputValues.loginEmail,
        loginEmail: "",
        isInputError: false,
        errorMessage: ""
      },
      loginPassword: {
        ...inputValues.loginPassword,
        loginPassword: "",
        isInputError: false,
        errorMessage: ""
      }
    });
  }

  // функция, формирующая данные для последующего обращения с ними на сервер
  function gatherLoginData() {
    for (const key in loginData) {
      nameInputs.forEach((el) => {
        if (el.toLowerCase().includes(key.toString())) {
          loginData[key] = inputValues[el][el];
        }
      })
    }
  }

  //функция submit формы (обновление пользовательских данных на сервере)
  function handleSubmit(ev) {
    ev.preventDefault();
    if (isEmptyValues()) {
      return;
    }
    gatherLoginData();
    auth.authorize(loginData)
      .then((data) => {
        if (data) {
          if (data.token) {
            clearInputs();
            handleLogin();
            navigate('/', { replace: true });
          }
        }
        return;
      })
      .catch(err => {
        console.log(err);
        alert('Что-то пошло не так.');
      });
  }

  function handleSignUp() {
    navigate('/signup', { replace: true });
  }

  return (
    <>
      <header className="header-login">
        <div className="logo header-login__logo">
          <img src={headerLogoImg} alt="лого Место-Россия" className="logo__img" />
        </div>
        <div className="header-login__register">
          <button aria-label="зарегистрироваться" type="button" onClick={handleSignUp} className="header-login__register-button">Регистрация</button>
        </div>
      </header>

      <section className="login">
        <form onSubmit={handleSubmit} name="loginForm" className="login__form" noValidate>
          <h2 className="login__title">Вход</h2>
          {
            inputElements.map((input) => (
              <FormInput key={input.id}
                {...input}
                value={inputValues[input.name][input.name] || ""}
                inputElement={input}
                isValidationError={inputValues[input.name].isInputError}
                errorMessageText={inputValues[input.name].errorMessage}
                onChange={handleChange} />
            ))
          }
          <button type="submit" disabled={!isSubmitButtonActive} className={`login__button ${isSubmitButtonActive ? '' : 'login__button_disabled'}`}>Войти</button>
        </form>
      </section>
    </>
  );
}

export default Login;
