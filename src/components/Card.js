import React from 'react';

import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete
}) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="card places__item">
      {isOwn &&
        <button aria-label="удалить карточку" type="button" className="card__del-button" onClick={handleCardDelete}></button>
      }
      <div className="card__img" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>
      <h3 className="card__title">{card.name}</h3>
      <div className="card__like-container">
        <button aria-label="поставить лайк" type="button" onClick={handleCardLike} className={`card__like-button ${isLiked && 'card__like-button_active'}`}></button>
        <div className="card__like-counter">{card.likes.length}</div>
      </div>
    </li>
  );
}

export default Card;
