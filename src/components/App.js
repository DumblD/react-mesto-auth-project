import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }
    return (
      <>
        <Header />
        <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        />
        <PopupWithForm
          name="avatarUpdateForm"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          submitButtonText="Сохранить">
          <input
            type="url"
            name="avatarLink"
            id="avatarLink"
            className="popup__input popup__input_el_avatar-link"
            required
            placeholder="Ссылка на картинку"
          />
          <span className="popup__error avatarLink-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="profileEditForm"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          submitButtonText="Сохранить">
          <input
            type="text"
            name="name"
            id="name"
            className="popup__input popup__input_el_name"
            required
            minLength="2"
            maxLength="40"
            placeholder="Введите имя"
          />
          <span className="popup__error name-error"></span>

          <input
            type="text"
            name="specialty"
            id="specialty"
            className="popup__input popup__input_el_specialty"
            required
            minLength="2"
            maxLength="200"
            placeholder="Введите информацию о себе"
          />
          <span className="popup__error specialty-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="placeAddForm"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          submitButtonText="Создать">
          <input
            type="text"
            name="placeTitle"
            id="placeTitle"
            className="popup__input popup__input_el_place-title"
            required
            minLength="2"
            maxLength="30"
            placeholder="Название"
          />
          <span className="popup__error placeTitle-error"></span>

          <input
            type="url"
            name="placeLink"
            id="placeLink"
            className="popup__input popup__input_el_place-link"
            required
            placeholder="Ссылка на картинку"
          />
          <span className="popup__error placeLink-error"></span>
        </PopupWithForm>

        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />

        <div id="popupConfirmDelCard" className="popup">
          <div className="popup__container">
            <button type="button" className="popup__close-button"></button>
            <form name="confirmDelForm" className="popup__form" noValidate>
              <h3 className="popup__title">Вы уверены?</h3>
              <button type="submit" className="popup__button">Да</button>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default App;
