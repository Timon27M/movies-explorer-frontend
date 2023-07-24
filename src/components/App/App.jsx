import "./App.css";
import {  Route, Routes, useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ?
          <Header /> : ''}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ?
          <Footer /> : ''}
    </div>
  );
}

export default App;
