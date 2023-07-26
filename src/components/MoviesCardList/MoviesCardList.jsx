import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import img1 from "../../images/pic__COLOR_pic1.jpg";
import img2 from "../../images/pic__COLOR_pic2.jpg";
import img3 from "../../images/pic__COLOR_pic3.jpg";
import img4 from "../../images/pic__COLOR_pic4.jpg";
import img5 from "../../images/pic__COLOR_pic5.jpg";
import img6 from "../../images/pic__COLOR_pic6.jpg";
import img7 from "../../images/pic__COLOR_pic7.jpg";
import img8 from "../../images/pic__COLOR_pic8.jpg";
import img9 from "../../images/pic__COLOR_pic9.jpg";
import img10 from "../../images/pic__COLOR_pic10.jpg";
import img11 from "../../images/pic__COLOR_pic11.jpg";
import img12 from "../../images/pic__COLOR_pic12.jpg";

function MoviesCardList() {
  const { pathname } = useLocation();

  const cards = [
    {
      image: img1,
      text: "33 слова о дизайне",
      time: "1ч 42м",
      isLiked: false,
    },
    {
      image: img2,
      text: "Киноальманах «100 лет дизайна»",
      time: "1ч 42м",
      isLiked: false,
    },
    {
      image: img3,
      text: "В погоне за Бенкси",
      time: "1ч 42м",
      isLiked: false,
    },
    {
      image: img4,
      text: "Баския: Взрыв реальности",
      time: "1ч 42м",
      isLiked: false,
    },
    {
      image: img5,
      text: "Бег это свобода",
      time: "1ч 42м",
      isLiked: false,
    },
    {
      image: img6,
      text: "Книготорговцы",
      time: "1ч 42м",
      isLiked: true,
    },
    {
      image: img7,
      text: "Когда я думаю о Германии ночью",
      time: "1ч 42м",
      isLiked: true,
    },
    {
      image: img8,
      text: "Gimme Danger: История Игги и The Stooges",
      time: "1ч 42м",
      isLiked: true,
    },
    {
      image: img9,
      text: "Дженис: Маленькая девочка грустит",
      time: "1ч 42м",
      isLiked: false,
    },
    {
      image: img10,
      text: "Соберись перед прыжком",
      time: "1ч 42м",
      isLiked: false,
    },
    {
      image: img11,
      text: "Пи Джей Харви: A dog called money",
      time: "1ч 42м",
      isLiked: false,
    },
    {
      image: img12,
      text: "По волнам: Искусство звука в кино",
      time: "1ч 42м",
      isLiked: false,
    },
  ];

  const myCards = cards.filter((card) => card.isLiked === true);

  return (
    <section className="moviesCardList">
      {cards.length > 0 && pathname === "/movies" && (
        <div className="moviesCardList__elements">
          {cards.map((card) => (
            <MoviesCard
              image={card.image}
              text={card.text}
              time={card.time}
              isLiked={card.isLiked}
            />
          ))}
        </div>
      )}

      {cards.length > 5 && pathname === "/movies" && (
        <button className="moviesCardList__button">Ещё</button>
      )}

      {myCards.length > 0 && pathname === "/saved-movies" && (
        <div className="moviesCardList__elements">
          {myCards.map((card) => (
            <MoviesCard
              image={card.image}
              text={card.text}
              time={card.time}
              isLiked={card.isLiked}
            />
          ))}
        </div>
      )}
      {myCards.length === 0 && pathname === "/saved-movies" && (
        <div className="moviesCardList__error">Не найдено</div>
      )}
    </section>
  );
}

export default MoviesCardList;
