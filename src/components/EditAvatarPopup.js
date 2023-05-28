import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import FormInput from './FormInput.js';
import { useFormAndValidation } from '../utils/customHooks/useFormAndValidation.js';

function EditProfilePopup({
  isOpen,
  onClose,
  isSubmitLoading,
  onUpdateAvatar
}) {

  // текст кнопки Submit формы
  const submitButtonText = `Сохранить`;

  const inputElements = [
    {
      id: 1,
      type: "url",
      name: "avatarLink",
      className: "popup__input popup__input_el_avatarLink",
      required: true,
      placeholder: "Ссылка на картинку"
    }
  ]
  const { values, handleChange, errors, resetForm, isInputValid, isSubmitButtonActive } = useFormAndValidation();

  //функция submit формы (обновление аватара пользователя на сервере)
  function handleAvatarChange(ev) {
    ev.preventDefault();

    onUpdateAvatar({
      avatarUrl: values.avatarLink
    });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatarUpdateForm"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAvatarChange}
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

export default EditProfilePopup;
