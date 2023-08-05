import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect } from "react";
import { useSettingCardsRender } from "../../utils/useSettingCardsRender";

function SavedMovies({
  savedCards,
  clickButtonDelete,
  setSavedCards,
  addMoreCards,
  updateSavedCards,
  isLoggedIn
}) {

  const [isCheckedShortMovie, setIsCheckedShortMovie] = useState(false);
  const [savedFilmsObjRender, setSavedFilmsObjRender] = useState([]);
  
  const { settingsCardRender, isDownloadSettingCards } =
    useSettingCardsRender();

  const localSavedMovies = JSON.parse(localStorage.getItem("savedMovies"));

  useEffect(() => {
    console.log(localSavedMovies)
  }, [])

useEffect(() => {
  setSavedFilmsObjRender(
    localSavedMovies.slice(0, settingsCardRender.cardRender)
  );
}, [isDownloadSettingCards, window.innerWidth, updateSavedCards]);

  function onChangeCheckbox(isChecked) {
    setIsCheckedShortMovie(isChecked);
  }


  function checkArrayForTime(array) {
    const newSavedFilmsShortTime = array.filter((element) => {
      return element.duration <= 40;
    });

    setSavedFilmsObjRender(
      newSavedFilmsShortTime.slice(0, settingsCardRender.cardRender)
    );
    setSavedCards(newSavedFilmsShortTime);
  }

  function handleSubmitSearchForm(inputText, isChecked) {
    if (inputText) {
      const filmsSearch = localSavedMovies.filter((savedCard) => {
        const filmNameWords = savedCard.nameRU
          .toLowerCase()
          .split(/\ |\. |\:|\, |\!/);
        return filmNameWords.some((filmNameWord) => {
          return inputText.toLowerCase() === filmNameWord;
        });
      });

      if (isChecked) {
        checkArrayForTime(filmsSearch);
      } else {
        setSavedCards(filmsSearch);
        setSavedFilmsObjRender(
          filmsSearch.slice(0, settingsCardRender.cardRender)
        );
      }
    } else {
      if (isDownloadSettingCards === false) {
        if (isChecked) {
          checkArrayForTime(localSavedMovies)
        } else {
          setSavedCards(localSavedMovies);
          setSavedFilmsObjRender(
            localSavedMovies.slice(0, settingsCardRender.cardRender)
          );
        }

      }
    }
  }

  function handleClickMore() {
    addMoreCards(savedCards, setSavedFilmsObjRender, settingsCardRender);
  }

  return (
    <div className="savedMovies">
      <SearchForm
        handleSubmitSearchForm={handleSubmitSearchForm}
        isCheckedShortMovie={isCheckedShortMovie}
        onChangeCheckbox={onChangeCheckbox}
      />
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
