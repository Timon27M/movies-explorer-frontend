import "./App.css";
import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  redirect,
} from "react-router-dom";

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

function App() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedCards, setSavedCards] = useState(null);
  const [updateSavedCards, setUpdateSavedCards] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          navigate("/movies", { replace: true });
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, []);

  useEffect(() => {
    const localSavedMovies = localStorage.getItem("savedMovies");

    if (!localSavedMovies) {
      mainApi
        .getMovies()
        .then((res) => {
          console.log(res);
          localStorage.setItem("savedMovies", JSON.stringify(res));
          setSavedCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSavedCards(JSON.parse(localSavedMovies));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn === true) {
      mainApi
        .getUser()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [isLoggedIn]);

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
        console.log({ name, email });
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
        if (res.status === 200) {
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  // функция авторизации
  function loginAuth({ email, password }) {
    mainApi
      .login({ email, password })
      .then((res) => {
        console.log(res);
        console.log(email, password);
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        navigate("/", { replace: true });
        console.log(isLoggedIn);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        console.log(isLoggedIn);
      });
  }

  function signOut() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
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
            />
          }
        />
        <Route
          path="/signup"
          element={<Register registerAuth={registerAuth} />}
        />
        <Route path="/signin" element={<Login loginAuth={loginAuth} />} />
      </Routes>
      {pathname === "/" ||
      pathname === "/movies" ||
      pathname === "/saved-movies" ? (
        <Footer />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
