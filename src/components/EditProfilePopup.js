import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from './../contexts/CurrentUserContext.js';
import { useContext } from 'react';
import PopupWithForm from './PopupWithForm.js';
import FormInput from './FormInput.js';

import {useInputNames, useToggleButtonActive, useHandleChange} from '../utils/customHooks/validationHooks.js';

function EditProfilePopup({
  isOpen,
  onClose,
  isSubmitLoading,
  onUpdateUser
}) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  // значения для последующего использования при валидации
  const [inputValues, setInputValues] = useState({
    name: {name: "", isInputError: false, errorMessage: ""},
    about: {about: "", isInputError: false, errorMessage: ""},
  })

  // текст кнопки Submit формы
  const submitButtonText = `Сохранить`;

  const inputElements = [
    {
      id: 1,
      type: "text",
      name: "name",
      className: "popup__input popup__input_el_name",
      required: true,
      minLength: "2",
      maxLength: "40",
      placeholder: "Введите имя"
    },
    {
      id: 2,
      type: "text",
      name: "about",
      className: "popup__input popup__input_el_specialty",
      required: true,
      minLength: "2",
      maxLength: "200",
      placeholder: "Введите информацию о себе"
    }
]

  const nameInputs = useInputNames(inputElements);
  const isSubmitButtonActive = useToggleButtonActive(nameInputs, inputValues);
  const handleChange = useHandleChange(inputValues, setInputValues);

// функция установки значений для инпутов из переменных
// хранящие значения глобального контекста currentUser
function setValuesToInputs() {
  setInputValues({
    ...inputValues,
    name: {
      ...inputValues.name,
      name: name
    },
    about: {
      ...inputValues.about,
      about: about
    }
  });
}

//функция submit формы (обновление пользовательских данных на сервере)
function handleSubmit(ev) {
  ev.preventDefault();

  onUpdateUser({
    name: inputValues.name.name,
    about: inputValues.about.about,
  });
}

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  useEffect(() => {
    if (isOpen) {
      setValuesToInputs();
      return () => {
        setValuesToInputs();
      };
    }
  }, [isOpen, onClose]);

  return (
    <PopupWithForm
      name="profileEditForm"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={submitButtonText}
      isSubmitLoading={isSubmitLoading}
      isSubmitButtonActive={isSubmitButtonActive}
      >
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
    </PopupWithForm>
  );
}

export default EditProfilePopup;
