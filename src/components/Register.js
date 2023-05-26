import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import headerLogoImg from './../images/logo.svg';
import * as auth from './../utils/auth.js';
import './Register.css';

import FormInput from './FormInput.js';
import InfoTooltip from './InfoTooltip.js';

import { useInputNames, useToggleButtonActive, useHandleChange } from '../utils/customHooks/validationHooks.js';

function Register() {

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isRegisterInfoPopupOpen, setIsRegisterInfoPopupOpen] = useState(false);

  function closeInfoPopup() {
    setIsRegisterInfoPopupOpen(false);
  }

  const [inputValues, setInputValues] = useState({
    registerEmail: { registerEmail: "", isInputError: false, errorMessage: "" },
    registerPassword: { registerPassword: "", isInputError: false, errorMessage: "" },
  });

  const inputElements = [
    {
      id: 1,
      type: "email",
      name: "registerEmail",
      className: "register__input register__input_el_register-Email",
      required: true,
      minLength: "2",
      maxLength: "40",
      placeholder: "Email"
    },
    {
      id: 2,
      type: "password",
      name: "registerPassword",
      className: "register__input register__input_el_register-password",
      required: true,
      minLength: "7",
      maxLength: "50",
      placeholder: "Пароль"
    }
  ]

  const nameInputs = useInputNames(inputElements);
  const isSubmitButtonActive = useToggleButtonActive(nameInputs, inputValues);
  const handleChange = useHandleChange(inputValues, setInputValues);
  const navigate = useNavigate();
  const registerData = {
    password: null,
    email: null
  }

  // функция, формирующая данные для последующего обращения с ними на сервер
  function gatherRegisterData() {
    for (const key in registerData) {
      nameInputs.forEach((el) => {
        if (el.toLowerCase().includes(key.toString())) {
          registerData[key] = inputValues[el][el];
        }
      })
    }
  }

  //функция submit формы (обновление пользовательских данных на сервере)
  function handleSubmit(ev) {
    ev.preventDefault();
    gatherRegisterData();
    auth.register(registerData)
      .then((data) => {
        if (data) {
          setIsRegisterSuccess(true);
          setIsRegisterInfoPopupOpen(true);
        } else {
          setIsRegisterSuccess(false);
          setIsRegisterInfoPopupOpen(true);
        }
      }).catch(err => console.log(err));
  }

  function handleSignIn() {
    navigate('/signin', { replace: true });
  }
  return (
    <>
      <header className="header-register">
        <div className="logo header-register__logo">
          <img src={headerLogoImg} alt="лого Место-Россия" className="logo__img" />
        </div>
        <div className="header-register__login">
          <button aria-label="войти" type="button" onClick={handleSignIn} className="header-register__login-button">Войти</button>
        </div>
      </header>

      <section className="register">
        <form onSubmit={handleSubmit} name="registerForm" className="register__form" noValidate>
          <h2 className="register__title">Регистрация</h2>

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

          <button type="submit" disabled={!isSubmitButtonActive} className={`login__button ${isSubmitButtonActive ? '' : 'login__button_disabled'}`}>Зарегисрироваться</button>
        </form>
        <div className="register__alreadyRegistered">Уже зарегистрированы? <button aria-label="войти" type="button" onClick={handleSignIn} className="register__login-button">Войти</button></div>
      </section>
      <InfoTooltip isOpen={isRegisterInfoPopupOpen} onClose={closeInfoPopup} isRegisterSuccess={isRegisterSuccess} />
    </>
  );
}

export default Register;
