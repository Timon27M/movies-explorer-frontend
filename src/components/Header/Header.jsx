import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../images/logo.svg";
import NavigationAuth from "../NavigationAuth/NavigationAuth";
import NavigationSite from "../NavigationSite/NavigationSite";

function Header() {
  const { pathname } = useLocation();

  return (
    <header
      className={`header ${
        pathname === "/" ? "header_type_auth" : "header_type_site"
      }`}
    >
      <Link className="header__link" to="/">
        <img className="header__logo" src={logoImg} alt="Логотип сайта"></img>
      </Link>
      {pathname === "/" ? <NavigationAuth /> : <NavigationSite />}
    </header>
  );
}

export default Header;
