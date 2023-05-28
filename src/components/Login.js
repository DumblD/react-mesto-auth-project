import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../utils/customHooks/useFormAndValidation.js';
import Header from './Header.js';
import './Login.css';

import FormInput from './FormInput.js';

function Login({ onLogin, currentUserEmail }) {

  const {values, handleChange, errors, isInputValid, resetForm, isSubmitButtonActive, getInputNames} = useFormAndValidation();

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
      placeholder: "Пароль",
      minLength: "7"
    }
  ]

  const nameInputs = getInputNames(inputElements);
  const clearInputs = () => {
    resetForm();
  }
  const navigate = useNavigate();
  const isMainPage = false;
  const loginRegisterButtonText = "Регистрация";
  const loginData = {
    password: null,
    email: null
  }

  // функция, формирующая данные для последующего обращения с ними на сервер
  function gatherLoginData() {
    for (const key in loginData) {
      nameInputs.forEach((el) => {
        if (el.toLowerCase().includes(key.toString())) {
          loginData[key] = values[el];
        }
      })
    }
    return loginData;
  }

  //функция submit формы (обновление пользовательских данных на сервере)
  function handleSubmit(ev) {
    ev.preventDefault();
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
                value={values[input.name] || ""}
                inputElement={input}
                isInputValid={isInputValid[input.name]}
                errorMessageText={errors[input.name]}
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
