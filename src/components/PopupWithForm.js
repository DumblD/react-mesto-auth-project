import React from 'react';
import Popup from './Popup.js';

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
  submitButtonText,
  isSubmitLoading,
  isSubmitButtonActive
}) {

  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <form name={name} className="popup__form" onSubmit={onSubmit} noValidate>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button type="submit" disabled={!isSubmitButtonActive} className={`popup__button ${isSubmitButtonActive ? '' : 'popup__button_disabled'}`}>{isSubmitLoading ? `${submitButtonText}…` : submitButtonText}</button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
