import "../AuthInputs/AuthInputs.css";
import ComponentAuth from "../ComponentAuth/ComponentAuth";
import { useState } from "react";
import useFormWithValidation from "../../utils/FormValidation";

function Login({ loginAuth, isServerError }) {
  const { values, handleChange, errors, isValid} =
  useFormWithValidation(); 

  function handleSubmit(evt) {
    evt.preventDefault();
    loginAuth({ email: values.email, password: values.password })
  }

  return (
    <ComponentAuth
      title="Рады видеть!"
      buttonText="Войти"
      formName="login"
      containerText="Ещё не зарегистрированы?"
      containerLinkName="Регистрация"
      containerLinkPath="/signup"
      handleSubmit={handleSubmit}
      isValid={isValid}
      isServerError={isServerError}
    >
      <div className="auth-container">
        <div className="auth-content">
          <p className="auth-content__name">E-mail</p>
          <input
            type="email"
            className="auth-content__input"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
          <span className="auth-text-error">{errors.email}</span>
        <div className="auth-content">
          <p className="auth-content__name">Пароль</p>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={values.password}
            className="auth-content__input"
          />
        </div>
        <span className="auth-text-error">{errors.password}</span>
      </div>
    </ComponentAuth>
  );
}

export default Login;
