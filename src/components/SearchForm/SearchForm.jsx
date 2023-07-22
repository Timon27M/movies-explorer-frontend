import "./SearchForm.css";
import imgFind from "../../images/find-min.svg";

function SearchForm() {
  return (
    <form className="search">
      <div className="search__contant">
        <div className="search__container">
          <input
            type="text"
            className="search__input-text"
            placeholder="Фильм"
          />
          <button type="button" className="search__button">
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
