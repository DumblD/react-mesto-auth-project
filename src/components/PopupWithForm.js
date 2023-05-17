import React, { useEffect } from 'react';

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  const escClose = (ev) => {
    if (ev.key === "Escape") { // при клике на клавишу Esc
      onClose();
    }
  }
  function escClosePopup() {
    document.addEventListener('keydown', escClose);
  }
  useEffect(() => {
    if (isOpen) {
      escClosePopup();
      return () => {
        document.removeEventListener('keydown', escClose);
      };
    }
}, [isOpen, onClose]);
  return (
    <div className={`popup popup_type_${name} ${isOpen? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <form name={name} className="popup__form" onSubmit={onSubmit} noValidate>
          <h3 className="popup__title">{title}</h3>
            {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
