import "./MoviesCard.css";
import { useLocation, Link } from "react-router-dom";

function MoviesCard({
  card,
  key,
  image,
  text,
  time,
  trailerLink,
  clickButtonLike,
  clickButtonDelete,
  isLiked,
}) {
  const { pathname } = useLocation();

  const cardLikeButtonName = `moviesCard__button ${
    isLiked && "moviesCard__button_active"
  }`;

  const newTime = `${Math.floor(time / 60)}ч ${time % 60}м`;

  function handlebuttonLikeClick() {
    clickButtonLike(card);
  }

  function handlebuttonDeleteClick() {
    clickButtonDelete(card);
  }

  const cardDeleteButtonName = `moviesCard__button moviesCard__button_delete`;

  return (
    <div key={key} id="moviesCard" className="moviesCard">
      <div className="moviesCard__content" key={key}>
        <Link className="moviesCard__trailer-link" to={trailerLink} target="_blank">
          <img src={image} alt="картинка" className="moviesCard__image" />
        </Link>
        <button
          className={
            pathname === "/movies" ? cardLikeButtonName : cardDeleteButtonName
          }
          onClick={
            pathname === "/movies"
              ? handlebuttonLikeClick
              : handlebuttonDeleteClick
          }
        >
          Сохранить
        </button>
      </div>
      <div className="moviesCard__container">
        <p className="moviesCard__text">{text}</p>
        <p className="moviesCard__time">{newTime}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
