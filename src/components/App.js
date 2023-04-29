import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCardImg, setSelectedCardImg] = React.useState('');
  const escClose = (ev) => {
    if (ev.key === "Escape") { // при клике на клавишу Esc
      closeAllPopups();
    }
  }

  function handleCardClick(imgUrl) {
    setSelectedCardImg(imgUrl);
    escClosePopup();
  }

  function escClosePopup() {
    document.addEventListener('keydown', escClose);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    escClosePopup();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    escClosePopup();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    escClosePopup();
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCardImg(false);
    document.removeEventListener('keydown', escClose);
  }
    return (
      <>
        <Header />
        <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        selectedCardImg={selectedCardImg}
        />
        <Footer />
      </>
    );
}

export default App;
