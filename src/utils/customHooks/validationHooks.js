import React, { useState, useEffect } from 'react';

// получение значения имен инпутов
export const useInputNames = (inputElements) => {
  const nameInputs = inputElements.map((input) => {
    return input.name;
  });
  return nameInputs;
}

// функция установки активного состояния кнопки Submit
// в зависимости от наличия ошибок валидации инпутов
export const useToggleButtonActive = (nameInputs, inputValues) => {
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false);

  function togleButtonActive(isInputErorsArray) {
    if ([...new Set(isInputErorsArray)].length == 1 && isInputErorsArray[0] === true) {
      setIsSubmitButtonActive(false);
    } else if ([...new Set(isInputErorsArray)].length == 1 && isInputErorsArray[0] === false) {
      setIsSubmitButtonActive(true);
    } else {
      setIsSubmitButtonActive(false);
    }
  };

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

  return isSubmitButtonActive;
}

// функция, исполняемая при вводе пользователем значений в inputs
// (проверка inputs на валидность, обновление inputValues)
export const useHandleChange = (inputValues, setInputValues) => {

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


  return function handleChange(ev, input) {
    let isError = false;
    let errorMessage = "";

    if (input.type === "text") {
      if (ev.target.value && ev.target.value.length < input.minLength) {
        isError = true;
        errorMessage = `Пожалуйста, используйте не менее ${input.minLength} символов (сейчас вы используете ${ev.target.value.length} символов).`;
      } else if (!ev.target.value) {
        isError = true;
        errorMessage = `Пожалуйста, заполните это поле.`;
      }
    } else if (input.type === "url") {

      if (!ev.target.value) {
        isError = true;
        errorMessage = `Пожалуйста, заполните это поле.`;
      } else if (isValidWebUrl(ev.target.value)) {
        isError = false;
        errorMessage = "";
      } else {
        isError = true;
        errorMessage = `Пожалуйста, введите URL.`;
      }
    }
    handleInputValuesChange(ev, isError, errorMessage);
  }
}

export const useClearInputs = ({
  isOpen,
  onClose,
  inputValues,
  setInputValues
}) => {

  function clearInputs() {
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

  useEffect(() => {
    if (!isOpen) {
      clearInputs();
    }
  }, [isOpen, onClose]);

}
