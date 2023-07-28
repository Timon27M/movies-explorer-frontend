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

function App() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function registerAuth(name, email, password) {
    mainApi
      .register(name, email, password)
      .then((res) => {
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  // функция авторизации
  function loginAuth(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  return (
    <div className="App">
      {pathname === "/" ||
      pathname === "/movies" ||
      pathname === "/saved-movies" ||
      pathname === "/profile" ? (
        <Header />
      ) : (
        ""
      )}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register registerAuth={registerAuth}/>} />
        <Route path="/signin" element={<Login loginAuth={loginAuth}/>} />
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
