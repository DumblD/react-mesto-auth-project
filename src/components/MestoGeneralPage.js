import React, { useEffect, useState } from 'react';

import Header from './Header.js';
import Main from './Main.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import ConfirmDelCardPopup from './ConfirmDelCardPopup.js';
import Footer from './Footer.js';

import { api } from '../utils/api.js';

function MestoGeneralPage({
  currentUser,
  currentUserEmail,
  setCurrentUser
}) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardToDelete, setSelectedCardToDelete] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const isMainPage = true;

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        alert(err);
      });

    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const updatedCards = cards.map((cardElement) => {
          return cardElement._id === newCard._id ? newCard : cardElement;
        });
        setCards(updatedCards);
      })
      .catch(console.error);
  }

  function handleSubmit(request) {
    toggleSubmitLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => toggleSubmitLoading(false));
  }

  function handleCardDelete(card) {
    function makeRequest() {
      return api.deleteCard(card._id)
        .then(() => {
          const updatedCards = cards.filter((cardElement) => {
            return cardElement._id !== card._id;
          });
          setCards(updatedCards);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateUser({ name, about }) {
    function makeRequest() {
      return api.updateUserInfo(name, about)
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ avatarUrl }) {
    function makeRequest() {
      return api.updateUserAvatar(avatarUrl)
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlace(data) {
    function makeRequest() {
      return api.addNewCard(data)
        .then((newCardData) => {
          setCards([newCardData, ...cards]);
        })
    }
    handleSubmit(makeRequest);
  }

  function handleConfirmDelCard() {
    handleCardDelete(selectedCardToDelete);
  }

  function handleCardClick(cardElement) {
    setSelectedCard(cardElement);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function toggleSubmitLoading(isLoading) {
    setIsSubmitLoading(isLoading);
  }

  function handleConfirmDelCardClick(card) {
    setSelectedCardToDelete(card);
    setIsConfirmDelCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDelCardPopupOpen(false);
    setSelectedCard({});
  }
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

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        isSubmitLoading={isSubmitLoading}
        onClose={closeAllPopups} />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        isSubmitLoading={isSubmitLoading}
        onClose={closeAllPopups} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlace}
        isSubmitLoading={isSubmitLoading}
        onClose={closeAllPopups} />
      <ConfirmDelCardPopup
        isOpen={isConfirmDelCardPopupOpen}
        onConfirmDelCard={handleConfirmDelCard}
        isSubmitLoading={isSubmitLoading}
        onClose={closeAllPopups} />
      <ImagePopup
        selectedCard={selectedCard}
        onClose={closeAllPopups} />
      <Footer />
    </>
  );
}

export default MestoGeneralPage;
