import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect } from "react";

function SavedMovies({ savedCards, buttonDeleteClick, setSavedCards }) {
  // const [savedMovies, setSavedMovies] = useState(savedCards);

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
    } else {
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
