import React , { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import FormInput from './FormInput.js';

import { useFormAndValidation } from '../utils/customHooks/useFormAndValidation.js';

function AddPlacePopup({
  isOpen,
  onClose,
  isSubmitLoading,
  onAddPlace
}) {

  const {values, handleChange, errors, isInputValid, resetForm, isSubmitButtonActive} = useFormAndValidation();

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

  const clearInputs = () => {
    resetForm();
  }

  function handleAddPlaceSubmit(ev) {
    ev.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link
    })
  }

  useEffect(() => {
    clearInputs();
  }, [isOpen]);

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
            value={values[input.name] || ""}
            inputElement={input}
            isInputValid={isInputValid[input.name]}
            errorMessageText={errors[input.name]}
            onChange={handleChange} />
        ))
      }
    </PopupWithForm>
  );
}

export default AddPlacePopup;
