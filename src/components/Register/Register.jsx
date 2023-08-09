import "../AuthInputs/AuthInputs.css";
import ComponentAuth from "../ComponentAuth/ComponentAuth";
import useFormWithValidation from "../../utils/FormValidation";

function Register({ registerAuth, isServerError }) {

  const { values, handleChange, errors, isValid} =
    useFormWithValidation(); 

    function handleSubmit(evt) {
      evt.preventDefault();
      registerAuth({name: values.name, email: values.email, password: values.password});
    }

  return (
    <ComponentAuth
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      formName="register"
      containerText="Уже зарегистрированы?"
      containerLinkName="Войти"
      containerLinkPath="/signin"
      isValid={isValid}
      handleSubmit={handleSubmit}
      isServerError={isServerError}
    >
      <div className="auth-container">
        <div className="auth-content">
          <p className="auth-content__name">Имя</p>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={values.name}
            className="auth-content__input"
            minLength={2}
            required
          />
        </div>
          <span className="auth-text-error">{errors.name}</span>
        <div className="auth-content">
          <p className="auth-content__name">E-mail</p>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            className="auth-content__input"
            required
          />
        </div>
          <span className="auth-text-error">{errors.email}</span>
        <div className="auth-content">
          <p className="auth-content__name">Пароль</p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            className="auth-content__input"
            minLength={6}
            required
          />
        </div>
      <span className="auth-text-error">{errors.password}</span>
      </div>
    </ComponentAuth>
  );
}

export default Register;
