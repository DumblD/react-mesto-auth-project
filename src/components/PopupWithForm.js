import React from 'react';

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  submitButtonText
}) {
  const escClose = (ev) => {
    if (ev.key === "Escape") { // при клике на клавишу Esc
      onClose();
    }
  }
  function escClosePopup() {
    document.addEventListener('keydown', escClose);
  }
  React.useEffect(() => {
    escClosePopup();
  return () => {
    document.removeEventListener('keydown', escClose);
  };
});
  return (
    <div className={`popup popup_type_${name} ${isOpen? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <form name={name} className="popup__form" noValidate>
          <h3 className="popup__title">{title}</h3>
            {children}
          <button type="submit" className="popup__button">{submitButtonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
