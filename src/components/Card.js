import React from 'react';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.imgUrl);
  }

  return (
    <li className="card places__item">
      <button aria-label="удалить карточку" type="button" className="card__del-button"></button>
      <div className="card__img" style={{ backgroundImage: `url(${props.imgUrl})` }} onClick={handleClick}></div>
      <h3 className="card__title">{props.name}</h3>
      <div className="card__like-container">
        <button aria-label="поставить лайк" type="button" className="card__like-button"></button>
        <div className="card__like-counter">{props.likesAmount}</div>
      </div>
    </li>
  );
}

export default Card;
