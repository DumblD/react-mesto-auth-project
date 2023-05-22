import React , { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import FormInput from './FormInput.js';

import {useInputNames, useToggleButtonActive, useHandleChange, useClearInputs} from '../utils/customHooks/validationHooks.js';

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
  const nameInputs = useInputNames(inputElements);

  // функция установки активного состояния кнопки Submit
  // в зависимости от наличия ошибок валидации инпутов
  const isSubmitButtonActive = useToggleButtonActive(nameInputs, inputValues);
  const handleChange = useHandleChange(inputValues, setInputValues);
  const clearInputs = useClearInputs({
    isOpen,
    onClose,
    inputValues,
    setInputValues
  });

  function handleAddPlaceSubmit(ev) {
    ev.preventDefault();

    onAddPlace({
      name: inputValues.name.name,
      link: inputValues.link.link
    })
  }

  return (
    <PopupWithForm
      name="placeAddForm"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
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

export default AddPlacePopup;
