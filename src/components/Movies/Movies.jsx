import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { useState, useEffect } from "react";

function Movies() {
  const [filmsObj, setFilmsObj] = useState([]);
  const [isRenderingFilms, setIsRenderingFilms] = useState(false);

  function handleSubmitSearchFormMain(inputText) {
    if (inputText) {
      const dataFilms = moviesApi.getMovies();
      console.log(dataFilms);
       moviesApi.getMovies().then((data) => {
        const newDataFilms = data.filter((dataFilm) => {
          const FilmNameWords = dataFilm.nameRU
            .toLowerCase()
            .split(/\ |\. |\:|\, |\!/);
          console.log(FilmNameWords);
          return FilmNameWords.some((FilmNameWord) => {
            return inputText.toLowerCase() === FilmNameWord;
          });
        });
        console.log(newDataFilms);
        setFilmsObj(newDataFilms);
        setIsRenderingFilms(true);
    });
}
  }

  return (
    <div className="movies">
      <SearchForm handleSubmitSearchForm={handleSubmitSearchFormMain} />
      <MoviesCardList filmsObj={filmsObj}  isRenderingFilms={isRenderingFilms} />
    </div>
  );
}

export default Movies;
