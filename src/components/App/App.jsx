import "./App.css";
import {  Route, Routes } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
