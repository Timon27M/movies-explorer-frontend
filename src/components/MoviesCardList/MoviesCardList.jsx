import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  filmsObjRender,
  clickButtonLike,
  clickButtonDelete,
  isdownloadData,
  handleClickMore,
  savedFilmsObjRender,
  isDownloadSettingCards,
  handleClickMoreSavedMovies,
  allSavedCards,
  allMovies,
  settingsCardRender,
  isLastInputSearch
}) {
  const { pathname } = useLocation();

  const [maxMovie, setMaxMovie] = useState(0);
  useEffect(() => {
    setMaxMovie(settingsCardRender.cardRender);  
  }, [window.innerWidth, allSavedCards])

  return (
    <section className="moviesCardList">
      {pathname === "/movies" &&
      filmsObjRender.length > 0 &&
      !isdownloadData ? (
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
              trailerLink={card.trailerLink}
            />
          ))}
        </div>
      ) : pathname === "/movies" &&
        !isdownloadData &&
        filmsObjRender.length === 0 &&
        isLastInputSearch === true ? (
        <div className="moviesCardList__error">Не найдено</div>
      ) : (
        pathname === "/movies" && !isdownloadData && ""
      )}

      {pathname === "/movies" && isdownloadData && <Preloader />}

      {pathname === "/movies" &&
        allMovies.length > maxMovie &&
        !isdownloadData && (
          <button className="moviesCardList__button" onClick={handleClickMore}>
            Ещё
          </button>
        )}

      {pathname === "/saved-movies" &&
        savedFilmsObjRender.length > 0 &&
        !isDownloadSettingCards && (
          <div className="moviesCardList__elements">
            {savedFilmsObjRender.map((card, i) => (
              <MoviesCard
                movieId={card.movieId}
                card={card}
                key={i}
                image={card.image}
                text={card.nameRU}
                time={card.duration}
                trailerLink={card.trailer}
                isLiked={card.isLiked}
                clickButtonDelete={clickButtonDelete}
              />
            ))}
          </div>
        )}

      {pathname === "/saved-movies" &&
        savedFilmsObjRender.length === 0 &&
        !isDownloadSettingCards && (
          <div className="moviesCardList__error">Не найдено</div>
        )}

      {pathname === "/saved-movies" &&
        allSavedCards.length > maxMovie &&
        !isDownloadSettingCards && (
          <button className="moviesCardList__button" onClick={handleClickMoreSavedMovies}>
            Ещё
          </button>
        )}
    </section>
  );
}

export default MoviesCardList;
