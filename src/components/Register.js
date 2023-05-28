import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../utils/customHooks/useFormAndValidation.js';
import Header from './Header.js';
import './Register.css';

import FormInput from './FormInput.js';

function Register({
  onRegister
}) {

  const {values, handleChange, errors, isInputValid, isSubmitButtonActive, getInputNames} = useFormAndValidation();

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
      placeholder: "Пароль",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,}$",
      title: "Пароль должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы. Минимальная длина 7 символов."
    }
  ]

  const nameInputs = getInputNames(inputElements);
  const navigate = useNavigate();
  const isMainPage = false;
  const loginRegisterButtonText = "Войти";
  const registerData = {
    password: null,
    email: null
  }

  // функция, формирующая данные для последующего обращения с ними на сервер
  function gatherRegisterData() {
    for (const key in registerData) {
      nameInputs.forEach((el) => {
        if (el.toLowerCase().includes(key.toString())) {
          registerData[key] = values[el];
        }
      })
    }
    return registerData;
  }

  //функция submit формы (обновление пользовательских данных на сервере)
  function handleSubmit(ev) {
    ev.preventDefault();
    const registerData = gatherRegisterData();
    onRegister(registerData);
  }

  function handleSignIn() {
    navigate('/signin', { replace: true });
  }
  return (
    <>
      <Header
        isMainPage={isMainPage}
        loginRegisterButtonText={loginRegisterButtonText}
        handleLoginRegisterButton={handleSignIn}
      />

      <section className="register">
        <form onSubmit={handleSubmit} name="registerForm" className="register__form" noValidate>
          <h2 className="register__title">Регистрация</h2>

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

          <button type="submit" disabled={!isSubmitButtonActive} className={`login__button ${isSubmitButtonActive ? '' : 'login__button_disabled'}`}>Зарегистрироваться</button>
        </form>
        <div className="register__alreadyRegistered">Уже зарегистрированы? <button aria-label="войти" type="button" onClick={handleSignIn} className="register__login-button">Войти</button></div>
      </section>
    </>
  );
}

export default Register;
