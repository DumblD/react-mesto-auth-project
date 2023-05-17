import React, { useEffect, useState } from 'react';

function ImagePopup({
  selectedCard,
  onClose
}) {
  const [isCardSelected, setIsCardSelected] = useState(false);
  // для того, чтобы пользователь при закрытии попапа не видел резкого исчезновения картики
  const [popupImgLink, setPopupImgLink] = useState('');
  useEffect(() => {
    if (JSON.stringify(selectedCard) !== '{}') {
      setPopupImgLink(`${selectedCard.link}`);
      setIsCardSelected(true);
    } else {
      setIsCardSelected(false);
    }
  }, [selectedCard]);
  return (
    <div id="popupImgScaled" className={`popup popup_change_opacity ${isCardSelected? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <div className="popup__scaled-images-container scaled-images-container">
          <img src={`${popupImgLink}`} alt={`${selectedCard.name}`.toLowerCase()} className="scaled-images-container__img" />
          <h3 className="scaled-images-container__title">{selectedCard.name}</h3>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
