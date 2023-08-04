import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader"

function MoviesCardList({
  filmsObjRender,
  isRenderingFilms,
  clickButtonLike,
  clickButtonDelete,
  isdownloadData,
  handleClickMore,
  savedFilmsObjRender,
  isDownloadSettingCards,
}) {
  const { pathname } = useLocation();
  return (
    <section className="moviesCardList">
      {filmsObjRender.length > 0 && pathname === "/movies" && !isdownloadData ? (
        <div className="moviesCardList__elements"> 
          {filmsObjRender.map((card) => (
            <MoviesCard
              card={card}
              key={card.id}
              clickButtonLike={clickButtonLike}
              image={`https://api.nomoreparties.co${card.image.url}`}
              text={card.nameRU}
              time={card.duration}
              isLiked={card.isLiked}
            />
          ))}
        </div>
      ) : isRenderingFilms &&
      filmsObjRender.length === 0 &&
        pathname === "/movies" &&
        !isdownloadData ? (
        <div className="moviesCardList__error">Не найдено</div>
      ) : (
        !isRenderingFilms && pathname === "/movies" && ""
      )}

      {!isdownloadData && pathname === "/movies" && (
        <Preloader />
      )}

      {filmsObjRender.length > 5 && pathname === "/movies" && !isdownloadData && (
        <button className="moviesCardList__button" onClick={handleClickMore}>Ещё</button>
      )}

      {savedFilmsObjRender.length > 0 && pathname === "/saved-movies" && !isDownloadSettingCards && (
        <div className="moviesCardList__elements">
          {savedFilmsObjRender.map((card, i) => (
            <MoviesCard
              movieId={card.movieId}
              card={card}
              key={i}
              image={card.image}
              text={card.nameRU}
              time={card.duration}
              isLiked={card.isLiked}
              clickButtonDelete={clickButtonDelete}
            />
          ))}
        </div>
      )}
      {savedFilmsObjRender.length === 0 && pathname === "/saved-movies" && !isDownloadSettingCards && (
        <div className="moviesCardList__error">Не найдено</div>
      )}
            {savedFilmsObjRender.length > 5 && pathname === "/saved-movies" && !isDownloadSettingCards && (
        <button className="moviesCardList__button" onClick={handleClickMore}>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
