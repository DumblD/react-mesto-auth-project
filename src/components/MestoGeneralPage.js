import React, { useEffect } from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

function MestoGeneralPage({
  currentUserEmail,
  getUserInfo,
  getInitialCards,
  cards,
  handleCardClick,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleCardLike,
  handleConfirmDelCardClick
}) {

  const isMainPage = true;

  useEffect(() => {
    getUserInfo();
    getInitialCards();
  }, []);

  return (
    <>
      <Header isMainPage={isMainPage} currentUserEmail={currentUserEmail} />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleConfirmDelCardClick}
        cards={cards}
      />
      <Footer />
    </>
  );
}

export default MestoGeneralPage;
