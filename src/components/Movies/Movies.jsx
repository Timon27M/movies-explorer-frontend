import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { useState, useEffect } from "react";

function Movies({ buttonLikeClick, savedCards }) {
  const [filmsObj, setFilmsObj] = useState([]);
  const [isRenderingFilms, setIsRenderingFilms] = useState(false);

  function handleSubmitSearchFormMain(inputText) {
    if (inputText) {
      const dataFilms = moviesApi.getMovies();
      moviesApi.getMovies().then((data) => {
        const foundDataFilms = data.filter((dataFilm) => {
          const FilmNameWords = dataFilm.nameRU
            .toLowerCase()
            .split(/\ |\. |\:|\, |\!/);
          return FilmNameWords.some((FilmNameWord) => {
            return inputText.toLowerCase() === FilmNameWord;
          });
        });

        // сравниваем два массива SavedCards и foundDataFilms
        const newDataFilms = foundDataFilms.map((foundDataFilm) => {
          const savedInMyCards = savedCards.some((savedCard) => {
            return foundDataFilm.id === savedCard.movieId;
          });
          if (savedInMyCards) {
            foundDataFilm.isLiked = true;
          } else {
            foundDataFilm.isLiked = false;
          }

          return foundDataFilm;
        });

        // console.log(savedCards);
        // console.log(newDataFilms);
        setFilmsObj(newDataFilms);
        setIsRenderingFilms(true);
      });
    }
  }

  return (
    <div className="movies">
      <SearchForm handleSubmitSearchForm={handleSubmitSearchFormMain} />
      <MoviesCardList
        filmsObj={filmsObj}
        isRenderingFilms={isRenderingFilms}
        buttonLikeClick={buttonLikeClick}
      />
    </div>
  );
}

export default Movies;
