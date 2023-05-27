import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import {usePopupClose} from '../utils/customHooks/usePopupClose.js';

function EditProfilePopup({
  isOpen,
  onClose,
  isSubmitLoading,
  onUpdateAvatar
}) {

  // текст кнопки Submit формы
  const submitButtonText = `Сохранить`;
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isinputError, setIsinputError] = useState(false);
  // закрытие попапа по клику вне формы / клавишу Esc
  usePopupClose(isOpen, onClose);

  // функция проверки inputs на валидность
  function handleChange(ev) {
    if (ev.target.validity.valid) {
      setValidationMessage('');
      setIsinputError(false);
      setIsSubmitButtonActive(true);
    } else {
      setValidationMessage(ev.target.validationMessage);
      setIsinputError(true);
      setIsSubmitButtonActive(false);
    }
    setInputValue(ev.target.value);
  }

  //функция submit формы (обновление аватара пользователя на сервере)
  function handleAvatarChange(ev) {
    ev.preventDefault();

    onUpdateAvatar({
      avatarUrl: inputValue
    });
  }

  useEffect (() => {
    setInputValue('');
    setValidationMessage('');
    setIsinputError(false);
    setIsSubmitButtonActive(false);
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
      <input
        type="url"
        name="avatarLink"
        id="avatarLink"
        className={`popup__input popup__input_el_avatar-link ${isinputError? 'popup__input_type_error' : ''}`}
        required
        placeholder="Ссылка на картинку"
        value={inputValue}
        onChange={handleChange}
      />
      <span className="popup__error avatarLink-error">{validationMessage}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
