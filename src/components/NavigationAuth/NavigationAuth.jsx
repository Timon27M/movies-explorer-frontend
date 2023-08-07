import "./NavigationAuth.css"
import { Link } from "react-router-dom";

function NavigationAuth() {
  return (
    <nav className="navigation-auth">
      <ul className="navigation-auth__list">
        <li className="navigation-auth__list_type_register">
          <Link to="/signup" target="_blank" className="navigation-auth__link navigation-auth__link_type_register">
            Регистрация
          </Link>
        </li>
        <li className="navigation-auth__list_type_login">
          <Link to="/signin" target="_blank" className="navigation-auth__link navigation-auth__link_type_login">
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationAuth;
