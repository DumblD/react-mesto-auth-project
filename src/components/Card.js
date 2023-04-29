import React from 'react';

function Card({
  imgUrl,
  name,
  likesAmount,
  onCardClick
}) {
  function handleClick() {
    onCardClick(imgUrl);
  }

  return (
    <li className="card places__item">
      <button aria-label="удалить карточку" type="button" className="card__del-button"></button>
      <div className="card__img" style={{ backgroundImage: `url(${imgUrl})` }} onClick={handleClick}></div>
      <h3 className="card__title">{name}</h3>
      <div className="card__like-container">
        <button aria-label="поставить лайк" type="button" className="card__like-button"></button>
        <div className="card__like-counter">{likesAmount}</div>
      </div>
    </li>
  );
}

export default Card;
