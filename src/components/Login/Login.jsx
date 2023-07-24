import "../AuthInputs/AuthInputs.css";
import ComponentAuth from "../ComponentAuth/ComponentAuth";

function Login() {
  return (
    <ComponentAuth
      title="Рады видеть!"
      buttonText="Войти"
      formName="login"
      containerText="Ещё не зарегистрированы?"
      containerLinkName="Регистрация"
      containerLinkPath="/signup"
    >
      <div className="auth-container">
        <div className="auth-content">
          <p className="auth-content__name">E-mail</p>
          <input
            type="email"
            className="auth-content__input"
          />
        </div>
        <div className="auth-content">
          <p className="auth-content__name">Пароль</p>
          <input
            type="password"
            className="auth-content__input"
          />
        </div>
        <span className="auth-text-error">Что-то пошло не так...</span>
      </div>
    </ComponentAuth>
  );
}

export default Login;
