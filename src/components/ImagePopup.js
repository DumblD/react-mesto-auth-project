import React from 'react';

function ImagePopup(props) {
  return (
    <div id="popupImgScaled" className={`popup popup_change_opacity ${props.selectedCardImg? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <div className="popup__scaled-images-container scaled-images-container">
          <img src={ `${props.selectedCardImg}` } alt="" className="scaled-images-container__img" />
          <h3 className="scaled-images-container__title"></h3>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
