import React from 'react';

import Card from './Card.js';

import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__img-container">
          <div className="profile__img" style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
          <button className="profile__img-edit-button" onClick={onEditAvatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button aria-label="редактировать профиль" type="button" className="profile__edit-button" onClick={onEditProfile}/>
          <p className="profile__specialty">{currentUser.about}</p>
        </div>
        <button aria-label="добавить место" type="button" className="profile__add-button" onClick={onAddPlace}/>
      </section>

      <section className="places">
        <ul className="places__container">
          {cards.map((cardElement) => (
            <Card key={cardElement._id} card={cardElement} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
