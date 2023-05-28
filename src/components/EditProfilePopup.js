import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from './../contexts/CurrentUserContext.js';
import { useContext } from 'react';
import { useFormAndValidation } from '../utils/customHooks/useFormAndValidation.js';
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
  const {values, handleChange, errors, resetForm, isInputValid, setValues, setIsSubmitButtonActive, isSubmitButtonActive} = useFormAndValidation();

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

// функция установки значений для инпутов из переменных
// хранящие значения глобального контекста currentUser
function setValuesToInputs() {
  setValues({ ...values, name: name, about: about });
}

//функция submit формы (обновление пользовательских данных на сервере)
function handleSubmit(ev) {
  ev.preventDefault();

  onUpdateUser({
    name: values.name,
    about: values.about
  });
}

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  useEffect(() => {
    setIsSubmitButtonActive(true);
    setValuesToInputs();
    return () => resetForm();
  }, [isOpen]);

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
