import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Card from './Card.js';
import { api } from '../utils/api.js';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onClose,
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  selectedCardImg
}) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        const { name, about, avatar } = data;
        setUserName(`${name}`);
        setUserDescription(`${about}`);
        setUserAvatar(`${avatar}`);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__img-container">
          <div className="profile__img" style={{ backgroundImage: `url(${userAvatar})` }}></div>
          <button className="profile__img-edit-button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button aria-label="редактировать профиль" type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          <p className="profile__specialty">{userDescription}</p>
        </div>
        <button aria-label="добавить место" type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="places">
        <ul className="places__container">
          {cards.map((el) => (
            <Card key={el._id} imgUrl={el.link} name={el.name} likesAmount={el.likes.length} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>

      <PopupWithForm
        name="avatarUpdateForm"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={onClose}>
        <fieldset className="popup__input-container">
          <input
            type="url"
            name="avatarLink"
            id="avatarLink"
            className="popup__input popup__input_el_avatar-link"
            required
            placeholder="Ссылка на картинку"
          />
          <span className="popup__error avatarLink-error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="profileEditForm"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={onClose}>
        <fieldset className="popup__input-container">
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
            </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="placeAddForm"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={onClose}>
        <fieldset className="popup__input-container">
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
            </fieldset>
      </PopupWithForm>

      <ImagePopup selectedCardImg={selectedCardImg} onClose={onClose}/>

      <div id="popupConfirmDelCard" className="popup">
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <form name="confirmDelForm" className="popup__form" noValidate>
            <h3 className="popup__title">Вы уверены?</h3>
            <button type="submit" className="popup__button">Да</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Main;
