import React from 'react';

function ImagePopup({
  selectedCardImg,
  onClose
}) {
  return (
    <div id="popupImgScaled" className={`popup popup_change_opacity ${selectedCardImg? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <div className="popup__scaled-images-container scaled-images-container">
          <img src={ `${selectedCardImg}` } alt="" className="scaled-images-container__img" />
          <h3 className="scaled-images-container__title"></h3>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
