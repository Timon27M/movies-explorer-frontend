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
  handleSubmit,
  isValid,
  isServerError,
}) {
  // const classNameBlockServerError = `componentAuth__text-server-error ${!isServerError && 'componentAuth__text-server-error_active'}`

  return (
    <div className="componentAuth">
      <div className="componentAuth__main-block">
        <div className="componentAuth__content">
          <Link to="/" className="componentAuth__link" target="_blank">
            <img src={logoImg} alt="логотип" className="componentAuth__logo" />
          </Link>
          <h2 className="componentAuth__title">{title}</h2>
          <form
            className="componentAuth__form"
            onSubmit={handleSubmit}
            name={formName}
            noValidate
          >
            {children}
            <div className="componentAuth__blockSubmitButton">
              <span
                className={`componentAuth__text-server-error ${
                  isServerError && "componentAuth__text-server-error_active"
                }`}
              >
                Произошла ошибка
              </span>
              <button
                className={`componentAuth__button ${
                  !isValid && "componentAuth__button_disabled"
                }`}
                target='_blank'
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
        <div className="componentAuth__container">
          <p className="componentAuth__container-text">{containerText}</p>
          <Link
            to={containerLinkPath}
            className="componentAuth__container-link"
            target="_blank"
          >
            {containerLinkName}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ComponentAuth;
