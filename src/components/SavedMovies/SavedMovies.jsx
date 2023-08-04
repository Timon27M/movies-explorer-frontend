import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect } from "react";
import { useSettingCardsRender } from "../../utils/useSettingCardsRender";

function SavedMovies({ savedCards, clickButtonDelete, setSavedCards, addMoreCards }) {
  // const [savedMovies, setSavedMovies] = useState(savedCards);

  const { settingsCardRender, isDownloadSettingCards } = useSettingCardsRender();
  const [savedFilmsObjRender, setSavedFilmsObjRender] = useState([]);

  useEffect(() => {
      setSavedFilmsObjRender(localSavedMovies.slice(0, settingsCardRender.cardRender))
      console.log(savedFilmsObjRender)
      console.log(localSavedMovies.slice(0, settingsCardRender.cardRender))
  }, [isDownloadSettingCards, window.innerWidth])

  const localSavedMovies = JSON.parse(localStorage.getItem("savedMovies"));

  function handleSubmitSearchForm(inputText) {
    if (inputText) {
      console.log(savedCards)
      const filmsSearch = localSavedMovies.filter((savedCard) => {
        const filmNameWords = savedCard.nameRU
          .toLowerCase()
          .split(/\ |\. |\:|\, |\!/);
          console.log(savedCards)
        return filmNameWords.some((filmNameWord) => {
          return inputText.toLowerCase() === filmNameWord;
        });
      });
      setSavedCards(filmsSearch);
      setSavedFilmsObjRender(filmsSearch.slice(0, settingsCardRender.cardRender))
    } else {
      if (isDownloadSettingCards === false) {
        setSavedCards(localSavedMovies);

        setSavedFilmsObjRender(localSavedMovies.slice(0, settingsCardRender.cardRender))
      }
    }
  }

  function handleClickMore() {
    addMoreCards(savedCards, setSavedFilmsObjRender, settingsCardRender)
  }

  return (
    <div className="savedMovies">
      <SearchForm handleSubmitSearchForm={handleSubmitSearchForm} />
      <MoviesCardList
      settingsCardRender={settingsCardRender}
      allSavedCards={savedCards}
        savedFilmsObjRender={savedFilmsObjRender}
        clickButtonDelete={clickButtonDelete}
        handleClickMoreSavedMovies={handleClickMore}
        isDownloadSettingCards={isDownloadSettingCards}
      />
    </div>
  );
}

export default SavedMovies;
