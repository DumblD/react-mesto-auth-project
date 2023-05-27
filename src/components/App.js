import React, { useEffect, useState } from 'react';

import Login from './Login.js';
import Register from './Register.js';
import MestoGeneralPage from './MestoGeneralPage.js';
import ProtectedRouteElement from "./ProtectedRoute";
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import ConfirmDelCardPopup from './ConfirmDelCardPopup.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from './../utils/auth.js';
import { api } from '../utils/api.js';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentUserEmail } from '../contexts/CurrentUserEmail.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isRegisterInfoPopupOpen, setIsRegisterInfoPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardToDelete, setSelectedCardToDelete] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    setLoggedIn(true);
  }

  function toggleSubmitLoading(isLoading) {
    setIsSubmitLoading(isLoading);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDelCardPopupOpen(false);
    setIsRegisterInfoPopupOpen(false);
    setSelectedCard({});
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

  function handleConfirmDelCardClick(card) {
    setSelectedCardToDelete(card);
    setIsConfirmDelCardPopupOpen(true);
  }

  function handleSubmit(request) {
    toggleSubmitLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => toggleSubmitLoading(false));
  }

  function onLogin(loginData, clearInputs) {
    auth.authorize(loginData)
      .then((data) => {
        if (data) {
          if (data.token) {
            clearInputs();
            setCurrentUserEmail(loginData.email);
            handleLogin();
            navigate('/', { replace: true });
          }
        }
        return;
      })
      .catch(err => {
        alert(`${err}
Попробуйте ещё раз.`);
      })
  }

  function onRegister(registerData) {
    auth.register(registerData)
      .then((data) => {
        if (data) {
          setIsRegisterSuccess(true);
          setIsRegisterInfoPopupOpen(true);
        }
      }).catch((err) => {
        console.log(err);
        setIsRegisterSuccess(false);
        setIsRegisterInfoPopupOpen(true);
      });
  }

  useEffect(() => {
    handleTokenCheck();
  }, [])

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setCurrentUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      }).catch((err) => {
        alert(`${err}
Что-то пошло не так. Попробуйте войти снова.`);
      })
    }
  }

  function getUserInfo() {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function getInitialCards() {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        alert(err);
      });
  }

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

  function handleConfirmDelCard() {
    handleCardDelete(selectedCardToDelete);
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserEmail.Provider value={currentUserEmail}>
        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
          <Route path="/" element={<ProtectedRouteElement
            element={MestoGeneralPage}
            loggedIn={loggedIn}
            currentUserEmail={currentUserEmail}
            getUserInfo={getUserInfo}
            getInitialCards={getInitialCards}
            cards={cards}
            handleCardClick={handleCardClick}
            handleEditAvatarClick={handleEditAvatarClick}
            handleEditProfileClick={handleEditProfileClick}
            handleAddPlaceClick={handleAddPlaceClick}
            handleCardLike={handleCardLike}
            handleConfirmDelCardClick={handleConfirmDelCardClick}
          />} />
          <Route path="/signup" element={<Register onRegister={onRegister} />} />
          <Route path="/signin" element={<Login onLogin={onLogin} currentUserEmail={currentUserEmail} />} />
        </Routes>
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
        <InfoTooltip
          isOpen={isRegisterInfoPopupOpen}
          onClose={closeAllPopups}
          isRegisterSuccess={isRegisterSuccess} />
      </CurrentUserEmail.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
