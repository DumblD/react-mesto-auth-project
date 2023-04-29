import React from 'react';

function Card({
  card,
  onCardClick
}) {
  function handleClick() {
    onCardClick(card.link);
  }

  return (
    <li className="card places__item">
      <button aria-label="удалить карточку" type="button" className="card__del-button"></button>
      <div className="card__img" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>
      <h3 className="card__title">{card.name}</h3>
      <div className="card__like-container">
        <button aria-label="поставить лайк" type="button" className="card__like-button"></button>
        <div className="card__like-counter">{card.likes.length}</div>
      </div>
    </li>
  );
}

export default Card;
