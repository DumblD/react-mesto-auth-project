import React , { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import FormInput from './FormInput.js';

function AddPlacePopup({
  isOpen,
  onClose,
  isSubmitLoading,
  onAddPlace
}) {

  // значения для последующего использования при валидации
  const [inputValues, setInputValues] = useState({
    name: { name: "", isInputError: false, errorMessage: "" },
    link: { link: "", isInputError: false, errorMessage: "" },
  })

  // текст кнопки Submit формы
  const submitButtonText = `Сохранить`;
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false);

  // используемые данные для инпутов в AddPlacePopup
  const inputElements = [
    {
      id: 1,
      type: "text",
      name: "name",
      className: "popup__input popup__input_el_place-title",
      required: true,
      minLength: "2",
      maxLength: "30",
      placeholder: "Название"
    },
    {
      id: 2,
      type: "url",
      name: "link",
      className: "popup__input popup__input_el_place-link",
      required: true,
      placeholder: "Ссылка на картинку"
    }
  ]

  // получение значения имен инпутов
  const nameInputs = inputElements.map((input) => {
    return input.name;
  });

  // функция установки значений для инпутов из переменных
  // хранящие значения глобального контекста currentUser
  function cleareInputs() {
    setInputValues({
      ...inputValues,
      name: {
        ...inputValues.name,
        name: "",
        isInputError: false,
        errorMessage: ""
      },
      link: {
        ...inputValues.link,
        link: "",
        isInputError: false,
        errorMessage: ""
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

  // функция проверки url на валидность
  function isValidWebUrl(url) {
    let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return regEx.test(url);
 }

  // функция, исполняемая при вводе пользователем значений в inputs
  // (проверка inputs на валидность, обновление inputValues)
  function handleChange(ev, input) {
    let isError = false;
    let errorMessage = "";
    setIsSubmitButtonActive(true);

    if (input.type === "text") {
      if (ev.target.value && ev.target.value.length < input.minLength) {
        isError = true;
        setIsSubmitButtonActive(false);
        errorMessage = `Пожалуйста, используйте не менее ${input.minLength} символов (сейчас вы используете ${ev.target.value.length} символов).`;
      } else if (!ev.target.value) {
        isError = true;
        setIsSubmitButtonActive(false);
        errorMessage = `Пожалуйста, заполните это поле.`;
      }
    } else if (input.type === "url") {

      if (!ev.target.value) {
        isError = true;
        setIsSubmitButtonActive(false);
        errorMessage = `Пожалуйста, заполните это поле.`;
      } else if (isValidWebUrl(ev.target.value)) {
        isError = false;
        setIsSubmitButtonActive(true);
        errorMessage = "";
      } else {
        isError = true;
        setIsSubmitButtonActive(false);
        errorMessage = `Пожалуйста, введите URL.`;
      }
    }

    handleInputValuesChange(ev, isError, errorMessage);
  }

  function handleAddPlaceSubmit(ev) {
    ev.preventDefault();

    onAddPlace({
      name: inputValues.name.name,
      link: inputValues.link.link
    })
  }

  useEffect(() => {
    if (!isOpen) {
      cleareInputs();
    }
  }, [isOpen, onClose]);

  useEffect (() => {
    const inputErrorState = nameInputs.map((el) => {
      return inputValues[el].isInputError;
    });

    const isAnyInputEmpty = nameInputs.map((el) => {
      return inputValues[el][el];
    }).some((el) => {
      return el === '';
    })

    if (isAnyInputEmpty) {
      setIsSubmitButtonActive(false);
    } else {
      togleButtonActive(inputErrorState);
    }
  }, [inputValues]);

  return (
    <PopupWithForm
      name="placeAddForm"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
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
      <button type="submit" disabled={!isSubmitButtonActive} className={`popup__button ${isSubmitButtonActive? '': 'popup__button_disabled'}`}>{isSubmitLoading? `${submitButtonText}…` : submitButtonText}</button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
