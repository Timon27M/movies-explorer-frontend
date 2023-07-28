import "../AuthInputs/AuthInputs.css";
import ComponentAuth from "../ComponentAuth/ComponentAuth";
import { useState } from "react";

function Login({ loginAuth }) {
  const [formValue, setFormValue] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    loginAuth(formValue.email, formValue.password);
  };

  return (
    <ComponentAuth
      title="Рады видеть!"
      buttonText="Войти"
      formName="login"
      containerText="Ещё не зарегистрированы?"
      containerLinkName="Регистрация"
      containerLinkPath="/signup"
      onSubmit={handleSubmit}
    >
      <div className="auth-container">
        <div className="auth-content">
          <p className="auth-content__name">E-mail</p>
          <input
            type="email"
            className="auth-content__input"
            name="email"
            value={formValue.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="auth-content">
          <p className="auth-content__name">Пароль</p>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={formValue.password || ""}
            className="auth-content__input"
          />
        </div>
        <span className="auth-text-error">Что-то пошло не так...</span>
      </div>
    </ComponentAuth>
  );
}

export default Login;
