import "./SearchForm.css";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function SearchForm({ handleSubmitSearchForm, isDownloadSettingCards }) {

  const { pathname } = useLocation();
  const [inputText, setInputText] = useState('')

useEffect(() => {
  if (pathname === '/movies') {
    const lastInputText = localStorage.getItem("resultSearchMovies")
    handleSubmitSearchForm(lastInputText);
    setInputText(lastInputText)
  } else if (pathname === '/saved-movies') {
    handleSubmitSearchForm('')
  }
}, [isDownloadSettingCards])


  function changeInput(evt) {
    setInputText(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSubmitSearchForm(inputText);
  }

  return (
    <form className="search">
      <div className="search__contant">
        <div className="search__container">
          <input
            type="text"
            className="search__input-text"
            placeholder="Фильм"
            onChange={changeInput}
            value={inputText}
            required
          />
          <button type="button" className="search__button" onClick={ handleSubmit }>
            <p className="search__button-text">Найти</p>
          </button>
        </div>
        <div className="search__parameter">
          <p className="search__parameter-name">Короткометражки</p>
          <input
            type="checkbox"
            id="checkbox"
            className="search__parameter-checkbox"
          />
          <label htmlFor="checkbox" className="search__parameter-label"></label>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
