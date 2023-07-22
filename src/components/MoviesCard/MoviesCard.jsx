import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
  const { pathname } = useLocation();

  const cardLikeButtonName = `moviesCard__button ${
    props.isLiked && "moviesCard__button_active"
  }`;

  const cardDeleteButtonName = `moviesCard__button moviesCard__button_delete`;

  return (
    <div className="moviesCard">
      <div className="moviesCard__content">
        <img src={props.image} alt="картинка" className="moviesCard__image" />
        <button
          className={
            pathname === "/movies" ? cardLikeButtonName : cardDeleteButtonName
          }
        >
          Сохранить
        </button>
      </div>
      <div className="moviesCard__container">
        <p className="moviesCard__text">{props.text}</p>
        <p className="moviesCard__time">{props.time}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
