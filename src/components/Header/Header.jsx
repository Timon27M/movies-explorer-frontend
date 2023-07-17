import "./Header.css"
import { Link } from "react-router-dom";
import logoImg from "../../images/logo.svg";
import NavigationAuth from "../NavigationAuth/NavigationAuth";

function Header() {
  return (
  <header className="header header_type_auth">
        <Link className="header__link">
            <img className="header__logo" src={logoImg} alt="Логотип сайта"></img>
        </Link>
        <NavigationAuth />
    </header>
  );
}

export default Header;