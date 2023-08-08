import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../utils/CurrentUserContext";
import PageNotFound from "../PageNotFound/PageNotFound";
import Preloader from "../Preloader/Preloader";

function App() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedCards, setSavedCards] = useState([]);
  const [updateSavedCards, setUpdateSavedCards] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [localStorageToken, setLocalStorageToken] = useState(null);
  const [profileResponseInfo, setProfileResponseInfo] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [isDownloadPage, setIsDownloadPage] = useState(false);

  useEffect(() => {
    window.onbeforeunload = () => {
      window.sessionStorage.setItem(
        "lastRoute",
        JSON.stringify(window.location.pathname)
      );
    };
  }, []);

  function getMainData(jwt) {
    setIsDownloadPage(true);
    Promise.all([
      mainApi.getUserInfo(jwt),
      mainApi.getMovies(jwt),
      moviesApi.getMovies(),
    ])
      .then(([userInfo, savedMovies, allMovies]) => {
        setCurrentUser(userInfo);
        setSavedCards(savedMovies.reverse());
        setAllMovies(allMovies);
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsDownloadPage(false);
        navigate(
          JSON.parse(window.sessionStorage.getItem("lastRoute") || "{}"),
          { replace: true }
        );
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setLocalStorageToken(jwt);
    if (jwt) {
      getMainData(jwt);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  // функция авторизации
  function loginAuth({ email, password }) {
    mainApi
      .login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        navigate("/movies", { replace: true });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsServerError(true);
      });
  }

  function registerAuth({ name, email, password }) {
    mainApi
      .register({ name, email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        navigate("/movies", { replace: true });
        setIsServerError(false);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsServerError(true);
      });
  }

  function clickButtonLike(cardObj) {
    const checkCard = savedCards.find((card) => {
      return card.movieId === cardObj.id;
    });

    if (!checkCard) {
      mainApi
        .createMovie(
          {
            country: cardObj.country,
            director: cardObj.director,
            duration: cardObj.duration,
            year: cardObj.year,
            description: cardObj.description,
            image: `https://api.nomoreparties.co${cardObj.image.url}`,
            trailer: cardObj.trailerLink,
            nameRU: cardObj.nameRU,
            nameEN: cardObj.nameEN,
            thumbnail: `https://api.nomoreparties.co${cardObj.image.formats.thumbnail.url}`,
            movieId: cardObj.id,
          },
          localStorageToken
        )
        .then((res) => {
          setSavedCards([res, ...savedCards]);
          cardObj.isLiked = true;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      mainApi
        .deleteMovie(checkCard._id, localStorageToken)
        .then((res) => {
          setSavedCards(
            savedCards.filter(
              (savedCard) => savedCard.movieId !== checkCard.movieId
            )
          );
          cardObj.isLiked = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function addMoreCards(filmsAll, setFilmsRender, settingsCardRender) {
    setFilmsRender(
      filmsAll.slice(
        0,
        (settingsCardRender.cardRender += settingsCardRender.cardRenderMore)
      )
    );
  }

  function clickButtonDelete(cardObj) {
    const checkCard = savedCards.find((card) => {
      return card.movieId === cardObj.movieId;
    });

    mainApi
      .deleteMovie(checkCard._id, localStorageToken)
      .then((res) => {
        setSavedCards(
          savedCards.filter(
            (savedCard) => savedCard.movieId !== checkCard.movieId
          )
        );
        setUpdateSavedCards(!updateSavedCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChangeProfileForm = (evt) => {
    evt.preventDefault();
    setCurrentUser({
      ...currentUser,
      [evt.target.name]: evt.target.value,
    });
  };

  function updateUserInfo({ name, email }) {
    mainApi
      .updateUser({ name, email }, localStorageToken)
      .then((res) => {
        setCurrentUser(res);
        setProfileResponseInfo({
          textMessage: "Данные успешно обновлены",
          classNameMessage: "profile__response-info_success",
        });
      })
      .catch((err) => {
        console.log(err);
        setProfileResponseInfo({
          textMessage: "Произошла ошибка",
          classNameMessage: "profile__response-info_fail",
        });
      });
  }

  function signOut() {
    localStorage.clear();
    setSavedCards([]);
    setCurrentUser({});
    setIsLoggedIn(false);
    setLocalStorageToken(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isDownloadPage ? <Preloader /> :
      <div className="App">
        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ||
        pathname === "/profile" ? (
          <Header isLoggedIn={isLoggedIn} />
        ) : (
          ""
        )}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                clickButtonLike={clickButtonLike}
                isLoggedIn={isLoggedIn}
                element={Movies}
                savedCards={savedCards}
                addMoreCards={addMoreCards}
                setAllMovies={setAllMovies}
                allMovies={allMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={SavedMovies}
                savedCards={savedCards}
                clickButtonDelete={clickButtonDelete}
                updateSavedCards={updateSavedCards}
                addMoreCards={addMoreCards}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Profile}
                onSignOut={signOut}
                handleChangeProfileForm={handleChangeProfileForm}
                updateUserInfo={updateUserInfo}
                setProfileResponseInfo={setProfileResponseInfo}
                profileResponseInfo={profileResponseInfo}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                registerAuth={registerAuth}
                isServerError={isServerError}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login loginAuth={loginAuth} isServerError={isServerError} />
            }
          />
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        {pathname === "/" ||
        pathname === "/movies" ||
        pathname === "/saved-movies" ? (
          <Footer />
        ) : (
          ""
        )}
      </div>
}
    </CurrentUserContext.Provider>
  );
}

export default App;
