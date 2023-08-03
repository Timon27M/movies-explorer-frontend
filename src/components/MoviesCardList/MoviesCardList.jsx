import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader"

function MoviesCardList({
  filmsObj,
  isRenderingFilms,
  buttonLikeClick,
  buttonDeleteClick,
  isdownloadData
}) {
  const { pathname } = useLocation();
  return (
    <section className="moviesCardList">
      {filmsObj.length > 0 && pathname === "/movies" && !isdownloadData ? (
        <div className="moviesCardList__elements">
          {filmsObj.map((card) => (
            <MoviesCard
              card={card}
              key={card.id}
              buttonLikeClick={buttonLikeClick}
              image={`https://api.nomoreparties.co${card.image.url}`}
              text={card.nameRU}
              time={card.duration}
              isLiked={card.isLiked}
            />
          ))}
        </div>
      ) : isRenderingFilms &&
        filmsObj.length === 0 &&
        pathname === "/movies" &&
        !isdownloadData ? (
        <div className="moviesCardList__error">Не найдено</div>
      ) : (
        !isRenderingFilms && pathname === "/movies" && ""
      )}

      {isdownloadData && pathname === "/movies" && (
        <Preloader />
      )}

      {filmsObj.length > 5 && pathname === "/movies" && !isdownloadData && (
        <button className="moviesCardList__button">Ещё</button>
      )}

      {filmsObj.length > 0 && pathname === "/saved-movies" && (
        <div className="moviesCardList__elements">
          {filmsObj.map((card, i) => (
            <MoviesCard
              movieId={card.movieId}
              card={card}
              key={i}
              image={card.image}
              text={card.nameRU}
              time={card.duration}
              isLiked={card.isLiked}
              buttonDeleteClick={buttonDeleteClick}
            />
          ))}
        </div>
      )}
      {filmsObj.length === 0 && pathname === "/saved-movies" && (
        <div className="moviesCardList__error">Не найдено</div>
      )}
    </section>
  );
}

export default MoviesCardList;
