import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import mainApi from "../../utils/MainApi";

function MoviesCard({ card, key, image, text, time, isLiked }) {
  const { pathname } = useLocation();

  const cardLikeButtonName = `moviesCard__button ${
    isLiked && "moviesCard__button_active"
  }`;

  const newTime = `${Math.floor(time / 60)}ч ${time % 60}м`;

  // const obj = {
  //   email: 'tim22277@gmail.com',
  //   password: '1234qwer'
  // }

  // mainApi.login(obj)

  // function buttonLikeClick() {
  //   mainApi
  //     .createMovie(card)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }

  const cardDeleteButtonName = `moviesCard__button moviesCard__button_delete`;

  return (
    <div key={key} id="moviesCard" className="moviesCard">
      <div className="moviesCard__content" key={key}>
        <img src={image} alt="картинка" className="moviesCard__image" />
        <button
          className={
            pathname === "/movies" ? cardLikeButtonName : cardDeleteButtonName
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
