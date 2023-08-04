import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { useState, useEffect } from "react";
// import { CheckSettingsCardsRender } from "../../utils/settingsCardsRender";
import { useSettingCardsRender } from "../../utils/useSettingCardsRender";

function Movies({ clickButtonLike, savedCards, addMoreCards }) {
  const [filmsObj, setFilmsObj] = useState([]);
  const [isRenderingFilms, setIsRenderingFilms] = useState(false);
  const [isDownloadData, setIsDownloadData] = useState(false);
  const [filmsObjRender, setFilmsObjRender] = useState([]);
//   const [isDownloadSettingCards, setIsDownloadSettingCards] = useState(true);
//   const [settingsCardRender, setSettingsCardRender] = useState({});
//   const [widthWindow, setWidthWindow] = useState(window.innerWidth);

//   function changeWindowWidth() {
//     const { innerWidth: newWidth } = window;
//     setWidthWindow(newWidth);
//   }

//   function addSettings() {
//     if (widthWindow > 820) {
//         setSettingsCardRender({ cardRender: 12, cardRenderMore: 3 });
//         setIsDownloadSettingCards(false)
//       } else if (widthWindow >= 610) {
//         setSettingsCardRender({ cardRender: 8, cardRenderMore: 2 });
//         setIsDownloadSettingCards(false)
//       } else if (widthWindow < 610) {
//         setSettingsCardRender({ cardRender: 5, cardRenderMore: 2 });
//         setIsDownloadSettingCards(false)
//       }
//   }

//   useEffect(() => {
//     window.addEventListener("resize", changeWindowWidth);
//     addSettings()
//   }, [widthWindow]);

//   useEffect(() => {
//     addSettings()
//   }, []);
const {  settingsCardRender, isDownloadSettingCards } = useSettingCardsRender();

// useEffect(() => {
//     console.log(settingsCardRender)
// })

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

          // console.log(savedCards);
          // console.log(newDataFilms);
          localStorage.setItem("resultSearchMovies", inputText);
          setFilmsObjRender(newDataFilms.slice(0, settingsCardRender.cardRender))
          setFilmsObj(newDataFilms);
          console.log(newDataFilms.slice(0, settingsCardRender.cardRender))
        //   setIsRenderingFilms(true);
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
    addMoreCards(filmsObj, setFilmsObjRender, settingsCardRender)
  }

  return (
    <div className="movies">
      <SearchForm isDownloadSettingCards={isDownloadSettingCards} handleSubmitSearchForm={handleSubmitSearchFormMain} />
      <MoviesCardList
        filmsObjRender={filmsObjRender}
        isRenderingFilms={isRenderingFilms}
        clickButtonLike={clickButtonLike}
        isdownloadData={isDownloadData}
        handleClickMore={handleClickMore}
      />
    </div>
  );
}

export default Movies;
