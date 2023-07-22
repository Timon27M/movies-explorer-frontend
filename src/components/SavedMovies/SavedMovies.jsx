import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
    return (
        <div className="savedMovies">
            <SearchForm />
            <MoviesCardList />
        </div>
    );
}

export default SavedMovies;