import "./NavigationSite.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import imgAcc from "../../images/img-Acc.svg";
import imgButtonMenu from "../../images/icon-buttonMenu.svg";
import imgCloseButtonMenu from "../../images/closeButtonMenu.svg";

function NavigationSite() {
  const [openMenu, setOpenMenu] = useState(false);

  const showMenu = () => {
    setOpenMenu(!openMenu);
  };

  const defaultClassNameMainItem = "navigationSite__main-item";
  const activeClassName =
    "navigationSite__main-item navigationSite__main-item_active";

  return (
    <div
      className={`navigationSite ${openMenu ? "navigationSite_active" : ""}`}
    >
      <button className="navigationSite__button" onClick={showMenu}>
        <img
          className="navigationSite__img-button"
          src={imgButtonMenu}
          alt="иконка"
        />
      </button>
      <div
        className={`navigationSite__container ${
          openMenu ? "navigationSite__container_active" : ""
        }`}
      >
        <div className="navigationSite__content">
          <div className="navigationSite__main">
            <NavLink
              to="/"
              target="_blank"
              className={({ isActive }) =>
                isActive
                  ? activeClassName + " navigationSite__main-item_type_home"
                  : defaultClassNameMainItem +
                    " navigationSite__main-item_type_home"
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              target="_blank"
              className={({ isActive }) =>
                isActive
                  ? activeClassName +
                    " navigationSite__main-item_type_all-films"
                  : defaultClassNameMainItem +
                    " navigationSite__main-item_type_all-films"
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              target="_blank"
              className={({ isActive }) =>
                isActive
                  ? activeClassName + " navigationSite__main-item_type_my-films"
                  : defaultClassNameMainItem +
                    " navigationSite__main-item_type_my-films"
              }
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="navigationSite__acc">
            <NavLink
              to="/profile"
              target="_blank"
              className="navigationSite__profile"
            >
              <p className="navigationSite__profile-text">Аккаунт</p>
              <img
                className="navigationSite__profile-img"
                src={imgAcc}
                alt="фавикон"
              />
            </NavLink>
          </div>
          <button className="navigationSite__close-button" onClick={showMenu}>
            <img
              className="navigationSite__close-img-button"
              src={imgCloseButtonMenu}
              alt="иконка"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavigationSite;
