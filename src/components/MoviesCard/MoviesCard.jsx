import "./MoviesCard.css";

function MoviesCard(props) {
  const cardLikeButtonName = `moviesCard__button ${
    props.isLiked && "moviesCard__button_active"
  }`;

  return (
    <div className="moviesCard">
      <div className="moviesCard__content">
        <img src={props.image} alt="картинка" className="moviesCard__image" />
        <button className={cardLikeButtonName}>Сохранить</button>
      </div>
      <div className="moviesCard__container">
        <p className="moviesCard__text">{props.text}</p>
      <p className="moviesCard__time">{props.time}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
