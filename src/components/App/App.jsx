import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate, redirect } from "react-router-dom";

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
 

  useEffect(() => {
    console.log(isLoggedIn)
    console.log(savedCards)
    console.log(localStorage.getItem("jwt"))
  })

  function getMainData() {
    Promise.all([mainApi.getUser(), mainApi.getMovies()])
    .then(([userInfo, savedMovies]) => {
      setCurrentUser(userInfo)
      setSavedCards(savedMovies)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      console.log(savedCards)
    })
  }
  
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getMainData()
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
    }
  }, [isLoggedIn])

  // useEffect(() => {
  //     const jwt = localStorage.getItem("jwt");
  // console.log(jwt)
  //     if (jwt) {
  //       setIsLoggedIn(true)
  //       mainApi
  //         .getUserInfo(jwt)
  //         .then((res) => {
  //           console.log(res)
  //           setCurrentUser(res)
  //           setIsLoggedIn(true);
  //           navigate({ replace: true });
  //         })
  //         .catch((err) => {
  //           console.log(err); // выведем ошибку в консоль
  //         })
  //     }
  // }, [isLoggedIn]);

  // // useEffect(() => {
  // //   const jwt = localStorage.getItem("jwt");
  // //   if (jwt) {
  // //     setIsLoggedIn(true)
  // //   }
  // //   console.log(isLoggedIn)
  // //   if (isLoggedIn === true) {
  // //     mainApi
  // //       .getMovies()
  // //       .then((res) => {
  // //         setSavedCards(res);
  // //         localStorage.setItem("savedMovies", JSON.stringify(res));
  // //         console.log(res)
  // //       })
  // //       .catch((err) => {
  // //         console.log(err);
  // //       });
  // //   } 
  // // }, [])

  // useEffect(() => {
  //     mainApi
  //       .getMovies()
  //       .then((res) => {
  //         setSavedCards(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  // useEffect(() => {
  //   if (isLoggedIn === true) {
  //     mainApi
  //       .getUser()
  //       .then((res) => {
  //         console.log(isLoggedIn);
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

    // функция авторизации
    function loginAuth({ email, password }) {
      mainApi
        .login({ email, password })
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
          setIsServerError(true);
        })
        .finally(() => {
          const jwt = localStorage.getItem("jwt");

          if (jwt) {
            getMainData()
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false)
          }
        })
    }

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

    mainApi
      .deleteMovie(checkCard._id)
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

  // // функция авторизации
  // function loginAuth({ email, password }) {
  //   mainApi
  //     .login({ email, password })
  //     .then((res) => {
  //       setIsLoggedIn(true);
  //       // console.log(res)
  //       // console.log(isLoggedIn)
  //       localStorage.setItem("jwt", res.token);
  //       // setIsServerError(false);
  //       navigate("/movies", { replace: true });
  //     })
  //     .catch((err) => {
  //       console.log(err); // выведем ошибку в консоль
  //       setIsServerError(true);
  //     })
  //     .finally(() => {
  //       console.log(localStorage.getItem('jwt'))
  //       console.log(isLoggedIn)
  //       setIsUseEffectGetMoviesOn(true)
  //     })
  // }

  function signOut() {
    localStorage.clear();
    setSavedCards([]);
    setCurrentUser({});
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
