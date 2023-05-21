import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmDelCardPopup({
  isOpen,
  onClose,
  isSubmitLoading,
  onConfirmDelCard
}) {

  const submitButtonText = `Да`;
  const isSubmitButtonActive = true;

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
      submitButtonText={submitButtonText}
      isSubmitLoading={isSubmitLoading}
      isSubmitButtonActive={isSubmitButtonActive}
      >
    </PopupWithForm>
  );
}

export default ConfirmDelCardPopup;
