import "./SearchForm.css";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function SearchForm({ handleSubmitSearchForm, isDownloadSettingCards, onChangeCheckbox, isCheckedShortMovie, setIsLastInputSearch }) {

  const { pathname } = useLocation();
  const [inputText, setInputText] = useState('')
  const [checkboxValue, setCheckboxValue] = useState(JSON.parse(localStorage.getItem('checkboxIsChecked')))

  useEffect(() => {
    const lastCheckboxIsChecked = JSON.parse(localStorage.getItem('checkboxIsChecked'))
    setCheckboxValue(lastCheckboxIsChecked)
  }, [])

useEffect(() => {
  if (pathname === '/movies') {
    const lastInputText = localStorage.getItem("resultSearchMovies");
    const lastCheckboxIsChecked = JSON.parse(localStorage.getItem('checkboxIsChecked'))
    if (lastInputText) {
      handleSubmitSearchForm(lastInputText, lastCheckboxIsChecked);
      setInputText(lastInputText)
      setIsLastInputSearch(true);
    } else {
      setIsLastInputSearch(false);
    }
  } else if (pathname === '/saved-movies') {
    handleSubmitSearchForm('')
  }
}, [isDownloadSettingCards, checkboxValue])


  function changeInput(evt) {
    setInputText(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSubmitSearchForm(inputText, isCheckedShortMovie);
  }

  function handleChangeCheckbox(evt) {
    onChangeCheckbox(evt.target.checked);
    setCheckboxValue(evt.target.checked);
    localStorage.setItem("checkboxIsChecked", JSON.stringify(evt.target.checked));
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
            onChange={handleChangeCheckbox}
            checked={isCheckedShortMovie}
          />
          <label htmlFor="checkbox" className="search__parameter-label"></label>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
