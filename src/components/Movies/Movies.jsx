import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { useState, useEffect } from "react";
// import { CheckSettingsCardsRender } from "../../utils/settingsCardsRender";
import { useSettingCardsRender } from "../../utils/useSettingCardsRender";

function Movies({ clickButtonLike, savedCards, addMoreCards }) {
  const [filmsObj, setFilmsObj] = useState([]);
  const [isDownloadData, setIsDownloadData] = useState(false);
  const [filmsObjRender, setFilmsObjRender] = useState([]);

const {  settingsCardRender, isDownloadSettingCards } = useSettingCardsRender();

useEffect(() => {
  setFilmsObjRender(filmsObj.slice(0, settingsCardRender.cardRender))
}, [window.innerWidth])

function handleSubmitSearchFormMain(inputText) {
    // console.log(settingsCardRender);
    if (inputText) {
      setIsDownloadData(true);
      const dataFilms = moviesApi.getMovies();
      moviesApi
      .getMovies()
      .then((data) => {
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
          localStorage.setItem("resultSearchMovies", inputText);
          setFilmsObjRender(newDataFilms.slice(0, settingsCardRender.cardRender))
          setFilmsObj(newDataFilms);
          console.log(newDataFilms.slice(0, settingsCardRender.cardRender))
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsDownloadData(false);
        });
      }
    }
    
    useEffect(() => {
      console.log(filmsObjRender)
    })

  function handleClickMore() {
    addMoreCards(filmsObj, setFilmsObjRender, settingsCardRender)
  }

  return (
    <div className="movies">
      <SearchForm isDownloadSettingCards={isDownloadSettingCards} handleSubmitSearchForm={handleSubmitSearchFormMain} />
      <MoviesCardList
      allMovies={filmsObj}
        filmsObjRender={filmsObjRender}
        clickButtonLike={clickButtonLike}
        isdownloadData={isDownloadData}
        handleClickMore={handleClickMore}
        settingsCardRender={settingsCardRender}
      />
    </div>
  );
}

export default Movies;
