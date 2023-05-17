import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmDelCardPopup({
  isOpen,
  onClose,
  isSubmitLoading,
  onConfirmDelCard
}) {

  const submitButtonText = `Да`;

  function handleConfirmDelCardSubmit(ev) {
    ev.preventDefault();
    onConfirmDelCard();
  }

  return (
    <PopupWithForm
      name="confirmDelForm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirmDelCardSubmit}
      isSubmitLoading={isSubmitLoading}
      submitButtonText="Да">
      <button type="submit" className="popup__button">{isSubmitLoading ? `${submitButtonText}…` : submitButtonText}</button>
    </PopupWithForm>
  );
}

export default ConfirmDelCardPopup;
