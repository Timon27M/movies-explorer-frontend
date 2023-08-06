import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import { useState, useEffect } from "react";
import { useSettingCardsRender } from "../../utils/useSettingCardsRender";

function Movies({
  clickButtonLike,
  savedCards,
  addMoreCards,
  localStorageToken,
}) {
  const [filmsObj, setFilmsObj] = useState([]);
  const [isDownloadData, setIsDownloadData] = useState(false);
  const [filmsObjRender, setFilmsObjRender] = useState([]);
  const [isLastInputSearch, setIsLastInputSearch] = useState(false);
  const [isCheckedShortMovie, setIsCheckedShortMovie] = useState(false);

  const { settingsCardRender, isDownloadSettingCards } =
    useSettingCardsRender();

  useEffect(() => {
    setFilmsObjRender(filmsObj.slice(0, settingsCardRender.cardRender));
    setIsCheckedShortMovie(
      JSON.parse(localStorage.getItem("checkboxIsChecked"))
    );
  }, [window.innerWidth]);

  function onChangeCheckbox(isChecked) {
    setIsCheckedShortMovie(isChecked);
  }

  function checkArrayForTime(array) {
    const newDataFilmsShortTime = array.filter((element) => {
      return element.duration <= 40;
    });
    setFilmsObjRender(
      newDataFilmsShortTime.slice(0, settingsCardRender.cardRender)
    );
    setIsLastInputSearch(true);
    setFilmsObj(newDataFilmsShortTime);
  }

  function handleSubmitSearchFormMain(inputText, isChecked) {
    if (inputText) {
      setIsDownloadData(true);
      moviesApi
        .getMovies(localStorageToken)
        .then((data) => {
          const foundDataFilms = data.filter((dataFilm) => {
            if (inputText.split(" ").length === 1) {
              const FilmNameWords = dataFilm.nameRU
                .toLowerCase()
                .split(/\ |\. |\:|\, |\!|\\/);
              return FilmNameWords.some((FilmNameWord) => {
                return inputText.toLowerCase() === FilmNameWord;
              });
            } else if (inputText.split(" ").length > 1) {
              return dataFilm.nameRU
                .toLowerCase()
                .includes(inputText.toLowerCase());
            }
          });

          const newDataFilms = foundDataFilms.map((foundDataFilm) => {
            foundDataFilm.isLiked = savedCards.some((savedCard) => {
              return foundDataFilm.id === savedCard.movieId;
            });

            return foundDataFilm;
          });
          localStorage.setItem("checkboxIsChecked", JSON.stringify(isChecked));
          localStorage.setItem("resultSearchMovies", inputText);
          if (isChecked) {
            checkArrayForTime(newDataFilms);
          } else {
            setFilmsObj(newDataFilms);
            setFilmsObjRender(
              newDataFilms.slice(0, settingsCardRender.cardRender)
            );
            setIsLastInputSearch(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsDownloadData(false);
        });
    }
  }

  function handleClickMore() {
    addMoreCards(filmsObj, setFilmsObjRender, settingsCardRender);
  }

  return (
    <div className="movies">
      <SearchForm
        isDownloadSettingCards={isDownloadSettingCards}
        handleSubmitSearchForm={handleSubmitSearchFormMain}
        setIsLastInputSearch={setIsLastInputSearch}
        isLastInputSearch={isLastInputSearch}
        onChangeCheckbox={onChangeCheckbox}
        isCheckedShortMovie={isCheckedShortMovie}
      />
      <MoviesCardList
        allMovies={filmsObj}
        filmsObjRender={filmsObjRender}
        clickButtonLike={clickButtonLike}
        isdownloadData={isDownloadData}
        handleClickMore={handleClickMore}
        settingsCardRender={settingsCardRender}
        isLastInputSearch={isLastInputSearch}
      />
    </div>
  );
}

export default Movies;
