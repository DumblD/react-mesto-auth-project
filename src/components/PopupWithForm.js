import React, { useEffect } from 'react';

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
    <div className={`popup popup_type_${name} ${isOpen? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <form name={name} className="popup__form" onSubmit={onSubmit} noValidate>
          <h3 className="popup__title">{title}</h3>
            {children}
            <button type="submit" disabled={!isSubmitButtonActive} className={`popup__button ${isSubmitButtonActive? '': 'popup__button_disabled'}`}>{isSubmitLoading? `${submitButtonText}…` : submitButtonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
