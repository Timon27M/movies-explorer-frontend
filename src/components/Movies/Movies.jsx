import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { useState, useEffect } from "react";

function Movies({ buttonLikeClick, savedCards }) {
  const [filmsObj, setFilmsObj] = useState([]);
  const [isRenderingFilms, setIsRenderingFilms] = useState(false);
  const [isdownloadData, setisDownloadData] = useState(false)

  function handleSubmitSearchFormMain(inputText) {
    if (inputText) {
        setisDownloadData(true);
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
        localStorage.setItem("resultSearchMovies", inputText)
        setFilmsObj(newDataFilms);
        setIsRenderingFilms(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setisDownloadData(false)
      })
    }
  }

  return (
    <div className="movies">
      <SearchForm handleSubmitSearchForm={handleSubmitSearchFormMain} />
      <MoviesCardList
        filmsObj={filmsObj}
        isRenderingFilms={isRenderingFilms}
        buttonLikeClick={buttonLikeClick}
        isdownloadData={isdownloadData}
      />
    </div>
  );
}

export default Movies;
