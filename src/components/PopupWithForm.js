import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <form name={props.name} className="popup__form" noValidate>
          <h3 className="popup__title">{props.title}</h3>
            {props.children}
          <button type="submit" className="popup__button">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
