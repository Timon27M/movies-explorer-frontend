import "../AuthInputs/AuthInputs.css";
import ComponentAuth from "../ComponentAuth/ComponentAuth";

function Register() {
  return (
    <ComponentAuth
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      formName="register"
      containerText="Уже зарегистрированы?"
      containerLinkName="Войти"
      containerLinkPath='/signin'
    >
      <div className="auth-container">
        <div className="auth-content">
          <p className="auth-content__name">Имя</p>
          <input
            type="text"
            className="auth-content__input"
            value="Виталий"
          />
        </div>
        <div className="auth-content">
          <p className="auth-content__name">E-mail</p>
          <input
            type="email"
            className="auth-content__input"
            value="pochta@yandex.ru|"
          />
        </div>
        <div className="auth-content">
          <p className="auth-content__name">Пароль</p>
          <input
            type="password"
            className="auth-content__input"
            value="Виталий"
            minLength={2}
          />
        </div>
        <span className="auth-text-error">Что-то пошло не так...</span>
      </div>
    </ComponentAuth>
  );
}

export default Register;
