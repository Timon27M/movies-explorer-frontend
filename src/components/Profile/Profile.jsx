import "./Profile.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useFormWithValidation from "../../utils/FormValidation";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from '../../utils/CurrentUserContext';

function Profile({ onSignOut, isLoggedIn, updateUserInfo, setCurrentUser }) {

  const currentUser = useContext(CurrentUserContext);
  
  const { values, handleChange, isValid, setValues, setIsValid} =
  useFormWithValidation();
  
  useEffect(() => {
    setValues(currentUser);
  }, [currentUser])

  function handleSignOut(evt) {
    evt.preventDefault();
    onSignOut()
  }

  function handelSubmitProfileForm(evt) {
    evt.preventDefault()
    updateUserInfo({ name: values.name, email: values.email })
    setIsValid(false);
  }

  return (
    <section className="profile">
      <form className="profile__container" id="profileForm" onSubmit={handelSubmitProfileForm} noValidate>
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <div className="profile__content profile__content_type_name">
          <p className="profile__text profile__text_type_name">Имя</p>
          <input
            type="text"
            name="name"
            value={values.name}
            className="profile__input profile__input_type_name"
            onChange={handleChange}
          />
        </div>
        <div className="profile__content profile__content_type_email">
          <p className="profile__text profile__text_type_email">E-mail</p>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            className="profile__input profile__input_type_text"
          />
        </div>
      </form>

      <div className="profile__buttons">
        <button type="submit" form="profileForm" disabled={!isValid} className={`profile__button profile__button-edit ${isValid && 'profile__button-edit_active'}`}>
          Редактировать
        </button>
        <Link
          to="/"
          type="button"
          className="profile__button profile__button-exit"
          onClick={handleSignOut}
        >
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

export default Profile;
