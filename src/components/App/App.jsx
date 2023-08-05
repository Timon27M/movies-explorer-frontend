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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../utils/CurrentUserContext";

function App() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedCards, setSavedCards] = useState([]);
  const [updateSavedCards, setUpdateSavedCards] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isUseEffectGetMoviesOn, setIsUseEffectGetMoviesOn] = useState(false);

  // useEffect(() => {
  //   console.log(localStorage)
  //   console.log(savedCards)
  //   if (isLoggedIn === true) {
  //     setIsUseEffectGetMoviesOn(true)
  //   }
  // }, [])

  useEffect(() => {
      const jwt = localStorage.getItem("jwt");
  console.log(jwt)
      if (jwt) {
        mainApi
          .getUserInfo(jwt)
          .then((res) => {
            console.log(res)
            setCurrentUser(res)
            setIsLoggedIn(true);
            navigate({ replace: true });
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
      }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn === true && isUseEffectGetMoviesOn === true) {
      mainApi
        .getMovies()
        .then((res) => {
          localStorage.setItem("savedMovies", JSON.stringify(res));
          setSavedCards(res);
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
    } 
  }, [isLoggedIn])

  // useEffect(() => {
  //   const localSavedMovies = localStorage.getItem("savedMovies");

  //   if (!localSavedMovies) {
  //     mainApi
  //       .getMovies()
  //       .then((res) => {
  //         localStorage.setItem("savedMovies", JSON.stringify(res));
  //         setSavedCards(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     setSavedCards(JSON.parse(localSavedMovies));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     mainApi
  //       .getUser()
  //       .then((res) => {
  //         console.log(res);
  //         setCurrentUser(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         console.log(currentUser)
  //       })
  //   } 
  // }, [isLoggedIn]);

  function clickButtonLike(cardObj) {
    const checkCard = savedCards.find((card) => {
      return card.movieId === cardObj.id;
    });

    if (!checkCard) {
      mainApi
        .createMovie({
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
        })
        .then((res) => {
          localStorage.setItem(
            "savedMovies",
            JSON.stringify([res, ...savedCards])
          );
          setSavedCards([res, ...savedCards]);
          cardObj.isLiked = true;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      mainApi
        .deleteMovie(checkCard._id)
        .then((res) => {
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(
              savedCards.filter(
                (savedCard) => savedCard.movieId !== checkCard.movieId
              )
            )
          );
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
    console.log(checkCard);

    const localSavedMovies = JSON.parse(localStorage.getItem("savedMovies"));

    mainApi
      .deleteMovie(checkCard._id)
      .then((res) => {
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(
            localSavedMovies.filter(
              (localSavedMovie) => localSavedMovie.movieId !== checkCard.movieId
            )
          )
        );
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
      .updateUser({ name, email })
      .then((res) => {
        console.log(res);
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function registerAuth({ name, email, password }) {
    mainApi
      .register({ name, email, password })
      .then((res) => {
        console.log({ name, email, password });
        navigate("/signin", { replace: true });
        setIsServerError(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsServerError(true);
      });
  }

  // функция авторизации
  function loginAuth({ email, password }) {
    mainApi
      .login({ email, password })
      .then((res) => {
        console.log(res)
        localStorage.setItem("jwt", res.token);
        setIsServerError(false);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsServerError(true);
      })
      .finally(() => {
        console.log(currentUser)
        setIsUseEffectGetMoviesOn(true)
      })
  }

  function signOut() {
    localStorage.clear();
    localStorage.removeItem('savedMovies')
    localStorage.removeItem('jwt')
    setCurrentUser({});
    setSavedCards([]);
    setIsUseEffectGetMoviesOn(false)
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
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
              setSavedCards={setSavedCards}
              updateSavedCards={updateSavedCards}
              addMoreCards={addMoreCards}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
              element={Profile}
              onSignOut={signOut}
              handleChangeProfileForm={handleChangeProfileForm}
              updateUserInfo={updateUserInfo}
              setCurrentUser={setCurrentUser}
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
      </Routes>
      {pathname === "/" ||
      pathname === "/movies" ||
      pathname === "/saved-movies" ? (
        <Footer />
      ) : (
        ""
      )}
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
