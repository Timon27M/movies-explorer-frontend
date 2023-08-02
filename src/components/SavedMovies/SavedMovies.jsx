import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect } from "react";

function SavedMovies({ savedCards, buttonDeleteClick, setSavedCards }) {
  const [savedMovies, setSavedMovies] = useState(savedCards);

  function handleSubmitSearchForm(inputText) {
    if (inputText) {
      const filmsSearch = savedCards.filter((savedCard) => {
        const filmNameWords = savedCard.nameRU
          .toLowerCase()
          .split(/\ |\. |\:|\, |\!/);

        return filmNameWords.some((filmNameWord) => {
          return inputText.toLowerCase() === filmNameWord;
        });
      });

      setSavedCards(filmsSearch);
    } else {
      const localSavedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      setSavedCards(localSavedMovies);
    }
  }



  return (
    <div className="savedMovies">
      <SearchForm handleSubmitSearchForm={handleSubmitSearchForm} />
      <MoviesCardList
        filmsObj={savedCards}
        buttonDeleteClick={buttonDeleteClick}
      />
    </div>
  );
}

export default SavedMovies;
