import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.js';
import './Login.css';

import FormInput from './FormInput.js';

import { useInputNames, useToggleButtonActive, useHandleChange } from '../utils/customHooks/validationHooks.js';

function Login({ onLogin, currentUserEmail }) {

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
  const isMainPage = false;
  const loginRegisterButtonText = "Регистрация";
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
    return loginData;
  }

  //функция submit формы (обновление пользовательских данных на сервере)
  function handleSubmit(ev) {
    ev.preventDefault();
    if (isEmptyValues()) {
      return;
    }
    const loginData = gatherLoginData();
    onLogin(loginData, clearInputs);
  }

  function handleSignUp() {
    navigate('/signup', { replace: true });
  }

  return (
    <>
      <Header
      isMainPage={isMainPage}
      loginRegisterButtonText={loginRegisterButtonText}
      handleLoginRegisterButton={handleSignUp}
      currentUserEmail={currentUserEmail}
      />

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
