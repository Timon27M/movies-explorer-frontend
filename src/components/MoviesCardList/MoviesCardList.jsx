import "./MoviesCardList.css";
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
      isLiked: true,
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
      isLiked: true,
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
      isLiked: false,
    },
    {
      image: img8,
      text: "Gimme Danger: История Игги и The Stooges",
      time: "1ч 42м",
    },
    {
      image: img9,
      text: "Дженис: Маленькая девочка грустит",
      time: "1ч 42м",
      isLiked: true,
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

  return (
    <section className="moviesCardList">
      <div className="moviesCardList__elements">
        {cards.map((card) => {
          return (
            <MoviesCard image={card.image} text={card.text} time={card.time} isLiked={card.isLiked} />
          );
        })}
      </div>
        <button className="moviesCardList__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
