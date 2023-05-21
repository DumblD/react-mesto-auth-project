import React, { useRef, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({
  isOpen,
  onClose,
  isSubmitLoading,
  onUpdateAvatar
}) {

  // текст кнопки Submit формы
  const submitButtonText = `Сохранить`;
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false);

  const inputUrlRef = useRef();
  const [validationMessage, setValidationMessage] = useState('');
  const [isinputError, setIsinputError] = useState(false);

  // функция проверки inputs на валидность
  function checkValidity() {
    if (inputUrlRef.current.validity.valid) {
      setValidationMessage('');
      setIsinputError(false);
      setIsSubmitButtonActive(true);
    } else {
      setValidationMessage(inputUrlRef.current.validationMessage);
      setIsinputError(true);
      setIsSubmitButtonActive(false);
    }
  }

  //функция submit формы (обновление аватара пользователя на сервере)
  function handleAvatarChange(ev) {
    ev.preventDefault();

    onUpdateAvatar({
      avatarUrl: inputUrlRef.current.value
    });
  }

  useEffect (() => {
    inputUrlRef.current.value = '';
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
        ref={inputUrlRef}
        onChange={checkValidity}
      />
      <span className="popup__error avatarLink-error">{validationMessage}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
