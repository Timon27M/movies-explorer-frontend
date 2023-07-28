import "../AuthInputs/AuthInputs.css";
import ComponentAuth from "../ComponentAuth/ComponentAuth";
import { useState } from "react";

function Register({ registerAuth }) {
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
    registerAuth(formValue.name, formValue.email, formValue.password);
  };

  return (
    <ComponentAuth
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      formName="register"
      containerText="Уже зарегистрированы?"
      containerLinkName="Войти"
      containerLinkPath="/signin"
      onSubmit={handleSubmit}
    >
      <div className="auth-container">
        <div className="auth-content">
          <p className="auth-content__name">Имя</p>
          <input
            type="text"
            name="name"
            value={formValue.name || ""}
            onChange={handleChange}
            className="auth-content__input"
          />
        </div>
        <div className="auth-content">
          <p className="auth-content__name">E-mail</p>
          <input
            type="email"
            name="email"
            value={formValue.email || ""}
            onChange={handleChange}
            className="auth-content__input"
          />
        </div>
        <div className="auth-content">
          <p className="auth-content__name">Пароль</p>
          <input
            type="password"
            name="password"
            value={formValue.password || ""}
            onChange={handleChange}
            className="auth-content__input"
          />
        </div>
        <span className="auth-text-error">Что-то пошло не так...</span>
      </div>
    </ComponentAuth>
  );
}

export default Register;
