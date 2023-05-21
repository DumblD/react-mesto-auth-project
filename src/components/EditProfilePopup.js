import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from './../contexts/CurrentUserContext.js';
import { useContext } from 'react';
import PopupWithForm from './PopupWithForm.js';
import FormInput from './FormInput.js';

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
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false);

  // используемые данные для инпутов в EditProfilePopup
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

// получение значения имен инпутов
const nameInputs = inputElements.map((input) => {
  return input.name;
});

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

// функция установки активного состояния кнопки Submit
// в зависимости от наличия ошибок валидации инпутов
function togleButtonActive(isInputErorsArray) {
  if ([...new Set(isInputErorsArray)].length == 1 && isInputErorsArray[0] === true) {
    setIsSubmitButtonActive(false);
  } else if ([...new Set(isInputErorsArray)].length == 1 && isInputErorsArray[0] === false) {
    setIsSubmitButtonActive(true);
  } else {
    setIsSubmitButtonActive(false);
  }
};

// функция обновления inputValues значениями, вводимыми пользователем в inputs
function handleInputValuesChange(ev, isError, errorMessage) {
  setInputValues({
    ...inputValues,
    [ev.target.name]: {
      ...inputValues[ev.target.name],
      [ev.target.name]: ev.target.value,
      isInputError: isError,
      errorMessage: errorMessage
    }
  });
}

// функция, исполняемая при вводе пользователем значений в inputs
// (проверка inputs на валидность, обновление inputValues)
function handleChange(ev, input) {
  let isError = false;
  let errorMessage = "";
  setIsSubmitButtonActive(true);
  if (ev.target.value && ev.target.value.length < input.minLength) {
    isError = true;
    setIsSubmitButtonActive(false);
    errorMessage = `Пожалуйста, используйте не менее ${input.minLength} символов (сейчас вы используете ${ev.target.value.length} символов).`;
  } else if (!ev.target.value) {
    isError = true;
    setIsSubmitButtonActive(false);
    errorMessage = `Пожалуйста, заполните это поле.`;
  }
  handleInputValuesChange(ev, isError, errorMessage);
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

useEffect (() => {
  const inputErrorState = nameInputs.map((el) => {
    return inputValues[el].isInputError;
  });

  togleButtonActive(inputErrorState);
}, [inputValues]);

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
