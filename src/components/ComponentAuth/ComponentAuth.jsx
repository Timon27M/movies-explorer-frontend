import "./ComponentAuth.css";
import { Link } from "react-router-dom";
import logoImg from "../../images/logo.svg";

function ComponentAuth({
  formName,
  buttonText,
  title,
  containerText,
  containerLinkName,
  containerLinkPath,
  children,
}) {
  return (
    <div className="componentAuth">
      <div className="componentAuth__main-block">
        <div className="componentAuth__content">
          <Link to="/" className="componentAuth__link">
            <img src={logoImg} alt="логотип" className="componentAuth__logo" />
          </Link>
          <h2 className="componentAuth__title">{title}</h2>
          <form className="componentAuth__form" name={formName} noValidate>
            {children}
            <button className="componentAuth__button">{buttonText}</button>
          </form>
        </div>
        <div className="componentAuth__container">
          <p className="componentAuth__container-text">{containerText}</p>
          <Link
            to={containerLinkPath}
            className="componentAuth__container-link"
          >
            {containerLinkName}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ComponentAuth;
