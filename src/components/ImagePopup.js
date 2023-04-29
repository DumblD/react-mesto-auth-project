import React from 'react';

function ImagePopup({
  selectedCard,
  onClose
}) {
  const [isCardSelected, setIsCardSelected] = React.useState(false);
  React.useEffect(() => {
    if (JSON.stringify(selectedCard) !== '{}') {
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
          <img src={ `${isCardSelected? `${selectedCard.link}` : ''}` } alt={ `${isCardSelected? `${selectedCard.name}` : ''}` } className="scaled-images-container__img" />
          <h3 className="scaled-images-container__title"></h3>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
