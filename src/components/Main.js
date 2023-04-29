import React from 'react';
import Card from './Card.js';
import { api } from '../utils/api.js';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick
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
          {cards.map((cardElement) => (
            <Card key={cardElement._id} card = {cardElement} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
